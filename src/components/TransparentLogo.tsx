"use client";

import React, { useState, useEffect } from "react";

interface TransparentLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export default function TransparentLogo({ src, alt, className }: TransparentLogoProps) {
  const [processedSrc, setProcessedSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          setProcessedSrc(src);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const width = canvas.width;
        const height = canvas.height;

        const visited = new Uint8Array(width * height);
        const queue: [number, number][] = [];

        const isWhite = (x: number, y: number) => {
          const idx = (y * width + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];
          // Check if pixel is opaque and close to pure white (threshold 235)
          return a > 0 && r > 235 && g > 235 && b > 235;
        };

        const addPixel = (x: number, y: number) => {
          if (x >= 0 && x < width && y >= 0 && y < height) {
            const idx = y * width + x;
            if (!visited[idx] && isWhite(x, y)) {
              visited[idx] = 1;
              queue.push([x, y]);
            }
          }
        };

        // Seed flood fill from all four border edges
        for (let x = 0; x < width; x++) {
          addPixel(x, 0);
          addPixel(x, height - 1);
        }
        for (let y = 0; y < height; y++) {
          addPixel(0, y);
          addPixel(width - 1, y);
        }

        let head = 0;
        while (head < queue.length) {
          const [cx, cy] = queue[head++];
          const idx = (cy * width + cx) * 4;
          // Set alpha to transparent
          data[idx + 3] = 0;

          // Check neighbors (4-connectivity)
          addPixel(cx + 1, cy);
          addPixel(cx - 1, cy);
          addPixel(cx, cy + 1);
          addPixel(cx, cy - 1);
        }

        ctx.putImageData(imgData, 0, 0);

        // Scan the transparent image to find the bounding box of the actual visible content
        let minX = width;
        let minY = height;
        let maxX = 0;
        let maxY = 0;

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const a = data[idx + 3];
            if (a > 0) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
            }
          }
        }

        // Crop the canvas to the bounding box if valid
        if (maxX >= minX && maxY >= minY) {
          const cropWidth = maxX - minX + 1;
          const cropHeight = maxY - minY + 1;

          const cropCanvas = document.createElement("canvas");
          cropCanvas.width = cropWidth;
          cropCanvas.height = cropHeight;
          const cropCtx = cropCanvas.getContext("2d");

          if (cropCtx) {
            cropCtx.drawImage(
              canvas,
              minX,
              minY,
              cropWidth,
              cropHeight,
              0,
              0,
              cropWidth,
              cropHeight
            );
            setProcessedSrc(cropCanvas.toDataURL());
          } else {
            setProcessedSrc(canvas.toDataURL());
          }
        } else {
          setProcessedSrc(canvas.toDataURL());
        }
      } catch (err) {
        console.error("Failed to process image transparency:", err);
        setProcessedSrc(src);
      }
    };
    img.onerror = () => {
      setProcessedSrc(src);
    };
  }, [src]);

  if (!processedSrc) {
    // Transparent spacer to preserve layout size before load
    return <div className={className} style={{ opacity: 0 }} />;
  }

  return <img src={processedSrc} alt={alt} className={className} />;
}

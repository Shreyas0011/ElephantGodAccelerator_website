import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src/data");
const FILE_PATH = path.join(DATA_DIR, "audits.json");

// Ensure the directory and file exist
function initFile() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([], null, 2), "utf-8");
  }
}

export async function GET() {
  try {
    initFile();
    const fileData = fs.readFileSync(FILE_PATH, "utf-8");
    const audits = JSON.parse(fileData);
    return NextResponse.json(audits);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read audit data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    initFile();
    const newAudit = await request.json();
    const fileData = fs.readFileSync(FILE_PATH, "utf-8");
    const audits = JSON.parse(fileData);
    
    // Add id and timestamp if not present
    const auditWithMeta = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      ...newAudit,
    };
    
    audits.push(auditWithMeta);
    fs.writeFileSync(FILE_PATH, JSON.stringify(audits, null, 2), "utf-8");
    
    return NextResponse.json({ success: true, audit: auditWithMeta });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save audit data" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    initFile();
    const { id } = await request.json();
    if (!id) {
      return NextResponse.json({ error: "ID required" }, { status: 400 });
    }
    
    const fileData = fs.readFileSync(FILE_PATH, "utf-8");
    let audits = JSON.parse(fileData);
    audits = audits.filter((audit: any) => audit.id !== id);
    fs.writeFileSync(FILE_PATH, JSON.stringify(audits, null, 2), "utf-8");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete audit data" }, { status: 500 });
  }
}

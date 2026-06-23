export const API_URL = 
  process.env.NEXT_PUBLIC_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? "http://localhost:5000/api" 
    : "https://elephantgodaccelerator-website.onrender.com/api");

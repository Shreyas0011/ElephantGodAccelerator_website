const crypto = require("crypto");

/**
 * Generates a unique 20-character alphanumeric transaction number.
 * Alphanumeric characters only. Max 20 length.
 */
function generateMerchantTxnNo() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "TX" + Date.now().toString().slice(-10); // "TX" + last 10 digits of timestamp = 12 characters
  // Add 8 random alphanumeric characters to reach 20 characters
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  // Strip any non-alphanumeric chars just in case, and slice to 20
  return result.replace(/[^A-Za-z0-9]/g, "").slice(0, 20);
}

/**
 * Formats a Date object to YYYYMMDDHHMMSS format in IST (India Standard Time).
 */
function formatDateToYYYYMMDDHHMMSS(date = new Date()) {
  // ICICI Bank operates in IST. Let's format the date to IST.
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const parts = formatter.formatToParts(date);
  
  const map = {};
  parts.forEach((p) => {
    map[p.type] = p.value;
  });

  // map: { year: '2026', month: '07', day: '17', hour: '11', minute: '20', second: '30' }
  return `${map.year}${map.month}${map.day}${map.hour}${map.minute}${map.second}`;
}

/**
 * Calculates Hash V1 signature by:
 * 1. Filtering out null, undefined, empty strings, and the "secureHash" key.
 * 2. Sorting keys alphabetically.
 * 3. Concatenating parameter values in alphabetical order of keys.
 * 4. Hashing the result with HMAC-SHA256 using the secret key.
 * 5. Returning lowercase hex format.
 */
function calculateHashV1(payload, secretKey) {
  if (!secretKey) {
    throw new Error("Secret key is required for hash calculation");
  }

  // Filter keys: exclude null, undefined, empty string, and secureHash (case-insensitive check)
  const filteredKeys = Object.keys(payload).filter((key) => {
    if (key.toLowerCase() === "securehash") return false;
    const value = payload[key];
    return value !== null && value !== undefined && String(value).trim() !== "";
  });

  // Sort keys alphabetically
  filteredKeys.sort();

  // Concatenate values
  const concatenatedValues = filteredKeys
    .map((key) => String(payload[key]).trim())
    .join("");

  // Generate HMAC-SHA256
  const hmac = crypto.createHmac("sha256", secretKey);
  hmac.update(concatenatedValues);
  return hmac.digest("hex").toLowerCase();
}

module.exports = {
  generateMerchantTxnNo,
  formatDateToYYYYMMDDHHMMSS,
  calculateHashV1,
};

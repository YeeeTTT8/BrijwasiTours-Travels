// server/google-sheets.ts
import { google } from "googleapis";

const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
if (!SPREADSHEET_ID) {
  throw new Error("Missing SPREADSHEET_ID environment variable");
}

export interface ConsultationRow {
  name: string;
  email: string;
  phone: string;
  destination: string;
  travelDate?: string;
  additionalInfo?: string;
}

/**
 * Appends one new row to the "Consultation" sheet.
 * Expects Render to mount your service‐account JSON at /etc/secrets/credentials.json
 */
export async function appendConsultationRow(data: ConsultationRow) {
  // Initialize GoogleAuth to read the JSON key from the secret file
  const auth = new google.auth.GoogleAuth({
    keyFile: "/etc/secrets/credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  // Obtain an authenticated client
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  // Build the row values
  const values = [[
    new Date().toISOString(),      // timestamp
    data.name,
    data.email,
    data.phone,
    data.destination,
    data.travelDate || "",
    data.additionalInfo || ""
  ]];

  console.log("📨 Appending row to sheet:", SPREADSHEET_ID, values);

  // Append to columns A–G on the "Consultation" sheet
  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Consultation!A:G",
    valueInputOption: "RAW",
    requestBody: { values }
  });

  console.log("✅ Sheet append status", res.status);
  return res;
}

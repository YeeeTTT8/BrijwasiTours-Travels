// server/google-sheets.ts
import "dotenv/config";
import { google } from "googleapis";
import type { InsertConsultationRequest } from "@shared/schema";

// Load only the spreadsheet ID from env
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
if (!SPREADSHEET_ID) {
  throw new Error("Please set SPREADSHEET_ID in your .env");
}

/**
 * Append one consultation row to your sheet.
 */
export async function appendConsultationRow(data: InsertConsultationRequest) {
  // This expects GOOGLE_APPLICATION_CREDENTIALS to point at your JSON key file:
  // export GOOGLE_APPLICATION_CREDENTIALS=./server/credentials.json
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  console.log("📨 Appending to sheet:", SPREADSHEET_ID, data);

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "Consultation!A1:G",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        new Date().toLocaleString(),
        data.name,
        data.email,
        data.phone,
        data.destination,
        data.travelDate || "",
        data.additionalInfo || "",
      ]],
    },
  });

  console.log("✅ Append status:", res.status);
  return res;
}

// Vercel Serverless Function — Proxy for monday.com API
// This keeps your API token secure on the server side

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { name, title, company, email, phone, interest } = req.body;

  if (!name || !title || !company || !email || !interest) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // monday.com board config
  const BOARD_ID = 18409110358;
  const API_TOKEN = process.env.MONDAY_API_TOKEN; // Set in Vercel Environment Variables

  if (!API_TOKEN) {
    console.error("MONDAY_API_TOKEN not configured");
    return res.status(500).json({ error: "Server configuration error" });
  }

  // Build column values
  const columnValues = JSON.stringify({
    text_mm2g97bv: title,           // Job Title
    text_mm2gpwhz: company,         // Company
    email_mm2g35c8: { email: email, text: email },  // Email
    phone_mm2g4vzz: { phone: phone || "", countryShortName: "TH" },  // Phone
    dropdown_mm2g5vpg: { labels: [interest] },  // Primary Interest
    color_mm2g6rkz: { label: "Registered" },    // Registration Status
  });

  const mutation = `mutation {
    create_item(
      board_id: ${BOARD_ID},
      item_name: "${name.replace(/"/g, '\\"')}",
      column_values: ${JSON.stringify(columnValues)}
    ) {
      id
      name
    }
  }`;

  try {
    const response = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: API_TOKEN,
      },
      body: JSON.stringify({ query: mutation }),
    });

    const data = await response.json();

    if (data.errors) {
      console.error("monday.com API error:", JSON.stringify(data.errors));
      return res.status(500).json({ error: "Registration failed", details: data.errors });
    }

    return res.status(200).json({
      success: true,
      message: "Registration successful",
      item_id: data.data?.create_item?.id,
    });
  } catch (error) {
    console.error("API call failed:", error);
    return res.status(500).json({ error: "Registration failed" });
  }
}

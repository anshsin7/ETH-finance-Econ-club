// Vercel Serverless Function — receives a board application + optional CV upload.
//
// FREE on Vercel's Hobby tier:
//  - The function invocation is free.
//  - The CV file is stored in Vercel Blob (generous free allowance — ample for a club).
//  - Optionally forwards the text fields to a Formspree endpoint so you also get an
//    email notification (Formspree's free plan handles the text fields fine).
//
// Setup (see README → "Free CV uploads (Vercel Blob)"):
//  1. In your Vercel project, add the Blob store:  Storage → Create → Blob.
//     That auto-adds the BLOB_READ_WRITE_TOKEN env var.
//  2. (Optional) Add env var FORMSPREE_ENDPOINT = https://formspree.io/f/xaqbpoel
//     to also receive an email for each application.
//  3. Redeploy. Done — uploads are received and stored for free.

import { put } from "@vercel/blob";

export const config = {
  api: { bodyParser: false }, // we parse multipart ourselves via the Web API
};

const MAX_CV_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED = [".pdf", ".doc", ".docx"];

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Vercel provides a Web-standard Request on req; use formData() to parse multipart.
    const formData = await req.formData();

    const name = (formData.get("name") || "").toString().trim();
    const email = (formData.get("email") || "").toString().trim();
    const program = (formData.get("program") || "").toString().trim();
    const interest = (formData.get("interest") || "").toString().trim();
    const note = (formData.get("note") || "").toString().trim();
    const cv = formData.get("cv"); // a File (Blob) or null

    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required." });
    }

    let cvUrl = null;

    if (cv && typeof cv === "object" && cv.size > 0) {
      const lower = (cv.name || "cv").toLowerCase();
      if (!ALLOWED.some((ext) => lower.endsWith(ext))) {
        return res.status(400).json({ error: "CV must be a PDF, DOC, or DOCX file." });
      }
      if (cv.size > MAX_CV_BYTES) {
        return res.status(400).json({ error: "CV exceeds the 5 MB limit." });
      }

      const safeName = (cv.name || "cv").replace(/[^a-zA-Z0-9._-]/g, "_");
      const key = `cvs/${Date.now()}-${safeName}`;

      // Store the CV in Vercel Blob (free tier).
      const blob = await put(key, cv, {
        access: "public", // use "public" so you can open the link; switch to private if preferred
        addRandomSuffix: true,
      });
      cvUrl = blob.url;
    }

    // Optionally forward the text details to Formspree for an email notification.
    const formspree = process.env.FORMSPREE_ENDPOINT;
    if (formspree) {
      try {
        await fetch(formspree, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            name,
            email,
            program,
            interest,
            note,
            cv: cvUrl || "(no CV attached)",
          }),
        });
      } catch (e) {
        // Non-fatal: the application + CV are still stored even if email forwarding fails.
        console.error("Formspree forward failed:", e);
      }
    }

    return res.status(200).json({ ok: true, cvUrl });
  } catch (err) {
    console.error("apply handler error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}


import { NextResponse } from "next/server";

export async function POST(req) {
  if (!process.env.GROQ_API_KEY) {
    console.warn("⚠️ Missing Groq API key. AI features may not work.");
    return NextResponse.json({ error: "API key missing. AI temporarily unavailable." }, { status: 500 });
  }

  try {
    const { message } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content:
              "You are a resume writing assistant. Rewrite the user's sentence using action verbs and a resume-friendly tone. Keep it professional and concise. Do not include any conversational filler, just the improved text.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Groq API Error:", data.error);
      return NextResponse.json({ success: false, error: data.error.message || "AI failed" });
    }

    return NextResponse.json({
      success: true,
      message: data.choices[0].message.content,
    });
  } catch (err) {
    console.error("AI Enhance Error:", err);
    return NextResponse.json({ success: false, error: err.message });
  }
}

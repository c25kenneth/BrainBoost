import { getSession } from "@/lib/auth/auth";
import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

export async function POST(request: Request) {
    const session = await getSession(); 

    if (!session) {
        return NextResponse.json({error: "Unauthorized request"}, {status: 401}); 
    }

    const body = await request.json(); 
    const prompt = `You are an expert study assistant. Analyze the following text extracted from a study document and generate a structured summary in JSON format.

        Return ONLY valid JSON with no markdown, no code blocks, and no extra text. Use this exact structure:
        {
        "tldr": "A concise 2-3 sentence summary of the entire document",
        "keyConcepts": ["concept 1", "concept 2", "...up to 10 key concepts or definitions"],
        "formulas": ["formula or equation 1", "...all notable formulas, equations, or rules"],
        "examTopics": ["topic 1", "...up to 10 topics most likely to appear on an exam"]
        }

        If a category has no relevant content (e.g. no formulas in a history document), return an empty array for that field.

        Document text:
        """
        ${body["extractedText"]}
        """`;


        try {
            const response = await ai.models.generateContent({
                model: "gemini-3-flash-preview",
                contents: prompt,
            });

            const parsed = JSON.parse(response.text ?? "{}");
            return NextResponse.json({ message: "Success", data: parsed }, { status: 200 });
        } catch (error) {
            return NextResponse.json({message: "Internal server error. Something went wrong"}, {status: 500});
        }
}
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load and validate API key
if (!process.env.GEMINI_API_KEY) {
  throw new Error(
    "NEXT_PUBLIC_GEMINI_API_KEY is not defined in environment variables"
  );
}

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Configure the model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Generation configuration
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export async function POST(req) {
  try {
    // Extract context and tone from request body
    const { context, tone } = await req.json();

    // Validate input parameters
    if (!context || !tone) {
      return new Response(
        JSON.stringify({
          error: "Missing required parameters: context and tone",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Create chat session with history
    const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {
              text: `You are an AI assistant specialized in crafting email responses. Your task is to generate a reply to the following email context. Please follow these guidelines:

1. Tone: ${tone}
2. Original Email Context: ${context}
3. Key Points to Address: [Extract 2-3 main points from the original email]
4. Response Length: Aim for a concise response, typically 3-5 sentences.
5. Maintain a professional demeanor while adhering to the specified tone.
6. Do not include any salutations or signatures in your response.

Based on these guidelines, please generate an appropriate email response:`,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: "I'll help you craft an email response based on the context and guidelines provided.",
            },
          ],
        },
      ],
    });

    // Send the message and get the response
    const result = await chatSession.sendMessage(
      "Please generate the email response now."
    );
    const responseText = result.response.text();

    // Return the response
    return new Response(JSON.stringify({ response: responseText }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

import { VertexAI } from "@google-cloud/vertexai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";

export async function generateAIResponse(
    systemInstruction: string,
    history: any[],
    message: string,
    defaultModel: string = "gemini-2.5-flash"
): Promise<string> {
    // Determine provider. Fallback to vertexai if only GOOGLE_CLOUD_PROJECT_ID is provided for backwards compatibility.
    const provider = process.env.AI_PROVIDER || (process.env.GOOGLE_CLOUD_PROJECT_ID ? 'vertexai' : 'none');
    const apiKey = process.env.AI_API_KEY;
    const modelName = process.env.AI_MODEL_OVERRIDE;

    const chatHistory = history && history.length > 0 ? history.map((h: any) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.content}`).join('\n') : '';
    const fullPrompt = `${chatHistory}\nUser: ${message}`;

    if (provider === 'none') {
        throw new Error("No AI provider configured");
    }

    if (provider === 'vertexai') {
        const project = process.env.GOOGLE_CLOUD_PROJECT_ID;
        const location = process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
        if (!project) throw new Error("GOOGLE_CLOUD_PROJECT_ID missing for vertexai");

        const vertexAiOptions: any = { project, location };

        if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
            vertexAiOptions.googleAuthOptions = {
                credentials: {
                    client_email: process.env.GOOGLE_CLIENT_EMAIL,
                    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                }
            };
        }

        const vertexAI = new VertexAI(vertexAiOptions);
        const model = vertexAI.getGenerativeModel({
            model: modelName || defaultModel,
            systemInstruction: { role: 'system', parts: [{ text: systemInstruction }] },
            generationConfig: { responseMimeType: "application/json" }
        });

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        return response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    }

    if (provider === 'gemini') {
        if (!apiKey) throw new Error("AI_API_KEY missing for gemini");
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: modelName || defaultModel,
            systemInstruction: systemInstruction,
            generationConfig: { responseMimeType: "application/json" }
        });

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        return response.text();
    }

    if (provider === 'anthropic') {
        if (!apiKey) throw new Error("AI_API_KEY missing for anthropic");
        const anthropic = new Anthropic({ apiKey });

        const msg = await anthropic.messages.create({
            model: modelName || "claude-3-5-sonnet-latest",
            max_tokens: 1024,
            system: systemInstruction,
            messages: [{ role: 'user', content: fullPrompt }]
        });

        // @ts-ignore - The content block is always expected to be text for our usage
        return msg.content[0]?.text || "";
    }

    if (provider === 'openai' || provider === 'nebius' || provider === 'openrouter') {
        if (!apiKey) throw new Error(`AI_API_KEY missing for ${provider}`);
        const config: any = { apiKey };

        if (provider === 'nebius') {
            config.baseURL = "https://api.studio.nebius.ai/v1/";
        } else if (provider === 'openrouter') {
            config.baseURL = "https://openrouter.ai/api/v1";
        }

        const openai = new OpenAI(config);
        let resolvedModelName = modelName;
        if (!resolvedModelName) {
            if (provider === 'openai') resolvedModelName = "gpt-4o-mini";
            if (provider === 'nebius') resolvedModelName = "meta-llama/Meta-Llama-3.1-70B-Instruct";
            if (provider === 'openrouter') resolvedModelName = "google/gemini-2.5-flash"; // A fast default for openrouter
        }

        const response = await openai.chat.completions.create({
            model: resolvedModelName as string,
            // Optional JSON mode. Some Nebius models or OpenRouter might complain if we strictly enforce it,
            // but it usually works for general instruct models if "json" is in prompt.
            response_format: provider === 'openai' ? { type: "json_object" } : undefined,
            messages: [
                { role: "system", content: systemInstruction },
                { role: "user", content: fullPrompt }
            ]
        });

        return response.choices[0]?.message?.content || "";
    }

    throw new Error(`Invalid AI_PROVIDER: ${provider}`);
}

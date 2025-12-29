import fs from 'fs';
import path from 'path';

// Configuration
const API_BASE_URL = "https://api.gpt.ge";

export interface ImageGenerationResult {
    base64: string;
    originalUrl: string;
}

export class ApiClient {
    private apiKey: string;

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /**
     * Generates an image using the nano-banana-pro model via chat completions.
     * This is a "hack" because the API exposes image generation via a chat interface.
     */
    async generateImage(prompt: string, styleReferenceImagePaths?: string[]): Promise<ImageGenerationResult> {
        const messages: any[] = [
            {
                role: "system",
                content: "You are an expert AI artist. Generate a high-quality, distinctive image based on the user's prompt. Return the image URL in markdown format. Use the provided images as absolute style references to ensure the new image belongs to the EXACT SAME character collection (claymorphism, proportions, lighting, colors)."
            }
        ];

        const messageContent: any[] = [
            { type: "text", text: `Generate an image based on this personality description: ${prompt}` }
        ];

        // If style references are provided
        if (styleReferenceImagePaths && styleReferenceImagePaths.length > 0) {
            for (const imgPath of styleReferenceImagePaths) {
                if (fs.existsSync(imgPath)) {
                    try {
                        const imageBuffer = fs.readFileSync(imgPath);
                        const base64Image = imageBuffer.toString('base64');
                        const mimeType = imgPath.endsWith('.png') ? 'image/png' : 'image/jpeg';
                        const dataUrl = `data:${mimeType};base64,${base64Image}`;

                        messageContent.push({
                            type: "image_url",
                            image_url: { url: dataUrl }
                        });
                    } catch (e) {
                        console.error(`Failed to read style reference image at ${imgPath}:`, e);
                    }
                }
            }
            messageContent[0].text += " The attached images are from the same collection. Mimic their visual style, claymorphic texture, and lighting perfectly.";
        }

        messages.push({
            role: "user",
            content: messageContent
        });

        try {
            console.log("Sending request to Banana Pro API...");
            const response = await fetch(`${API_BASE_URL}/v1/chat/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: "nano-banana-pro",
                    messages: messages,
                    stream: false
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API Error ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const content = data.choices?.[0]?.message?.content || "";

            // Extract URL from markdown like ![image](https://...)
            const urlMatch = content.match(/\(https:\/\/[^)]+\)/);
            if (!urlMatch) {
                throw new Error("No image URL found in response: " + content);
            }

            const imageUrl = urlMatch[0].slice(1, -1);
            console.log("Image URL extracted:", imageUrl);

            // Fetch the image to convert to base64 (optional, but good for local saving)
            const imgResponse = await fetch(imageUrl);
            const arrayBuffer = await imgResponse.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const base64 = buffer.toString('base64');

            return {
                base64: base64, // Raw base64 string without data prefix (caller adds it if needed for file)
                originalUrl: imageUrl
            };

        } catch (error) {
            console.error("Generate Image failed:", error);
            throw error;
        }
    }
}

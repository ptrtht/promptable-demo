import dotenv from 'dotenv';
dotenv.config();

import { OpenAI } from '@getpromptable/core';
// import { OpenAI } from 'openai';

// env vars
const openai_api_key = process.env.OPENAI_API_KEY;
const promptable_api_key = process.env.PROMPTABLE_API_KEY;

const client = new OpenAI({
    apiKey: openai_api_key,
});
client.promptable_api_key = promptable_api_key;

async function generateText(prompt) {
    try {
        const response = await client.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 150
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Usage example
const prompt = "What is the capital of France?";

const vars = [
    "France",
    "Sweden",
    "Germany",
    "Italy",
    "Spain",
    "Portugal",
    "Poland",
]
// vars.forEach(variable => {
//     generateText(prompt.replace("France", variable))
//         .then(result => console.log(result))
//         .catch(error => console.error(error));
// });

generateText(prompt)
    .then(result => console.log(result))
    .catch(error => console.error(error));
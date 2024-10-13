import OpenAI from "openai";

import dotenv from "dotenv"
dotenv.config();
const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY,
});

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "in this chat i will give you some message and i want you to give me data in json in the order:\nASIN:\nPrice:\nMOQ:\nROI:\nif any data is absent then skip it but asin and price is required and if there is no asin then u have to extract the asin from the amazon link\n in response just give me json data notihing else" },
        { role:"user", content:"https://www.amazon.com/DP/B0145N1HH2\n$17\nMOQ: 500\nROI: 50%\nOrder; @globalprimellc"}
    ],
});

console.log(completion.choices[0].message);
console.log(completion.choices);

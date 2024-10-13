import express from "express";
import dotenv from "dotenv";
dotenv.config();
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(express.json());

app.post("/format", async (req, res) => {
  const { msg } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "in this chat i will give you some message and i want you to give me data in json in the order:\nASIN:\nPrice:\nMOQ:\nROI:\nif any data is absent then skip it but asin and price is required and if there is no asin then u have to extract the asin from the amazon link\n in response just give me json data notihing else",
      },
      { role: "user", content: JSON.stringify(msg) },
    ],
  });

  const content = completion.choices[0].message.content;
  const jsonString = content.match(/```json\n([\s\S]+?)\n```/)[1];

  const jsonResponse = JSON.parse(jsonString);
  res.json(jsonResponse);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(3000, () => {
  console.log("App is listening on Port 3000");
});

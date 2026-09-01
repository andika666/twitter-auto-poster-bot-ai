// By VishwaGauravIn (https://itsvg.in)

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");

// Mengambil kredensial dari Environment Variables (GitHub Secrets)
const twitterClient = new TwitterApi({
  appKey: process.env.FCGysjPxxAJfWvAijCT6gSoOk,
  appSecret: process.env.upmrYT9BqATsqlfUHtK5GSsFMCWuwfpYG0quOM8raQyUsFv8Sh,
  accessToken: process.env.2094661946960171008-TRQ5tgYeDOxAvPiak0m8D2D2jro7W1,
  accessSecret: process.env.QmIOhX7W0da8TjUNT5kiBUXhVULLYqbj8kQeX8NYBisf2,
});

const genAI = new GoogleGenerativeAI(process.env.AQ.Ab8RN6J8oLbko3ukgUZnFC6gnaFvbB9wB7g5uU9uYX6j3CLsiA);

const generationConfig = {
  maxOutputTokens: 400,
};

async function run() {
  // Gunakan model gemini-1.5-flash (lebih cepat dan terbaru)
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig,
  });

  // Prompt multi-baris menggunakan backtick (`)
  const prompt = `You are an automated real-time X/Twitter bot for Pons Family (@ponsdotfamily) and Pons Launchpad (ponsfamily.com/launchpad).
Your task: Generate concise tweets (under 200 characters) about token launches, Graduation alerts (liquidity locked), price pumps/ATH, and ecosystem updates on Robinhood Chain.
Make it engaging and post-ready. Do not use hashtags excessively.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    console.log("Generated Tweet:\n", text);
    await sendTweet(text);
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}

run();

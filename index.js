// By VishwaGauravIn (https://itsvg.in)

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");

// Mengambil kredensial dari Environment Variables (GitHub Secrets)
const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_APP_KEY,
  appSecret: process.env.TWITTER_APP_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generationConfig = {
  maxOutputTokens: 400,
};

async function run() {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig,
  });

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

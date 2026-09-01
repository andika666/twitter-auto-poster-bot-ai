// By VishwaGauravIn (https://itsvg.in)

const GenAI = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.FCGysjPxxAJfWvAijCT6gSoOk,
  appSecret: SECRETS.upmrYT9BqATsqlfUHtK5GSsFMCWuwfpYG0quOM8raQyUsFv8Sh,
  accessToken: SECRETS.2094661946960171008-TRQ5tgYeDOxAvPiak0m8D2D2jro7W1,
  accessSecret: SECRETS.QmIOhX7W0da8TjUNT5kiBUXhVULLYqbj8kQeX8NYBisf2,
});

const generationConfig = {
  maxOutputTokens: 400,
};
const genAI = new GenAI.GoogleGenerativeAI(SECRETS.AQ.Ab8RN6J8oLbko3ukgUZnFC6gnaFvbB9wB7g5uU9uYX6j3CLsiA
);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
  });

  // Write your prompt here
  const prompt =
    "You are an automated real-time X/Twitter bot for Pons Family (@ponsdotfamily) and Pons Launchpad (ponsfamily.com/launchpad).";

"Your task: Monitor and fetch real-time updates directly from the official X account https://x.com/ponsdotfamily and generate concise tweets (under 200 characters).";

"Real-time token launches, Graduation alerts (liquidity locked), price pumps/ATH, and ecosystem updates on Robinhood Chain.";

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}

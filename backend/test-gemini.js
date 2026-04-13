require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

async function test() {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    console.log("Key length:", apiKey ? apiKey.length : 0);
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const requestUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const response = await fetch(requestUrl);
    const data = await response.json();
    const models = data.models?.filter(m => m.supportedGenerationMethods?.includes("generateContent")).map(m => m.name.split('/')[1]) || [];
    
    console.log("Testing Models:", models.slice(0, 8));
    for (let modelName of models.slice(0, 8)) {
      try {
         const model = genAI.getGenerativeModel({ model: modelName });
         const result = await model.generateContent("test");
         console.log(`\n✅ ${modelName} SUCCESS! Response:`, await result.response.text());
      } catch (err) {
         console.log(`\n❌ ${modelName} FAILED:`, err.status || err.message.substring(0, 80));
      }
    }
  } catch (e) {
    console.error("RAW ERROR:", e);
  }
}
test();

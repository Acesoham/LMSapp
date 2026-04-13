const { GoogleGenerativeAI } = require("@google/generative-ai");

const handleCourseChat = async (req, res) => {
  const { message, courseContext } = req.body;

  if (!message || !courseContext) {
    return res.status(400).json({ error: 'Message and courseContext are required' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    
    // Fallback if no valid API key is set
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
      // Simulate network delay for realistic fallback
      await new Promise(resolve => setTimeout(resolve, 1500));
      return res.status(200).json({
        reply: `[MOCK AI - No Key Configured] I am here to help you understand "${courseContext}". You asked: "${message}". Please update the GEMINI_API_KEY in the backend to receive live answers!`,
      });
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a friendly, expert AI teaching assistant for an e-learning platform called EduFlow. 
The student is currently taking the course: "${courseContext}". 
Student's question: "${message}"

Please provide a helpful, accurate, and concise answer directly related to this course topic. Use simple markdown if needed (like * or **). Keep it under 2 short paragraphs. Stay in character as a helpful mentor.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error('Chat AI Error:', error.message);
    // If the API key is invalid or has 0 quota (429/404), fallback to a mock response so the UI doesn't crash during testing.
    return res.status(200).json({ 
      reply: `[Demo Mode] It looks like the Gemini API key has exceeded its quota or requires billing to be activated. As a fallback, here is simulated info for **${courseContext}**: This course will teach you everything you need to master the topic!`
    });
  }
};

module.exports = { handleCourseChat };

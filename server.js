// server.js
const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route to handle form submission and make API call to GPT-3
app.post("/analyze-house", async (req, res) => {
  try {
    const { description } = req.body;

    // Call GPT-3 API for analysis
    const assessmentData = await analyzeHouse(description);

    // Send assessment data as JSON response
    res.json(assessmentData);
  } catch (error) {
    console.error("Error analyzing house:", error);
    res.status(500).json({ error: "Failed to analyze house" });
  }
});

// Function to make API call to GPT-3 for analysis
async function analyzeHouse(description) {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/davinci/completions",
      {
        method: "POST",
        headers: {
          Authorization:
            "Bearer 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", // Replace with your GPT-3 API key
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: description,
          max_tokens: 100, // Adjust as needed
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to analyze house");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error analyzing house:", error);
    throw error;
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

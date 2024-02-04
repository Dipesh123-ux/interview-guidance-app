const axios = require("axios");

exports.generateResponse = async (req, res) => {
  try {
    const { role, industry, skills } = req.body;
    const apiKey = process.env.API_KEY; 

    const response = await axios.post(
      "https://api.getknit.ai/v1/router/run",
      {
        messages: [
          {
            role: "system",
            content:
              "Imagine you are a genius, who has information about anything for example engineering, business, commerce and all the fields. You have also taken alot of interviews also and you can guide other for their carrier path.",
          },
          {
            role: "user",
            content: "I have an interview for the position {{role}} in an {{industry}}. I have these {{skills}}. Can you please guide me for the interview and give me some points which I can take care in the interviews. Also give me the list of most asked questions for that particular position. Please make all the things very organised",
          },
        ],
        model: { name: "openai/gpt-3.5-turbo" },
        variables: [
          { name: "role", value: role },
          { name: "industry", value: industry },
          { name: "skills", value: skills}
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": apiKey,
        },
      }
    );

    // Extract the relevant data from the Axios response
    const responseData = {
      status: response.status,
      data: response.data,
    };

    return res.status(200).json({
        result : responseData.data.responseText
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: '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'//'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'
});

const generateImage = async (req, res) => {
  try {
    const image = await openai.images.generate({
      prompt: "A cute baby sea otter", n: 1,
      size: '512x512',
    }, {
      proxy: {
        host: '127.0.0.1',
        port: 7890
      }
    });

    res.status(200).json({
      success: true,
      data: image,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }

    res.status(400).json({
      success: false,
      error: 'The image could not be generated',
    });
  }
};

module.exports = { generateImage };

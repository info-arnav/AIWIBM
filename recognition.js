const fs = require("fs");
const audioRecorder = require("./recorder");
const SpeechToTextV1 = require("ibm-watson/speech-to-text/v1");
const { IamAuthenticator } = require("ibm-watson/auth");

const speechToText = new SpeechToTextV1({
  authenticator: new IamAuthenticator({
    apikey: "h1hI4V_9xqbKciuwRGN3HBRKFwarT_1we46AK3_aYRdv",
  }),
  serviceUrl:
    "https://api.eu-gb.speech-to-text.watson.cloud.ibm.com/instances/6143d377-4387-4f74-8ede-44bfd527b768",
});

const recognizeParams = {
  audio: fs.createReadStream("audio-file2.flac"),
  contentType: "audio/flac",
  wordAlternativesThreshold: 0.9,
  keywords: ["colorado", "tornado", "tornadoes"],
  keywordsThreshold: 0.5,
};

speechToText
  .recognize(recognizeParams)
  .then((speechRecognitionResults) => {
    console.log(
      JSON.stringify(
        speechRecognitionResults.result.results[0].alternatives[0].transcript
      )
    );
    if (
      speechRecognitionResults.result.results[0].alternatives[0].transcript ==
      "condition"
    ) {
      console.log("this result");
    }
  })
  .catch((err) => {
    console.log("error:", err);
  });

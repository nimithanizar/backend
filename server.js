const express = require('express');
const path=require('path');
// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');

//import otpHelper.js

const otpHelper = require('./otpHelper')

// Import other required libraries
const fs = require('fs');
const util = require('util');
const app = express();
const port = 8000;

// use otpHelper file(ceate endpoint)
app.use('/otp',otpHelper)

app.use(express.static('public'));


// Creates a client
const client = new textToSpeech.TextToSpeechClient();




//app.post('/sample', (req, res) => {
 // console.log("req::",req.query)
//res.send('Hello World, from express');
//});

app.post('/converter',async (req, res) => {
 console.log(req.query.text);
let audiofile = await convertAudio(req.query.text);
console.log("audio string",audiofile);  
//res.send(audiofile);

res.sendFile(path.join(__dirname,audiofile));
});

async function convertAudio(input) {
  // The text to synthesize
  const text = input;
 // Construct the request
    const request = {
      input: {text: text},
      // Select the language and SSML voice gender (optional)
      voice: {languageCode: 'en-IN',name: 'en-IN-Wavenet-D', ssmlGender: 'FEMALE'},
      // select the type of audio encoding
      audioConfig: {audioEncoding: 'MP3', speakingRate: 0.9},
    };


     // Get the current date and time as a string
const now = new Date().toISOString().replace(/:/g, '_').replace(/\..+/, '');

// Set the output filename with the current date and time appended
const outputFilename = `output_${now}.mp3`;


  // Performs the text-to-speech request
  const [response] = await client.synthesizeSpeech(request);
  // Write the binary audio content to a local file
  const writeFile = util.promisify(fs.writeFile);
  await writeFile(outputFilename, response.audioContent, 'binary');
   console.log('Audio content written to file: output.mp3');


  
// returning audio file in binary format
 return outputFilename;
}
app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))












	
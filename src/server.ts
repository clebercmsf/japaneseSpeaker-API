import fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import { TextToSpeechClient } from '@google-cloud/text-to-speech';
import { z } from 'zod';
import dotenv from 'dotenv';


dotenv.config();
const app = fastify();

app.register(fastifyCors, {
  origin: '*',
  methods: ['POST']
});

const client = new TextToSpeechClient();

app.post("/textConverter", async (req, res) => {
  const converterTextSchema = z.object({
    text: z.string()
  });

  const { text } = converterTextSchema.parse(req.body);

  const request = {
    audioConfig: {
      audioEncoding: "LINEAR16" as const,
      effectsProfileId: [
        "handset-class-device"
      ],
      pitch: 0,
      speakingRate: 1
    },
    input: {
      text: text
    },
    voice: {
      languageCode: "ja-JP",
      name: "ja-JP-Standard-B"
    }
  }

  const [response] = await client.synthesizeSpeech(request);
  const audio = response.audioContent;

  res.header("Content-Type", "audio/mpeg");
  res.send(audio);
});


app.listen({
  host: '0.0.0.0',
  port: process.env.PORT ? Number(process.env.PORT) : 10000
}).then(() => {
  console.log('HTTP Server Running');
}).catch((err) => {
  console.log(err.message);
});
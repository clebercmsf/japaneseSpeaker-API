"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));
var import_text_to_speech = require("@google-cloud/text-to-speech");
var import_zod = require("zod");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var app = (0, import_fastify.default)();
app.register(import_cors.default, {
  origin: "*",
  methods: ["POST"]
});
var client = new import_text_to_speech.TextToSpeechClient();
app.post("/textConverter", async (req, res) => {
  const converterTextSchema = import_zod.z.object({
    text: import_zod.z.string()
  });
  const { text } = converterTextSchema.parse(req.body);
  const request = {
    audioConfig: {
      audioEncoding: "LINEAR16",
      effectsProfileId: [
        "handset-class-device"
      ],
      pitch: 0,
      speakingRate: 1
    },
    input: {
      text
    },
    voice: {
      languageCode: "ja-JP",
      name: "ja-JP-Standard-B"
    }
  };
  const [response] = await client.synthesizeSpeech(request);
  const audio = response.audioContent;
  res.header("Content-Type", "audio/mpeg");
  res.send(audio);
});
app.get("/health", async (req, res) => {
  res.status(200).send("Servidor est\xE1 operacional");
});
app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 1e4
}).then(() => {
  console.log("HTTP Server Running");
}).catch((err) => {
  console.log(err.message);
});

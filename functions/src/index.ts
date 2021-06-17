import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
// import bodyParser = require("body-parser");

admin.initializeApp();


const app = express();
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: true }));


export const api = functions.https.onRequest(app);


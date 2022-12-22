import express from "express";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
const cors = require("cors");

import routes from "./routes/notesRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

// lowdb connection
const adapter = new JSONFile(process.env.PROD ? "db.json" : "db.test.json");
const db = new Low(adapter);
await db.read();
db.data ||= { notes: [] };

app.use("/", routes);

export { app, db };

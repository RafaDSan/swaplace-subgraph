import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { getRanking } from "./swapModel.ts";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers",
  );
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("First page test");
});

app.get("/ranking", async (req, res) => {
  try {
    const result = await getRanking();
    res.status(200).json({ total_count: result.rows[0].total_count });
  } catch (error) {
    console.error("Error fetching ranking:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

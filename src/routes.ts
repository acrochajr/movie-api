import { Router } from "express";
import { getProducerWithMinMaxInterval } from "./controllers/movieController";
import { uploadAndProcessCSV } from "./services/uploadService";

export const router = Router();

router.post("/upload", uploadAndProcessCSV, (req, res) => {
  try {
    res.send("Arquivo CSV recebido com sucesso!");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/producers/minmax-interval", getProducerWithMinMaxInterval);

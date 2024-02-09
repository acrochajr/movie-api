import { Router } from "express";
import { moviesList, getIntervals } from "./controllers/movieController";
// import { uploadAndProcessCSV } from "./services/processService";

/*
 * Inicialmente tinha feito a importacao do arquivo via upload, depois relendo
 * o enunciado percebi que nao era necessario, entao comentei a importacao e rota
 */

export const router = Router();
// Rota para fazer upload e processar o arquivo CSV , comentado pois nao era necessario.
// router.post("/upload", uploadAndProcessCSV);

// Rota para retornar todos os filmes
router.get("/getall", moviesList);
// Rota para retornar os intervalos
router.get("/intervals", getIntervals);

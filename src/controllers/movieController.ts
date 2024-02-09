import { Request, Response } from "express";
import { getAllMovies, findProducers } from "../services/movieService";

// Função para retornar todos os filmes
export const moviesList = async (req: Request, res: Response) => {
  try {
    const movies = await getAllMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).send(error);
  }
};
// Função para retornar os intervalos
export const getIntervals = async (req: Request, res: Response) => {
  try {
    const movies = await findProducers();
    res.json(movies);
  } catch (error) {
    res.status(500).send(error);
  }
};

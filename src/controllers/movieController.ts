import { Request, Response } from "express";
// import { getProducerWithMinMaxIntervalService } from "../services/movieService";

export const getProducerWithMinMaxInterval = async (
  req: Request,
  res: Response
) => {
  try {
    // const data = await getProducerWithMinMaxIntervalService();
    // res.json(data);
    res.json({ max: {}, min: {} });
  } catch (error) {
    res.status(500).send(error);
  }
};

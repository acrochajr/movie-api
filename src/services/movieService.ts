import { sequelize } from "../config/db";
import { initMovie } from "../models/movie";
import { IMovie } from "../models/movie";

// Define o tipo de intervalos
interface Intervals {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}
//  Inicializa o modelo de filme
const MovieModel = initMovie(sequelize);
// Retorna todos os filmes
export const getAllMovies = async (): Promise<any[]> => {
  return MovieModel.findAll();
};
// Retorna todos os filmes vencedores
const getWinnerMovies = async (): Promise<any[]> => {
  return MovieModel.findAll({ where: { winner: "yes" } });
};

export const findProducers = async (): Promise<{
  max: Intervals[];
  min: Intervals[];
}> => {
  const movies = await getWinnerMovies();
  let producers: { [key: string]: number[] } = {};

  // Busca os produtores dos filmes vencedores
  movies.forEach((movie) => {
    if (movie.winner === "yes") {
      const normalizeProducer = movie.producers.replace(/ and /g, ", ");
      const producersList = normalizeProducer.split(", ");
      producersList.forEach((producer: any) => {
        if (!producers[producer]) {
          producers[producer] = [];
        }
        producers[producer].push(movie.year);
      });
    }
  });
  // Calcula os intervalos
  let max: Intervals[] = [];
  let min: Intervals[] = [];
  let maxIntervalValue = 0;
  let minIntervalValue = Infinity;

  Object.keys(producers).forEach((producer) => {
    producers[producer].sort();
    // Calcula os intervalos no formato de objeto como requisitado no teste
    for (let i = 1; i < producers[producer].length; i++) {
      let interval = producers[producer][i] - producers[producer][i - 1];
      let intervalData: Intervals = {
        producer: producer,
        interval: interval,
        previousWin: producers[producer][i - 1],
        followingWin: producers[producer][i],
      };

      if (interval > maxIntervalValue) {
        maxIntervalValue = interval;
        max = [intervalData];
      } else if (interval === maxIntervalValue) {
        max.push(intervalData);
      }

      if (interval < minIntervalValue && interval > 0) {
        minIntervalValue = interval;
        min = [intervalData];
      } else if (interval === minIntervalValue) {
        min.push(intervalData);
      }
    }
  });
  // Retorna os intervalos
  return { min, max };
};

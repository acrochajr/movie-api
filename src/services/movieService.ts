// import { parse } from "some-csv-parsing-library";

// interface Movie {
//   // Defina as propriedades de acordo com o seu arquivo CSV
//   year: number;
//   title: string;
//   studio: string;
//   producer: string;
//   winner: boolean;
// }

// interface ProducerInterval {
//   producer: string;
//   interval: number;
//   previousWin: number;
//   followingWin: number;
// }

// export const getProducerWithMinMaxIntervalService = async (): Promise<{
//   max: ProducerInterval;
//   min: ProducerInterval;
// }> => {
//   // Leia e analise o arquivo CSV
//   const movies: Movie[] = await parseCSVFile("path/to/your/file.csv");

//   // Processar os dados para calcular os intervalos
//   const intervals = calculateIntervals(movies);

//   // Encontrar os produtores com os maiores e menores intervalos
//   const maxInterval = findMaxInterval(intervals);
//   const minInterval = findMinInterval(intervals);

//   return { max: maxInterval, min: minInterval };
// };

// const parseCSVFile = async (filePath: string): Promise<Movie[]> => {
//   // Implementar a lógica de leitura e análise do CSV
// };

// const calculateIntervals = (movies: Movie[]): ProducerInterval[] => {
//   // Implementar a lógica para calcular os intervalos
// };

// const findMaxInterval = (intervals: ProducerInterval[]): ProducerInterval => {
//   // Implementar a lógica para encontrar o maior intervalo
// };

// const findMinInterval = (intervals: ProducerInterval[]): ProducerInterval => {
//   // Implementar a lógica para encontrar o menor intervalo
// };

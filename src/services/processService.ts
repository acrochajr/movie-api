// import multer from "multer";
import { Readable } from "stream";
import { parse } from "csv-parse";
import { initMovie } from "../models/movie";
import { sequelize } from "../config/db";
import { CSVData } from "../models/cvs";

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });
// Inicializa o modelo de filme
const MovieModel = initMovie(sequelize);
// Processa o arquivo CSV em um buffer
export const processCSV = async (fileBuffer: Buffer): Promise<void> => {
  // console.log("Processing CSV file...", fileBuffer?.toString("utf-8"));

  const promises: Promise<any>[] = [];
  // Recebe os erros
  const errors: string[] = [];
  // Processa o arquivo CSV
  console.log("Processing CSV file...");
  return new Promise((resolve, reject) => {
    Readable.from(fileBuffer.toString("utf-8"))
      .pipe(parse({ columns: true, delimiter: ";" }))
      .on("data", (data: CSVData) => {
        // Verifica se os dados do CSV são válidos
        try {
          if (
            !data.year ||
            !data.title ||
            !data.studios ||
            !data.producers ||
            data.winner === undefined
          ) {
            errors.push(
              `Dados CSV inválidos, verifique o arquivo e envie novamente: ${JSON.stringify(
                data
              )}`
            );
            return;
          }
          // Processa os dados do CSV
          const processedData = {
            year: parseInt(data.year, 10),
            title: data.title,
            studios: data.studios,
            producers: data.producers,
            winner: data.winner ? "yes" : "",
          };
          // Adiciona o registro ao banco de dados
          const createPromise = MovieModel.create(processedData)
            .then(() =>
              console.log("Registro adicionado com sucesso: ", processedData)
            )
            .catch((error) =>
              console.error("Erro ao adicionar registro: ", error)
            );
          promises.push(createPromise);
        } catch (error) {
          errors.push(`Erro na linha ${data}: ${error}`);
        }
      })
      // Aguarda a conclusão de todas as operações de adição de registros
      .on("error", (error) => reject(error))
      .on("end", () => {
        if (errors.length > 0) {
          reject(new Error(errors.join("; ")));
        } else {
          resolve();
        }
      });
  });
};

// Função para fazer upload e processar o arquivo CSV

// export const uploadAndProcessCSV = (req: any, res: any) => {
//   upload.single("file")(req, res, async () => {
//     if (req.file) {
//       processCSV(req.file.buffer)
//         .then(() =>
//           res.status(200).send("File uploaded and processed successfully")
//         )
//         .catch((error) => res.status(500).json({ error: error.message }));
//     } else {
//       res.status(400).send("No file uploaded");
//     }
//   });
// };

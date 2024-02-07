import multer from "multer";
import fs from "fs";
import { parse } from "csv-parse";
import { initMovie } from "../models/Movie";
import { sequelize } from "../config/db";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".csv");
  },
});

const upload = multer({ storage: storage });

interface CSVData {
  title: string;
  year: string;
  producer: string;
  category: string;
  winner: string;
}

const MovieModel = initMovie(sequelize);

const processCSV = async (filePath: string): Promise<void> => {
  const promises: Promise<any>[] = [];
  const errors: string[] = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(parse({ columns: true, delimiter: ";" }))
      .on("data", (data: CSVData) => {
        try {
          if (
            !data.title ||
            isNaN(parseInt(data.year)) ||
            !data.producer ||
            !data.category
          ) {
            return new Error("Dados CSV inválidos");
          }
          const processedData = {
            title: data.title,
            year: parseInt(data.year, 10), // Convertendo ano para número
            producer: data.producer,
            category: data.category,
            winner: data.winner.trim().toLowerCase() === "yes", // Convertendo 'winner' para booleano
          };

          // Criando o registro no banco de dados
          promises.push(MovieModel.create(processedData));
        } catch (error) {
          errors.push(`Erro na linha ${data}: ${error}`);
        }
      })
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

export const uploadAndProcessCSV = (req: any, res: any) => {
  upload.single("file")(req, res, async () => {
    if (req.file) {
      processCSV(req.file.path)
        .then(() =>
          res.status(200).send("File uploaded and processed successfully")
        )
        .catch((error) => res.status(500).json({ error: error.message }));
    } else {
      res.status(400).send("No file uploaded");
    }
  });
};

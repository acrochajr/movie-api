import express from "express";
import { sequelize } from "./config/db";
import { initMovie } from "./models/movie";
import { processCSV } from "./services/processService";
import { router as movieRouter } from "./routes";
import fs from "fs";

const app = express();
const port = 3000;
// Inicializa o modelo de filme
initMovie(sequelize);
// Sincroniza o modelo com o banco de dados
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Database & tables created!");
    // Importa o arquivo CSV e processa os dados
    const movieCsvPath = "movielist (2).csv";
    fs.readFile(movieCsvPath, (err, data) => {
      if (err) {
        console.error("Failed to read CSV file:", err);
        return;
      }
      processCSV(data)
        .then(() => {
          console.log(
            "CSV file has been processed and data has been loaded into the database."
          );
        })
        .catch((error) => {
          console.error("Failed to process CSV file:", error);
        });
    });
  })
  .catch((error) => {
    console.error("Failed to sync database:", error);
  });

app.use(express.json());
// Adiciona as rotas
app.use("/movies", movieRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

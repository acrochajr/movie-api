import fs from "fs";
import { processCSV } from "./services/processService";
import { findProducers } from "./services/movieService";
import { sequelize } from "./config/db";
import { initMovie } from "./models/movie";

initMovie(sequelize);

describe("Teste de processamento de CSV e busca de produtores", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  it("deve processar um arquivo CSV e encontrar produtores", async () => {
    const pathToCsvFile = "movielist (2).csv";
    const csvBuffer = fs.readFileSync(pathToCsvFile);
    await processCSV(csvBuffer);

    const expectedResult = {
      min: [
        {
          producer: "Joel Silver",
          interval: 1,
          previousWin: 1990,
          followingWin: 1991,
        },
      ],
      max: [
        {
          producer: "Matthew Vaughn",
          interval: 13,
          previousWin: 2002,
          followingWin: 2015,
        },
      ],
    };

    const producers = await findProducers();
    expect(producers).toEqual(expectedResult);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});

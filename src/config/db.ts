import { Sequelize } from "sequelize";

// Inicializa o Sequelize com um banco de dados em memória
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: console.log,
});

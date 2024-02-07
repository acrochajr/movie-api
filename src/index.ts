import express from "express";
import { router as movieRouter } from "./routes";
import { sequelize } from "./config/db";
import { initMovie } from "./models/Movie";
const app = express();
const port = 3000;

initMovie(sequelize);
sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created!");
});

app.use(express.json());
app.use("/movies", movieRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

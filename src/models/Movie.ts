import { Sequelize, DataTypes, ModelStatic, Model } from "sequelize";

export interface IMovie {
  year: string;
  title: string;
  studios: string;
  producers: string;
  winner?: string;
}

// Define o modelo 'Movie'
export const Movie = (sq: Sequelize) =>
  sq.define(
    "Movie",
    {
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      studios: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      producers: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      winner: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
    },
    {
      tableName: "movies",
    }
  );

export type MovieModel = ModelStatic<Model<IMovie, IMovie>>;

export function initMovie(sequelize: Sequelize) {
  return Movie(sequelize);
}

import { Sequelize, DataTypes, ModelStatic, Model } from "sequelize";

interface IMovie {
  title: string;
  year: string;
  producer: string;
  category: string;
  winner?: boolean;
}

// Define o modelo 'Movie'
export const Movie = (sq: Sequelize) =>
  sq.define(
    "Movie",
    {
      title: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      producer: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      category: {
        type: DataTypes.STRING(128),
        allowNull: true,
      },
      winner: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      tableName: "movies",
    }
  );

export type MovieModel = ModelStatic<Model<IMovie, IMovie>>;

// Inicializa e retorna o modelo 'Movie'
export function initMovie(sequelize: Sequelize) {
  return Movie(sequelize);
}

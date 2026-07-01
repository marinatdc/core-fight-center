import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';

class Professor extends Model {}

Professor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // FK para usuarios.id — login do professor no sistema.
      // Definida via associate() no index.js, mas declarar aqui
      // ajuda o Sequelize a criar a coluna corretamente.
      references: {
        model: 'usuarios',
        key: 'id',
      },
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    celular: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
      // URL da imagem (Cloudinary, S3, etc.)
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      // Texto de apresentação exibido no portal do aluno
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Professor',
    tableName: 'professores',
    timestamps: true,
  }
);

export default Professor;

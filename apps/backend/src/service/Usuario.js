import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';

class Usuario extends Model {}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      // Nunca salvar em texto plano — sempre gerar hash com bcrypt
      // antes de chamar Usuario.create() / Usuario.update()
    },
    role: {
      type: DataTypes.ENUM('admin', 'recepcao', 'professor', 'aluno'),
      allowNull: false,
      defaultValue: 'recepcao',
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios',
    timestamps: true, // cria createdAt e updatedAt automaticamente
  }
);

export default Usuario;

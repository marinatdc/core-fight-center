import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';

class Plano extends Model {}

Plano.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
      // Ex: 'Mensal', 'Trimestral', 'Semestral', 'Anual'
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    duracaoMeses: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // 1 = mensal · 3 = trimestral · 6 = semestral · 12 = anual
    },
    valor: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
      // Valor total do plano (não o valor mensal equivalente)
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
      // Planos inativos não aparecem como opção no cadastro de novos alunos
    },
  },
  {
    sequelize,
    modelName: 'Plano',
    tableName: 'planos',
    timestamps: true,
  }
);

export default Plano;

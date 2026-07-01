import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';

class Modalidade extends Model {}

Modalidade.init(
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
      // Ex: 'Muay Thai', 'Jiu Jitsu', 'Boxe', 'Pilates', 'Funcional', 'Combate Ladies'
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cor: {
      type: DataTypes.STRING(7),
      allowNull: true,
      // Hex color usado para colorir os blocos na grade semanal de aulas
      defaultValue: '#D4AF37',
    },
    icone: {
      type: DataTypes.STRING(50),
      allowNull: true,
      // Nome do ícone Tabler para exibir no front (ex: 'ti-sword')
    },
    ativa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Modalidade',
    tableName: 'modalidades',
    timestamps: true,
  }
);

export default Modalidade;

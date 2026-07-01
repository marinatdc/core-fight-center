import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';

class Presenca extends Model {}

Presenca.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    aulaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'aulas',
        key: 'id',
      },
    },
    alunoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'alunos',
        key: 'id',
      },
    },
    presente: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    justificativa: {
      type: DataTypes.TEXT,
      allowNull: true,
      // Preenchido pelo professor quando a ausência é justificada
    },
  },
  {
    sequelize,
    modelName: 'Presenca',
    tableName: 'presencas',
    // Presença não é editada após criada, apenas registrada — sem necessidade de updatedAt
    timestamps: true,
    updatedAt: false,
  }
);

export default Presenca;

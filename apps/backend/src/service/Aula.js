import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';

class Aula extends Model {}

Aula.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    turmaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'turmas',
        key: 'id',
      },
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      // Data em que a aula de fato ocorreu (YYYY-MM-DD)
    },
    horaInicio: {
      type: DataTypes.TIME,
      allowNull: false,
      // Pode diferir do horário padrão da turma em caso de aula avulsa/reposição
    },
    horaFim: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('realizada', 'cancelada', 'reposicao'),
      allowNull: false,
      defaultValue: 'realizada',
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
      // Anotação do professor sobre o conteúdo trabalhado na aula
    },
  },
  {
    sequelize,
    modelName: 'Aula',
    tableName: 'aulas',
    timestamps: true,
  }
);

export default Aula;

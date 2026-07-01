import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';

class Turma extends Model {}

Turma.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    modalidadeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'modalidades',
        key: 'id',
      },
    },
    professorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'professores',
        key: 'id',
      },
    },
    nome: {
      type: DataTypes.STRING(80),
      allowNull: false,
      // Ex: 'Muay Thai – Iniciantes – Seg/Qua'
    },
    diaSemana: {
      type: DataTypes.ENUM('seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'),
      allowNull: false,
    },
    horaInicio: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    horaFim: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    sala: {
      type: DataTypes.STRING(50),
      allowNull: true,
      // Ex: 'Sala A', 'Tatame 1'
    },
    vagas: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // Capacidade máxima — verificar antes de inscrever um aluno na turma
    },
    nivel: {
      type: DataTypes.ENUM('iniciante', 'intermediario', 'avancado'),
      allowNull: false,
      defaultValue: 'iniciante',
    },
    ativa: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Turma',
    tableName: 'turmas',
    timestamps: true,
  }
);

export default Turma;

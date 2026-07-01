import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';

class Aluno extends Model {}

Aluno.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuarioId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'usuarios',
        key: 'id',
      },
    },
    planoId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'planos',
        key: 'id',
      },
    },

    // --- Dados pessoais ---
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING(14),
      allowNull: false,
      unique: true,
    },
    rg: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    dataNascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    sexo: {
      type: DataTypes.ENUM('M', 'F', 'O'),
      allowNull: true,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // --- Contato ---
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
      // Usado para notificações de cobrança e avisos via WhatsApp
    },
    telefoneFixo: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    contatoEmergenciaNome: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contatoEmergenciaTelefone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },

    // --- Endereço ---
    cep: {
      type: DataTypes.STRING(9),
      allowNull: true,
    },
    logradouro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numero: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    complemento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uf: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },

    // --- Saúde ---
    restricoesMedicas: {
      type: DataTypes.TEXT,
      allowNull: true,
      // Visível para o professor antes da aula
    },
    atestadoUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    // --- Plano e financeiro ---
    diaVencimento: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 31,
      },
    },
    dataInicio: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('ativo', 'inativo', 'inadimplente'),
      allowNull: false,
      defaultValue: 'ativo',
    },

    // --- Marketing / observações ---
    comoConheceu: {
      type: DataTypes.ENUM('instagram', 'indicacao', 'google', 'outro'),
      allowNull: true,
    },
    observacoesInternas: {
      type: DataTypes.TEXT,
      allowNull: true,
      // Nota interna da equipe — nunca exibir no portal do aluno
    },
  },
  {
    sequelize,
    modelName: 'Aluno',
    tableName: 'alunos',
    timestamps: true,
  }
);

export default Aluno;

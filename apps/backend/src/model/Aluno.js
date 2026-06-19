import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Aluno = sequelize.define("Aluno", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, //identificador principal
        autoIncrement: true, //gera o número sozinho
    },
    nome: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
        unique: true //valor único
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    celular: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    dataNascimento: {
        type: DataTypes.DATEONLY, //apenas data ano/mes/dia, sem hora e min
        allowNull: false
    },
    sexo: {
        type: DataTypes.ENUM('M', 'F', 'O'),
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,
        allowNull: true
    },
    restricoesMed: {
        type: DataTypes.TEXT,
        allowNull: true
    }, 
    //ENDEREÇO
    cep: {
        type: DataTypes.STRING(9),
        allowNull: true
    },
    logradouro: {
        type: DataTypes.STRING, // Guarda: Rua, Número e Complemento juntos
        allowNull: true
    },
    cidade: {
        type: DataTypes.STRING, // Guarda: "Viamão" ou "Porto Alegre"
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('ativo', 'inativo', 'inadimplente'),
        allowNull: false,
        defaultValue: 'ativo'
    },
    planoId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "FK -> planos.id"
    },
    diaVencimento: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    diaInicio: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    }
})

export default Aluno;
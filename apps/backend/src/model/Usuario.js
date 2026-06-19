import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Usuario = sequelize.define("Usuario", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, //identificador principal
        autoIncrement: true, //gera o número sozinho
    },
    nome: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // guarante que não emails duplicados
        validate: {
            isEmail: true // validação nativa de formato de email
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: { //permição de acesso do usuário
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "admin"
    }
})

export default Usuario
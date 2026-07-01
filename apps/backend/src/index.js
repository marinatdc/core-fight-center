import express from "express";
import cors from "cors";
import "dotenv/config";

import sequelize from "./database/database.js";

import authRoutes from "./routes/authRoutes.js";

async function inicializarServidor() {
    console.log("Iniciando o Core Fight Center API...");

    try {
        await sequelize.authenticate();

        console.log("Conexão com o banco de dados estabelecida com sucesso!");

        await sequelize.sync();

        console.log("Banco de dados sincronizado!");

        const app = express();

        app.use(cors());
        app.use(express.json());

        // ROTAS
        app.use("/api/auth", authRoutes);

        // TESTE
        app.get("/api/status", (req, res) => {
            res.json({
                status: "Online",
                mensagem: "Backend funcionando!",
            });
        });

        const porta = Number(process.env.EXPRESS_PORT || 3000);

        app.listen(porta, () => {
            console.log(`Servidor rodando na porta ${porta}`);
        });

    } catch (erro) {
        console.error(
            "Erro ao inicializar o servidor:",
            erro
        );
    }
}

inicializarServidor();
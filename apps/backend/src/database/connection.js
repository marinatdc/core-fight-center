import { Sequelize } from 'sequelize';
import 'dotenv/config';

// Instância única do Sequelize, usada por todos os models.
// dialect 'postgres' exige o driver 'pg' instalado (e 'pg-hstore' como dependência auxiliar).
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // true durante debug, mostra os SQL gerados no console
  define: {
    underscored: false, // mantém camelCase nas colunas (alunoId em vez de aluno_id)
  },
});

export default sequelize;

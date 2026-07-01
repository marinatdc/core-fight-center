import sequelize from '../database/connection.js';

import Usuario from './Usuario.js';
import Aluno from './Aluno.js';
import Professor from './Professor.js';
import Modalidade from './Modalidade.js';
import Turma from './Turma.js';
import Aula from './Aula.js';
import Presenca from './Presenca.js';
import Plano from './Plano.js';
import Pagamento from './Pagamento.js';

// ---------------------------------------------------------------------------
// Usuario <-> Aluno / Professor (1:1)
// Um usuário de login pode estar associado a um registro de Aluno OU Professor,
// dependendo do valor de "role".
// ---------------------------------------------------------------------------
Usuario.hasOne(Aluno, { foreignKey: 'usuarioId', as: 'aluno' });
Aluno.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

Usuario.hasOne(Professor, { foreignKey: 'usuarioId', as: 'professor' });
Professor.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

// ---------------------------------------------------------------------------
// Aluno <-> Modalidade (N:M)
// Um aluno pode estar matriculado em várias modalidades (Muay Thai + Funcional)
// e uma modalidade tem vários alunos.
// ---------------------------------------------------------------------------
Aluno.belongsToMany(Modalidade, {
  through: 'aluno_modalidades',
  foreignKey: 'alunoId',
  otherKey: 'modalidadeId',
  as: 'modalidades',
});
Modalidade.belongsToMany(Aluno, {
  through: 'aluno_modalidades',
  foreignKey: 'modalidadeId',
  otherKey: 'alunoId',
  as: 'alunos',
});

// ---------------------------------------------------------------------------
// Professor <-> Modalidade (N:M)
// Um professor pode lecionar mais de uma modalidade (ex: Muay Thai e Boxe).
// ---------------------------------------------------------------------------
Professor.belongsToMany(Modalidade, {
  through: 'professor_modalidades',
  foreignKey: 'professorId',
  otherKey: 'modalidadeId',
  as: 'modalidades',
});
Modalidade.belongsToMany(Professor, {
  through: 'professor_modalidades',
  foreignKey: 'modalidadeId',
  otherKey: 'professorId',
  as: 'professores',
});

// ---------------------------------------------------------------------------
// Modalidade -> Turma (1:N)
// Professor -> Turma (1:N)
// ---------------------------------------------------------------------------
Modalidade.hasMany(Turma, { foreignKey: 'modalidadeId', as: 'turmas' });
Turma.belongsTo(Modalidade, { foreignKey: 'modalidadeId', as: 'modalidade' });

Professor.hasMany(Turma, { foreignKey: 'professorId', as: 'turmas' });
Turma.belongsTo(Professor, { foreignKey: 'professorId', as: 'professor' });

// ---------------------------------------------------------------------------
// Aluno <-> Turma (N:M)
// Um aluno pode estar inscrito em várias turmas, e uma turma tem vários alunos.
// ---------------------------------------------------------------------------
Aluno.belongsToMany(Turma, {
  through: 'aluno_turmas',
  foreignKey: 'alunoId',
  otherKey: 'turmaId',
  as: 'turmas',
});
Turma.belongsToMany(Aluno, {
  through: 'aluno_turmas',
  foreignKey: 'turmaId',
  otherKey: 'alunoId',
  as: 'alunos',
});

// ---------------------------------------------------------------------------
// Turma -> Aula (1:N)
// Cada ocorrência real de aula pertence a uma turma (grade recorrente).
// ---------------------------------------------------------------------------
Turma.hasMany(Aula, { foreignKey: 'turmaId', as: 'aulas' });
Aula.belongsTo(Turma, { foreignKey: 'turmaId', as: 'turma' });

// ---------------------------------------------------------------------------
// Aula -> Presenca (1:N)
// Aluno -> Presenca (1:N)
// ---------------------------------------------------------------------------
Aula.hasMany(Presenca, { foreignKey: 'aulaId', as: 'presencas' });
Presenca.belongsTo(Aula, { foreignKey: 'aulaId', as: 'aula' });

Aluno.hasMany(Presenca, { foreignKey: 'alunoId', as: 'presencas' });
Presenca.belongsTo(Aluno, { foreignKey: 'alunoId', as: 'aluno' });

// ---------------------------------------------------------------------------
// Plano -> Aluno (1:N)
// Plano -> Pagamento (1:N)
// Aluno -> Pagamento (1:N)
// ---------------------------------------------------------------------------
Plano.hasMany(Aluno, { foreignKey: 'planoId', as: 'alunos' });
Aluno.belongsTo(Plano, { foreignKey: 'planoId', as: 'plano' });

Plano.hasMany(Pagamento, { foreignKey: 'planoId', as: 'pagamentos' });
Pagamento.belongsTo(Plano, { foreignKey: 'planoId', as: 'plano' });

Aluno.hasMany(Pagamento, { foreignKey: 'alunoId', as: 'pagamentos' });
Pagamento.belongsTo(Aluno, { foreignKey: 'alunoId', as: 'aluno' });

// ---------------------------------------------------------------------------
// Exporta tudo junto — outros arquivos importam direto daqui:
// import { Aluno, Professor } from '../model/index.js'
// ---------------------------------------------------------------------------
export {
  sequelize,
  Usuario,
  Aluno,
  Professor,
  Modalidade,
  Turma,
  Aula,
  Presenca,
  Plano,
  Pagamento,
};

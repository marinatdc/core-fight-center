import bcrypt from 'bcryptjs';
import { sequelize, Usuario, Modalidade, Professor, Plano } from '../model/index.js';

// Roda com: node src/database/seed.js
// Popula o banco com dados mínimos para começar a desenvolver e testar o sistema.

async function seed() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // garante que as tabelas existem antes de inserir

    // --- Usuário admin padrão ---
    const senhaHash = await bcrypt.hash('admin123', 10);
    const [admin] = await Usuario.findOrCreate({
      where: { email: 'admin@corefight.com' },
      defaults: {
        nome: 'Administrador',
        email: 'admin@corefight.com',
        senha: senhaHash,
        role: 'admin',
      },
    });
    console.log('Usuário admin criado:', admin.email);

    // --- Modalidades padrão ---
    const modalidadesPadrao = [
      { nome: 'Muay Thai', cor: '#D4AF37', icone: 'ti-sword' },
      { nome: 'Jiu Jitsu', cor: '#0C447C', icone: 'ti-shield' },
      { nome: 'Boxe', cor: '#712B13', icone: 'ti-hand-stop' },
      { nome: 'Pilates', cor: '#27500A', icone: 'ti-yoga' },
      { nome: 'Funcional', cor: '#633806', icone: 'ti-run' },
      { nome: 'Combate Ladies', cor: '#993556', icone: 'ti-flame' },
    ];

    for (const m of modalidadesPadrao) {
      await Modalidade.findOrCreate({ where: { nome: m.nome }, defaults: m });
    }
    console.log('Modalidades padrão criadas.');

    // --- Planos padrão ---
    const planosPadrao = [
      { nome: 'Mensal', duracaoMeses: 1, valor: 150.0 },
      { nome: 'Trimestral', duracaoMeses: 3, valor: 405.0 },
      { nome: 'Semestral', duracaoMeses: 6, valor: 750.0 },
      { nome: 'Anual', duracaoMeses: 12, valor: 1350.0 },
    ];

    for (const p of planosPadrao) {
      await Plano.findOrCreate({ where: { nome: p.nome }, defaults: p });
    }
    console.log('Planos padrão criados.');

    console.log('Seed finalizado com sucesso.');
    process.exit(0);
  } catch (error) {
    console.error('Erro ao rodar o seed:', error);
    process.exit(1);
  }
}

seed();

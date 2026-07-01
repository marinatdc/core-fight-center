import { Model, DataTypes } from 'sequelize';
import sequelize from '../database/connection.js';

class Pagamento extends Model {}

Pagamento.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    alunoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'alunos',
        key: 'id',
      },
    },
    planoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'planos',
        key: 'id',
      },
    },
    valor: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
      // Valor cheio do plano, antes de descontos
    },
    desconto: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: true,
      defaultValue: 0,
    },
    valorFinal: {
      type: DataTypes.DECIMAL(8, 2),
      allowNull: false,
      // valor - desconto — calcular antes de salvar (ver hook no controller ou em hooks do model)
    },
    vencimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    dataPagamento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      // Permanece null até o pagamento ser confirmado
    },
    status: {
      type: DataTypes.ENUM('pendente', 'pago', 'vencido', 'cancelado'),
      allowNull: false,
      defaultValue: 'pendente',
    },
    formaPagamento: {
      type: DataTypes.ENUM('pix', 'cartao', 'boleto', 'dinheiro'),
      allowNull: true,
    },
    referencia: {
      type: DataTypes.STRING(10),
      allowNull: true,
      // Mês/ano de referência da cobrança, ex: '06/2026'
    },
    gatewayId: {
      type: DataTypes.STRING,
      allowNull: true,
      // ID da cobrança no gateway de pagamento (Asaas, PagSeguro, etc.)
    },
    gatewayStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      // Status bruto retornado pelo gateway, útil para debug de webhooks
    },
    observacoes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Pagamento',
    tableName: 'pagamentos',
    timestamps: true,
    hooks: {
      // Calcula valorFinal automaticamente sempre que um pagamento é criado ou atualizado
      beforeSave: (pagamento) => {
        const desconto = pagamento.desconto || 0;
        pagamento.valorFinal = Number(pagamento.valor) - Number(desconto);
      },
    },
  }
);

export default Pagamento;

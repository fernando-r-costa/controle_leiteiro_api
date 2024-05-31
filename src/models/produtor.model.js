import Sequelize from 'sequelize'
import bcrypt from 'bcrypt'
import db from '../repositories/db.js'

const Produtor = db.define('produtor', {
  produtorId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  senha: {
    type: Sequelize.STRING,
    allowNull: false
  },
  celular: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [10, 11]
    }
  },
  relatoriosComprados: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  relatoriosGastos: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
}, {
  underscored: true,
  defaultScope: {
    attributes: { exclude: ['senha'] }
  },
  hooks: {
    beforeCreate: async (produtor) => {
      if (produtor.senha) {
        const salt = await bcrypt.genSalt(10)
        produtor.senha = await bcrypt.hash(produtor.senha, salt)
      }
    },
    beforeUpdate: async (produtor) => {
      if (produtor.changed('senha')) {
        const salt = await bcrypt.genSalt(10)
        produtor.senha = await bcrypt.hash(produtor.senha, salt)
      }
    }
  },
  timestamps: false
})

export default Produtor

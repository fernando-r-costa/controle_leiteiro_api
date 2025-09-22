import Sequelize from 'sequelize'
import bcrypt from 'bcryptjs'
import db from '../repositories/db.js'

const pioneerDeadline = new Date('2025-12-31T23:59:59-03:00')

const Farmer = db.define('farmer', {
  farmerId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
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
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: [10, 11]
    }
  },
  role: {
    type: Sequelize.ENUM('farmer', 'admin'),
    allowNull: false,
    defaultValue: 'farmer'
  },
  pioneerSeal: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: () => {
      const now = new Date()
      return now <= pioneerDeadline
    }
  }
}, {
  underscored: true,
  defaultScope: {
    attributes: { exclude: ['password'] }
  },
  hooks: {
    beforeSave: async (farmer) => {
      if (farmer.password && farmer.changed('password')) {
        try {
          const salt = await bcrypt.genSalt(10)
          farmer.password = await bcrypt.hash(farmer.password, salt)
        } catch (err) {
          throw new Error('Erro ao hash da senha: ' + err.message)
        }
      }
    }
  },
  timestamps: true
})

export default Farmer

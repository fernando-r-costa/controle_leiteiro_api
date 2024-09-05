import Sequelize from 'sequelize'
import bcrypt from 'bcryptjs'
import db from '../repositories/db.js'

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
  reportsBuyed: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  reportsSpended: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
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
  timestamps: false
})

export default Farmer

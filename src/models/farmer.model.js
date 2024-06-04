import Sequelize from 'sequelize'
import bcrypt from 'bcrypt'
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
    beforeCreate: async (farmer) => {
      if (farmer.password) {
        const salt = await bcrypt.genSalt(10)
        farmer.password = await bcrypt.hash(farmer.password, salt)
      }
    },
    beforeUpdate: async (farmer) => {
      if (farmer.changed('password')) {
        const salt = await bcrypt.genSalt(10)
        farmer.password = await bcrypt.hash(farmer.password, salt)
      }
    }
  },
  timestamps: false
})

export default Farmer

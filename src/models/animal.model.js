import Sequelize from 'sequelize'
import db from '../repositories/db.js'
import Farm from './farm.model.js'

const Animal = db.define('animal', {
  animalId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false
  },
  calvingDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  expectedDate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  farmId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
}, {
  underscored: true,
  timestamps: false
})

Animal.belongsTo(Farm, {
  foreignKey: {
    allowNull: false,
    name: 'farmId'
  }
})

export default Animal

import Sequelize from 'sequelize'
import db from '../repositories/db.js'
import Farmer from './farmer.model.js'

const Farm = db.define('farm', {
  farmId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  underscored: true,
  timestamps: false
})

Farm.belongsTo(Farmer, {
  foreignKey: {
    allowNull: false,
    name: 'farmerId'
  }
})

export default Farm

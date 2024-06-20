import Sequelize from 'sequelize'
import db from '../repositories/db.js'
import Animal from './animal.model.js'

const DairyControl = db.define('dairy_control', {
  registerId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  dairyDateControl: {
    type: Sequelize.DATE,
    allowNull: false,
    unique: 'unique_animal_date'
  },
  animalId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: 'unique_animal_date'
  },
  weightMilking1: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false
  },
  weightMilking2: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: true,
    defaultValue: 0
  },
  weightMilking3: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: true,
    defaultValue: 0
  },
  dim: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  dtc: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  }
}, {
  underscored: true,
  timestamps: false
})

DairyControl.belongsTo(Animal, {
  foreignKey: {
    allowNull: false,
    name: 'animalId'
  }
})

export default DairyControl

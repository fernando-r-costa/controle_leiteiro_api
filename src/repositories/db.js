import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Sequelize from 'sequelize'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const caCertPath = process.env.RENDER === 'true' ? '/etc/secrets/ca.pem' : path.join(__dirname, '../certs/ca.pem')
const caCert = fs.readFileSync(caCertPath)

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DIALECT,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: true,
        ca: [caCert]
      }
    },
    define: {
      freezeTableName: true
    }
  })

export default sequelize

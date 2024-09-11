/* eslint-disable no-undef */
import express from 'express'
import cors from 'cors'
import winston from 'winston'
import 'dotenv/config.js'
import farmerRouter from './routes/farmer.route.js'
import farmRouter from './routes/farm.route.js'
import animalRouter from './routes/animal.route.js'
import dairyControlRouter from './routes/dairyControl.route.js'
import auth from './middlewares/auth.middleware.js'

const { combine, timestamp, label, printf } = winston.format
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`
})
global.logger = winston.createLogger({
  level: 'silly',
  transports: [
    new (winston.transports.Console)(),
    new (winston.transports.File)({ filename: 'controle-leiteiro-api.log' })
  ],
  format: combine(
    label({ label: 'controle-leiteiro-api' }),
    timestamp(),
    myFormat
  )
})

const app = express()
app.use(express.json())
app.use(cors())

app.use('/farmer', farmerRouter)
app.use('/farm', auth, farmRouter)
app.use('/animal', auth, animalRouter)
app.use('/dairy-control', auth, dairyControlRouter)

app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`)
  res.status(400).send({ error: err.message })
})

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Controle Leiteiro - API Iniciada na porta ${PORT}!`)
})

export {
  server
}

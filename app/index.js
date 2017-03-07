import express from 'express'
import bunyan from 'bunyan'

const log = bunyan.createLogger({name: 'app'})

const app = express()

app.listen(4000, () => {
  log.info('Running on http://localhost:4000')
})

import * as bunyan from 'bunyan'
import * as express from 'express'

const log = bunyan.createLogger({name: 'app'})

const app = express()

app.listen(4000, () => {
  log.info('Running on http://localhost:4000')
})

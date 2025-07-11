const app = require('./app')
const config = require('./utils/config')

app.listen(config.PORT, () => {
  console.log(`Blog List server running on port ${config.PORT}`)
}) 
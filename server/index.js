const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const {app, server} = require('./app')

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Инициализируем Nuxt.js
  const nuxt = new Nuxt(config)

  // Получаем хост и порт
  const { host, port } = nuxt.options.server

  // Только в билд моде
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Прослушиваем server с переменной которую объявили в app.js

  server.listen(port, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  })
  
}
start()

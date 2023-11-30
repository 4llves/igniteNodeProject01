import http from 'node:http'

import { json } from './middlewares/json.js'
import { routes } from './routes.js'


// Query Parameters: URL Stateful => Filtros, Paginação, Não-Obritarórios
// http://localhost:3333/users?userId=1&name=alves
// Route Parameters: 
// GET http://localhost:3333/users/1 "buscar user com id 1"
// Request Body: 
// Envio de informações de um forme e afins


const server = http.createServer(async (req, res) => {
  const { method, url } = req

  await json(req ,res)
  
  const route = routes.find(route => {
    return route.method === method && route.path.test(url) 
  })

  if(route) {
    const routeParams = req.url.match(route.path)

    req.params = { ...routeParams.groups }

    return route.handler(req, res)
  }

  return res.writeHead(404).end('')
})

server.listen(3333)

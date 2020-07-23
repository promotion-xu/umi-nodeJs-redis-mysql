const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const { method, url } = req
  const path = url.split('?')[0]
  const query = querystring.parse(url.split('?')[1])
  res.setHeader('Content-type', 'application/json')
  const resData = {
    method,
    url,
    path,
    query
  }
  if (method === 'GET') {
  }

  if ((method = 'POST')) {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resData = postData
    })
  }
  res.end(JSON.stringify(resData))
})

server.listen(9000)

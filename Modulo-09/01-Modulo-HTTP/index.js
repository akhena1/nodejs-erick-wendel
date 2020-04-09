const http = require('http')
const port = 3333

http.createServer((request, response) => {
    response.end('Hello Node!')
})
.listen(port, () => console.log(`o servidor está rodando na porta: ${port}`))
//Exportador csv

const mysql = require('mysql')
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'daniel',
    password: '12345',
    database: 'cadastro'
})
// writable - CSV Stream => fluxo de dados de saida

const fs = require('fs')
const writable = fs.createWriteStream('pessoas.csv')
writable.write('id,nome\n', () => {

})

// seleção para tabelas com muitos dados.
connection.connect((err,) => {
    const query = connection.query('select * from pessoas')
    query.on('result', (row) => {
        //console.log(row)
        connection.pause()
        
        // podemos colocar todos os dados em nova linha
        const data = row.id+','+row.nome+'\n'
       // setTimeout(()=> {
            writable.write(data, () => {
            connection.resume()
           // console.log('written')
            })
      //  }, 1000 )
   
    //encerrar a conecção do query, do writable, do connection
   //connection.end()
   })
   query.on('end', () =>{
   writable.end()
   connection.end()
   console.log('finished')

   })
   
})
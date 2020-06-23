const express = require('express');
const fs = require('fs');
// const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//const data = fs.readFileSync('./database.json');
//const conf  =JSON.parse(data);


// const connection = mysql.createConnection({
//   host : conf.host,
//   user: conf.user,
//   password :conf.password,
//   port :conf.port,
//   database : conf.database
// })


var mysql = require('mysql');
// 비밀번호는 별도의 파일로 분리해서 버전관리에 포함시키지 않아야 합니다. 
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'management'
});

connection.connect();

connection.query('SELECT * FROM customer', function (error, results, fields) {
  if (error) {
    console.log(error);
  }
  console.log(results);
});


const multer = require('multer');
const upload = multer({ dest: './upload' });

app.get('/api/customers', (req, res) => {

  connection.query(
    "SELECT *FROM CUSTOMER where isDeleted =0",
    (err, rows, fields) => {
      res.send(rows);
    }
  )

});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {

  let sql = 'INSERT INTO CUSTOMER VALUE(null,?,?,?,?,?,now(),0)';
  let image = 'http://localhost:5000/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, gender, job, birthday];

  connection.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(rows);
      console.log(err);
    }
  )
})

app.delete('/api/customers/:id',(req,res) =>{
  console.log("삭제되나");
  let sql ='UPDATE CUSTOMER SET isDeleted =1 WHERE id = ?';
  let params =[req.params.id];
  connection.query(sql,params,
    (err,rows,fields) =>{
      res.send(rows);
    }
    )
})
app.listen(port, () => console.log(`Listening on port ${port}`));
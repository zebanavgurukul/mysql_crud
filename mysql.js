var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.json())

var mysqlconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "navgurukul",
    database: "mydata"
});

mysqlconnection.connect((err) => {
    if (!err)
        console.log("db connected");
    else
        console.log("not connected");
});

app.get("/get", function (req,res){
    mysqlconnection.query("SELECT * FROM new_tbl", function(error, rows) {
        if (error) throw error;
        res.end(JSON.stringify(rows));
    })
});

app.post('/post', function (req, res) {
    var postData  = req.body;
    mysqlconnection.query('INSERT INTO new_tbl SET ?', postData, function (error, rows) {
        if (error) throw error;
        res.end(JSON.stringify(rows));
    });
});

app.put("/update/:id",function(req,res){
    id = req.params.id;
    data = req.body.firstname;
    var sql = "UPDATE new_tbl SET firstname = ? WHERE id =" + id;

    mysqlconnection.query(sql,data,function(error,rows){
        if(error){
            console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
            res.send(400).send("error hai bs")
        }else{
            console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
            res.send("column updated")
        }
    })
})

app.delete("/delete",function(req,res){
    mysqlconnection.query("DELETE from new_tbl WHERE id = ?", [req.body.id],function(error,rows){
        if(error){
            res.send("Their is Error")
        }else{
            res.send("column deleted")
        }
    })
});

app.delete("/delete/:id",function(req,res){
    id = req.params.id
    sql = "DELETE from new_tbl WHERE id =" + id;
    mysqlconnection.query(sql,function(error,rows){
        if(error){
            res.send("their is error")
        }else{
            res.send("column deleted")
        }
    });
});
   
app.listen(5000, () => {
    console.log("5000 port pr shunta hai")
});
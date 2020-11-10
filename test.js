var http = require('http');
var db = require('./db_config');


http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type' : 'text/html'});
    if(req.url == "/get-user")get_user(req,res);
    else if(req.url == "/add-user")add_user(req,res);
    else res.end("no where");
}).listen(7979);

function get_user(req,res){
    var nama = req.headers['nama'];
    var password = req.headers['password'];

    var sql = "Select * from user_eai where name = ? and password = ?";
    db.query(sql,[nama, password], function(err, result){
        if(err) throw err;
        console.log(JSON.stringify(result));
        res.end(JSON.stringify(result));
    });
}

function add_user(req,res){
    var nama = req.headers['nama'];
    var email = req.headers['email'];
    var password = req.headers['password'];
    console.log(nama + ' ' + email + ' ' + password);
    var sql = "insert into user_eai (name, email, password) values ?";
    var values = [[nama,email,password]];
    db.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
    res.end();
}
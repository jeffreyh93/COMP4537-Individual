const http = require('http');
const GET = 'GET';
const PUT = 'PUT';
const OPTIONS = 'OPTIONS';
const POST = 'POST';
const DELETE = 'DELETE';
const urlParser = require('url');
const mysql = require('mysql');
const endPointRoot = "/assignment1/API/v1/"

const connection = mysql.createConnection({
    host: "localhost",
    user: "compjeff_quote",
    password: "quote123",
    database: "compjeff_quote"
});

http.createServer(function(req,res) {
    res.writeHead(200, {
        "Content-Type": "text/html",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
    });
    
    console.log(req.method, req.url, req.headers);
    
    let url = urlParser.parse(req.url, true);
    if (req.url === '/') {
        console.log('/');
    }
    
    if (req.method === GET && url.pathname === endPointRoot + 'quote/') {
        let sql = "SELECT * from quote";
        connection.query(sql, function (err,result) {
            if (err) {
                throw err;
            }
            res.write(JSON.stringify(result));
            res.end();
        });
    } else if (req.method === GET) {
        let sql = "SELECT * FROM quote ORDER BY quoteId DESC LIMIT 1";
        connection.query(sql, function (err, result) {
            if (err) {
                res.write("error occured");
                res.end();
            }
            res.write(JSON.stringify(result));
            res.end();
        })
    }
    
    if (req.method === POST && url.pathname === endPointRoot + 'quote/') {
        req.on('data', function(data) {
            data = data.toString('utf8');
            
            /** 
                data = {quote: "...", name: "...."}
            */
            
            let dataObj = JSON.parse(data);
            let quote = dataObj.quote;
            let name = dataObj.name;
            
            let sql = "INSERT INTO quote (quote, name, quoteId) VALUES ('" + quote + "', '" + name + "', null)";
            
            connection.query(sql, function(err, result) {
                if (err) {
                    res.write("error occured");
                    res.end();
                }
                res.write(quote + ": " + name + ", successfully entered");
                res.end();
            });
        });
    }
    
    if (req.method === DELETE) {
        let lastResource = req.url.substring(req.url.lastIndexOf('/') + 1);
        let sql = "DELETE from quote WHERE quoteId = " + lastResource;
        connection.query(sql, function (err,result) {
            if (err) {
                throw err;
            }
            res.write("quote ID " + lastResource + " successfully deleted");
            res.end();
        });
    }
    
    if (req.method === PUT) {
        req.on('data', function(data) {
            data = data.toString('utf8');
            let lastResource = req.url.substring(req.url.lastIndexOf('/') + 1);
            
            let dataObj = JSON.parse(data);
            let quote = dataObj.quote;
            let name = dataObj.name;
            
            let sql = "UPDATE quote SET quote = '" + quote + "', name = '" + name + "' WHERE quoteId = " + lastResource;
            connection.query(sql, function(err, result) {
                if (err) throw err;
                res.write("quote ID " + lastResource + " successfully updated");
                res.end();
            })
        });
    }
}).listen(8888);
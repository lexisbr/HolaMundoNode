let http = require("http");
let fs = require("fs");



http.createServer(function(req,res){

    if(req.url.indexOf("favicon.ico") > 0){ return ;}

    console.log();
    if(req.url == "/archivos/index"){
        fs.readFile("./archivos/index.html",function(error,html){
            let html_string = html.toString();
            let variables = html_string.match(/[^\{\}]+(?=\})/g);
            let nombre = "Mundo desde Node.JS"

            for(let i = variables.length - 1; i >=0 ; i--){
                let value = eval(variables[i]);
                html_string = html_string.replace("{"+variables[i]+"}",value);
            };

            res.writeHead(200,{"Content-Type":"text/html"});
            res.write(html_string);
            res.end();
        });
    }else{
        fs.readFile("./archivos/notfound.html", function(error,html){
            res.write(html);
            res.end();
        });
    }
    
}).listen(4000);
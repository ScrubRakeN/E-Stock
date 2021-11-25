const express = require('express');
const server = express();
const nunjucks = require('nunjucks');
const bd = require('./bd');

server.use(express.static(__dirname + '/public'));
server.use(express.urlencoded({extended: true}));

nunjucks.configure('views', {
    express: server,
    noCache: true
});

server.get('/', (req, res)=>{
    return res.render('Login.html');
});

server.post('/login', (req, res)=>{

    let values = [req.body.email, req.body.password];

    bd.all('SELECT * FROM usuarios WHERE email = ? and senha = ? LIMIT 1', values, (error, rows)=>{

        if(rows.length > 0){
            return res.redirect('/estoque');
        }
        console.log("Email ou Senha estão incorretos!");
        return res.redirect('/');

    });

});

server.get('/estoque', (req, res)=>{
    return res.render('Estoque.html');
});

//rota para pag cadastro.html
server.get("/cadastro", function(req, res){
    return res.render("Cadastro.html");
});

//CREATE
server.post("/create", function(req, res){
    const query = `
    INSERT INTO Usuarios(
        email,
        senha,
        empresa,
        local,
        telefone
    ) VALUES (?,?,?,?,?)` ;
    const values = [req.body.email,req.body.password,req.body.empresa,req.body.local,req.body.telefone];
    bd.run(query, values, function(err){
        if(err) return console.log(err);        
        console.log("Dado armazenado com sucesso!");
    });
    return res.redirect("/");
});

server.listen(3000);
//CRIAÇÃO DO BANCO DE DADOS
const sqlite3 = require("sqlite3");
const bd = new sqlite3.Database("./E-stock.bd");

bd.serialize(function(){
    //Criar Tabela
    bd.run(` 
    CREATE TABLE IF NOT EXISTS usuarios(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario TEXT UNIQUE,
    email TEXT UNIQUE,
    senha TEXT UNIQUE,
    empresa TEXT,
    local TEXT,
    telefone INTEGER UNIQUE,
    img TEXT);`);

    //let values = ['Fernando', "fe123", "fernando@gmail.com", "IBM", "Brasil", 1192356343, "teste"]

    //bd.run('INSERT INTO usuarios (usuario, senha, email, empresa, local, telefone, img) VALUES (?, ?, ?, ?, ?, ?, ?)', values, (error)=>{
        //if(error){
            //return console.log("DEU RUIM, MANÉ!");
        //}
        //return console.log("COÉ MEU PASSERO?");
    //});

});

module.exports = bd;
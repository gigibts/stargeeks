const nome = document.getElementById ("nome");
const descricao = document.getElementById ("descricao")
const cadastraritem = document.getElementById("cadastraritem");
const voltarpginicial = document.getElementById("voltarpginicial");

function editar(indice){
    var url ="cadastrodoitem.html?peditar=true&indice="+ encodeURIComponent(indice);
    window.location.href = url
}
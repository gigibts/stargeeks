const nome = document.getElementById ("nome");
const descricao = document.getElementById ("descricao")
const cadastraritem = document.getElementById("cadastraritem");
const voltarpginicial = document.getElementById("voltarpginicial");
const cards = document.querySelector(".cards");


var emaillogado;
femailLogado();
carregarCatalogo();
function carregarCatalogo() {
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    let divcard = document.createElement("div");
    if (dados == null) {
        divcard.innerHTML = "<p>Nenhum item cadsatrado</p>";
        cards.appendChild(divcard);
        return null;
    }

    dados.forEach((elemento, indice) => {
        if (elemento.email == emaillogado) {
            let divcard = document.createElement("div");
            divcard.setAttribute("class", "card");
            divcard.innerHTML = `<p>${elemento.nome}</p>
            <img src="img/${elemento.foto}" alt="">
            <div class="info">
                
                <div class="linha1">
                    <p onclick="editar(${indice})">Editar</p>
                    <img src="imagens/abrir.png" alt="">
                </div>
                <div class="linha2">
                    <p onclick="excluir(${indice})">Excluir</p>
                    <img src="imagens/lixo.png" alt="">
                </div>
            </div>`;

            cards.appendChild(divcard);
        }

    });
}


function excluir(indice) {
    if (confirm("Tem certeza de que deseja excluir?")) {
        let dados = JSON.parse(localStorage.getItem("catalogo"));
        dados.splice(indice, 1);
        localStorage.setItem("catalogo", JSON.stringify(dados));
        window.location.reload();
    }
}
function editar(indice) {
    var url = "cadastroitem.html?peditar=true&indice=" + encodeURIComponent(indice);
    window.location.href = url
}
function femailLogado() {
    let dados = sessionStorage.getItem("logado");
    if (dados == null) {
        window.location.assign("login.html");
    }
    else {
        emaillogado = dados;
    }
}
const nome = document.getElementById("inome");
const categoria = document.getElementById("icategoria");
const descricao = document.getElementById("idescricao");
const btnitem = document.getElementById("btnitem");
const foto = document.getElementById("foto");


var url = new URL (window.location.href);
var peditar = url.searchParams.get("Peditar");
var pindice = url.searchParams.get("indice");

function editar(indice) {
    nome.value = "";
    descricao.value = "";
    categoria.value
    foto.files[0] = null;
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    nome.value = dados[indice].nome;
    descricao.value = dados[indice].descricao;
    fotoa = dados[indice].foto;

}

var fotoa;
function editarenvio(evento) {
    evento.preventDefault();
    if ((fotoa != foto.value) && (foto.value != "")) {

        fenvio()
            .then(result => {
                if (result) {
                    salvarEdicao(NomeArq);
                }
            });
    }
    else {
        salvarEdicao(fotoa);
    }
}

function salvarEdicao(pfoto) {
    let dados = JSON.parse(localStorage.getItem("catalogo"));
    dados[pindice].nome = nome.value;
    dados[pindice].descricao = descricao.value;
    dados[pindice].foto = pfoto;
    dados[pindice].categoria = categoria.value;
    localStorage.setItem("catalogo", JSON.stringify(dados));
    
}

btnitem.onclick = (evento) => {
    if ((postar != "true") || (peditar == null)){
        alert("Item cadastrado!")
    evento.preventDefault();
    fenvio()
        .then(result => {
            if (result) {
                let dados = JSON.parse(localStorage.getItem("catalogo")) || [];dados.push(
                    {
                        nome: nome.value,
                        categoria: categoria.value,
                        descricao: descricao.value,
                        foto: NomeArq,
                        categoria: categoria.value

                    }
                );
                localStorage.setItem("catalogo", JSON.stringify(dados));
                window.location.assign("catalogo.html")
            }
            else {
                alert("Houve erro no envio do arquivo");
            }
        });

    } else 
    {
        editarenvio(evento);
        window.localStorage.assign("catalogo.html");
    }
}



var NomeArq;
async function fenvio() {
    const url = 'http://localhost:3005/upload';
    const arquivo = document.getElementById("foto").files[0];
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    console.log(JSON.stringify(formData));


    try {

        var resp = await fetch(url, {
            method: 'POST',
            body: formData,
        }
        )
        if (resp.ok) {
            let respText = await resp.text();
            NomeArq = respText;
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error(error);
        return false;
    }
}


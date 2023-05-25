const nome = document.getElementById("inome");
const categoria = document.getElementById("icategoria");
const descricao = document.getElementById("idescricao");
const btnitem = document.getElementById("btnitem");

btnitem.onclick = (evento) =>{
    alert("Item cadastrado!")
    evento.preventDefault();
    fenvio()
        .then(result => {
            if (result) {
                let dados = JSON.parse(localStorage.getItem("catalogo")) || [];
                dados.push(
                    {
                        nome: nome.value,
                        categoria: categoria.value,
                        descricao: descricao.value,
                        foto: NomeArq
                    }
                );
                localStorage.setItem("catalogo", JSON.stringify(dados));
                window.location.assign("catalogo.html")
            }
            else {
                alert("Houve erro no envio do arquivo");
            }
        })

    
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


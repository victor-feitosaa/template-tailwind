function mudarPaginaAvaliacao() {
    window.location.href = "avaliacao.html";
}


const urlParams = new URLSearchParams(window.location.search);

const nomeParam = urlParams.get("status");

console.log(nomeParam);

let textoParam = document.getElementById('status__redacao__etapas');
let imgParam = document.querySelector(".imagem__status__etapas");



function voltarIndex() {
    window.location.href = "index.html?status=aprovado";
};

function mudarConteudo() {
    if (nomeParam == "aprovado") {
        textoParam.innerHTML = "APROVADO";
        imgParam.src = "images/accept.png";
    };
  };

function mudarStatus() {
    
    let btnRedacao = document.querySelector('.botao__redacao');
    
    btnRedacao.addEventListener('click', () => {
        voltarIndex();
        
    })
};

mudarConteudo();
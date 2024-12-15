const canal = '019288cf-9615-7b8d-87d9-84f134d7b3ba'

const canalTeste = '019288d0-303b-7471-a708-330cf33c21b9'

const canalEmUso = canal;

async function cidades() {
    const multURL = `https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/localidades?canal=${canalEmUso}`

   //URL para teste com multiplas localidades:
    // const multURL = `https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/estados/ac/cidades`

    const resCid = await fetch(multURL);

    if (resCid.status == 200){
        const cid = await resCid.json();
        console.log(cid);
        console.log(cid.result.length);

        const sel = document.getElementById("sel__localMult");

        for (let i = 0; i < cid.result.length; i++){
            //montar o select
            const optValue = `${cid.result[i].nome}`;
            const optId = `${cid.result[i].id}`
            const opt = document.createElement("option");
            opt.innerHTML = optValue;
            sel.appendChild(opt);
            opt.setAttribute("value", optId);
        
            
            
            //definir parametro/value/id da cidade escolhida e mudar pagina

            document.getElementById('btn__localMult').addEventListener('click', () => {

            const Id = sel.value;
            const urlId = `formularios.html?canal=${canalEmUso}&cidade=${Id}`;
            let selError = document.querySelector(".sel__localMult");
            let msgError = document.querySelector(".msgError__localMult");

                if (Id === "") {
                    selError.classList.add("error");
                    msgError.classList.add("error");
                 } else {
                    window.location.href = urlId;
                 }
            })
            
         }     

    }
    
}


cidades();


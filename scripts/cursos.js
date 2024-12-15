
function checarParamsForms(){
    const urlParams = new URLSearchParams(window.location.search);
    const formasParams = urlParams.has('forma-ingresso');
    if (!formasParams) {
        window.location.href = 'inicio.html'
    }
};

// Esconde todas as divs com a classe 'row-escondida' no carregamento da página
window.addEventListener('DOMContentLoaded', function() {
    let rol = document.querySelectorAll('.row-escondida');
        rol.forEach(function(element) {
            element.style.display = 'none'; // Esconde as divs ao carregar a página
        });
});


//variaveis globais
let ofertaSelecionada = null;
const urlParams = new URLSearchParams(window.location.search);
const leadId = urlParams.get("lead");
const canalParam = new URLSearchParams(document.location.search);
const canal = canalParam.get('canal');




// Função para criar o HTML do card
function criarCards(oferta, uidOferta) {
    // Cria um div para o card
    const card = document.createElement('div'); 
    card.classList.add("lg:card", "lg:transition-all", "lg:duration-300", "lg:hover:-translate-y-5", "cursor-pointer", "card-oferta", "w-full", "lg:w-1/3", "px-12", "md:px-0");

    // Cria o input radio para selecionar o card
    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "ofertaCurso";
    radioInput.value = uidOferta;
    radioInput.classList.add("hidden"); // Mantém o input radio oculto

    // Adiciona um evento para selecionar o card e o input radio ao clicar no card
   
card.addEventListener("click", async () => {
    radioInput.checked = true; // Marca o input radio como selecionado

    // Remove o estilo de "selecionado" de todos os outros cards
    document.querySelectorAll(".container-cards .card-oferta").forEach(card => {
        card.classList.remove("bg-blue-700", "text-white", "card-selecionado");
        card.querySelector(".card-interno").classList.remove("bg-blue-700", "text-white");
        card.classList.add("bg-white", "text-black");
        card.querySelector(".card-interno").classList.add("bg-white", "text-black");
    });

    // Adiciona o estilo "selecionado" ao card atual
    card.classList.remove("bg-white", "text-black");
    card.querySelector(".card-interno").classList.remove("bg-white", "text-black");
    card.classList.add("md:bg-white", "text-white", "card-selecionado");
    card.querySelector(".card-interno").classList.add("bg-blue-700", "text-white");

    ofertaSelecionada = uidOferta; // Armazena o id da oferta selecionada
    console.log(`Oferta selecionada: ${ofertaSelecionada}`);

    // Envia o POST com a oferta selecionada
    try {
        const respostaPost = await fetch("https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/interesse", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                canal: canal,
                lead: leadId,
                oferta: ofertaSelecionada
            })
        });

        if (respostaPost.status === 200) {
            const respostaJson = await respostaPost.json();
            console.log("POST enviado com sucesso:", respostaJson);
        } else {
            console.error("Erro ao enviar POST:", respostaPost.statusText);
        }
    } catch (error) {
        console.error("Erro na requisição POST:", error);
    }
});


    // Conteúdo HTML do card
    card.innerHTML = `
        <div class="lg:card lg:transition-all lg:duration-300 lg:hover:-translate-y-5
        cursor-pointer card-interno border-solid border-2 border-gray-400 w-full h-[800px] md:h-[600px] lg:h-[800px]" data-card>
            <div class="px-4 py-7 flex flex-col gap-5">
                <span id="modalidade" class="flex justify-center rounded-full border-2 border-white p-2 text-xs font-bold w-1/3">
                    ${oferta.modalidade}
                </span>
                <div class="py-5">
                    <h4 class="text-2xl md:text-3xl font-bold ">${oferta.desconto}</h4>
                    <p class="text-sm font-semibold">${oferta.tipoDesconto}</p> 
                </div>
                <div class="flex flex-col md:flex md:flex-row md:justify-between lg:flex lg:flex-col gap-5 pb-10">
                    <div>
                        <span class="text-md md:text-xl font-semibold">R$${oferta.valorIntegral}</span>
                        <p class="text-xs md:text-md font-medium">VALOR INTEGRAL</p>
                    </div>
                    <div>
                        <span class="text-md md:text-xl font-semibold">R$${oferta.valorPrimeira}</span>
                        <p class="text-xs md:text-md font-medium">PRIMEIRA MENSALIDADE</p>
                    </div>
                    <div>
                        <span class="text-md md:text-xl font-semibold">R$${oferta.valorDemais}</span>
                        <p class="text-xs md:text-md font-medium">DEMAIS MENSALIDADES</p>
                    </div>
                </div>
                <div class="flex flex-col gap-5 pb-7">
                    <div class="flex justify-between text-xs md:text-sm font-semibold">
                        <p class="w-1/2">PERÍODO LETIVO</p>
                        <p class="w-1/2 text-right ">${oferta.periodoLetivo}</p>
                    </div>
                    <div class="flex justify-between text-xs md:text-sm font-semibold">
                        <p class="w-1/2">TURNO</p>
                        <p class="w-1/2 text-right ">${oferta.turno}</p>
                    </div>
                    <div class="flex justify-between text-xs md:text-sm font-semibold">
                        <p class="w-1/2">IES</p>
                        <p class="w-1/2 text-right ">${oferta.ies}</p>
                    </div>
                    <div class="flex justify-between text-xs md:text-sm font-semibold">
                        <p class="w-1/2">CAMPUS</p>
                        <p class="w-1/2 text-right ">${oferta.campus}</p>
                    </div>
                </div>
            </div>
        </div>
    `;

    card.prepend(radioInput); // Insere o radio antes do conteúdo do card
    return card;
}







async function chamarApiCursos() {
    // Obtém os parâmetros da URL da página
    const params = new URLSearchParams(document.location.search);
    
    // Obtém o valor do parâmetro 'cidade' da URL
    const cidadeParam = params.get('cidade');
    
    // Obtém o valor do parâmetro 'forma-ingresso' da URL
    const formaIngressoParam = params.get('forma-ingresso');
    
    // Constrói a URL para fazer uma requisição à API, passando os parâmetros 'cidade' e 'forma-ingresso'
    const cursosURL = `https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/cursos?canal=${canal}&cidade=${cidadeParam}&forma-ingresso=${formaIngressoParam}`

    const ofertasURL = `https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/ofertas?canal=${canal}&cidade=${cidadeParam}&forma-ingresso=${formaIngressoParam}`
    
    // Faz uma requisição para a API usando fetch e aguarda a resposta
    const respC = await fetch(cursosURL);
    
    // Verifica se a resposta foi bem-sucedida (status 200)
    if (respC.status === 200) {
        // Converte a resposta da API em um objeto JSON
        const objC = await respC.json();
        
        // Exibe a quantidade de resultados e o objeto retornado pela API no console
        console.log(objC.result.length);
        console.log(objC);
        
        // Seleciona o elemento do select (dropdown) onde os cursos serão exibidos
        const selC = document.getElementById('cursosDisponiveis__cursos');
        
        
        
        
        
        // Itera sobre cada resultado da API (cursos)
        for (let iC = 0; iC < objC.result.length; iC++) {
            // Obtém o nome do curso e o UID (identificador único) de cada curso
            const optValueC = `${objC.result[iC].nome}`;
            const optUid = `${objC.result[iC].uid}`;
            
            // Cria um elemento <option> para adicionar ao select
            const optC = document.createElement("option");
            optC.innerHTML = optValueC; // Define o nome do curso como o conteúdo visível
            selC.appendChild(optC); // Adiciona o <option> ao select
            optC.setAttribute("value", optUid); // Define o UID do curso como valor do <option>
        }
        // Adiciona um event listener ao select para detectar quando o usuário seleciona um curso
        selC.addEventListener('change', async function(event) {
            let value = event.target.value;
            
                let rol = document.querySelectorAll('.row-escondida');
                
                rol.forEach(function(element) {
                    if (value === '') {
                        element.style.display = 'none';
                    } else {
                        element.style.display = '';
                    }
                });
                
                //Enviar (POST) uid da primeira oferta de cada curso clicado para Interesse
                const oferta = await fetch(`${ofertasURL}&denominacao=${value}`);
                if (oferta.status === 200){ 
                    const ofertaJson = await oferta.json();
 
                    console.log("Requisição enviado com sucesso (primeira oferta): ");
                    console.log(ofertaJson);
                    let ofertaInteresse = ofertaJson.result[0].uid ;
                    
                    console.log(`oferta que esta sendo enviada: ${ofertaInteresse}`)
                    
                    try{
                        const conexaoInteresse = await fetch("https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/interesse", {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json"
                            },
                            body: JSON.stringify({
                                canal: canal,
                                lead: leadId,
                                oferta: ofertaInteresse
                                
                            })
                        })
                        if (conexaoInteresse.status === 200) {
                            const interesseJson = await conexaoInteresse.json();
                            
                            console.log("Interesse da primeira oferta do curso clicado enviado com sucesso:")
                            console.log( interesseJson);
                        }
                        
                    }catch (error) {
                        console.log(`deu esse erro aqui: ${error}` )
                    }
                    
                }
                

                
            });


            
            selC.addEventListener('change', async function(event) {
                let uid = event.target.value;
                
                const cidadeParam = new URLSearchParams(window.location.search);
                const cidade = cidadeParam.get('cidade');
                
                const formaIngressoParam = new URLSearchParams(window.location.search);
                const formaIngresso = formaIngressoParam.get("forma-ingresso");
                
                const cursosTextURL = `https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/ofertas/?canal=${canal}&cidade=${cidade}&forma-ingresso=${formaIngresso}&denominacao=${uid}`;
                
                const respText = await fetch(cursosTextURL);
                
                if (respText.status == 200) {
                    const det = await respText.json();
                    
                    console.log(det);
                    const cursoNome = det.result[0].curso.especialidade.denominacao.nome;
                    
                    document.getElementById("cursoNome").innerHTML = cursoNome;

                    const uid = det.result[0].curso.uid
                    
                    const infExtra = "https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/conteudo/" + uid;
                    
                    const respInfExtra = await fetch(infExtra);
                    
                    if (respInfExtra.status == 200) {
                        
                        const jsonExtra = await respInfExtra.json();
                        
                        console.log(jsonExtra);
                        
                        // Verifica e exibe o texto de apresentação e atuação, se existirem
                        if (jsonExtra.texts && jsonExtra.texts[0] && jsonExtra.texts[0].text) {
                            document.getElementById("textoApresentacao").innerHTML = jsonExtra.texts[0].text;
                            document.querySelector(".apresentacao").classList.remove("hidden");
                        } else {
                            document.querySelector(".apresentacao").classList.add("hidden");
                        }

                        if (jsonExtra.texts && jsonExtra.texts[1] && jsonExtra.texts[1].text) {
                            document.getElementById("textoAtuacao").innerHTML = jsonExtra.texts[1].text;
                            document.querySelector(".atuacao").classList.remove("hidden");
                        } else {
                            document.querySelector(".atuacao").classList.add("hidden");
                        }
                        
                        
                        //verificar se o vídeo existe na api e exibir, senão ocultar
                        if (jsonExtra.videos && jsonExtra.videos[0] && jsonExtra.videos[0].video && jsonExtra.videos[0].video.text) {
                            document.getElementById("sectionVideo").classList.remove("hidden");
                            document.getElementById("sourceVideo").setAttribute("src", jsonExtra.videos[0].video.text);
                            document.getElementById("sourceVideo").setAttribute("type", "video/mp4");
                            document.getElementById("sourceVideo").parentElement.load(); // Recarrega o vídeo
                        }else {
                            document.getElementById("sectionVideo").classList.add("hidden");
                            
                            
                        }
                        
                        
                    }
                    
                    gerarCards(det.result);  // Passando os dados completos para gerar os cards
                }
            });
            
        }
    }
    
    // Função para gerar e inserir os cards
function gerarCards(det) {
    const containerCards = document.querySelector(".container-cards");
    containerCards.innerHTML = ""; // Limpar o container antes de adicionar novos cards
    
    for (let c = 0; c < det.length; c++) {
        // Formata os valores com toLocaleString para o padrão brasileiro
        
        
        const valorIntegral = (det[c].precificacao.valor / 100).toLocaleString('pt-BR');
        const valorPrimeira = (det[c].valor_primeira_mensalidade / 100).toLocaleString('pt-BR');
        const valorDemais = (det[c].valor_demais_mensalidades / 100).toLocaleString('pt-BR');
        
        const oferta = {
            modalidade: det[c].curso.especialidade.modalidade.nome,
            desconto: det[c].bolsa.percentual_desconto + '% ' + det[c].bolsa.nome,
            tipoDesconto: det[c].bolsa.descricao ,
            valorIntegral: valorIntegral, 
            valorPrimeira: valorPrimeira,  
            valorDemais: valorDemais,      
            periodoLetivo: det[c].processo_seletivo.periodo_letivo.nome,
            turno: det[c].curso.turno.nome,
            ies: det[c].campus.mantida.nome,
            campus: det[c].campus.nome
        };
        
        const uidOferta = det[c].uid
        
        
        const card = criarCards(oferta, uidOferta); // Cria um novo card
        containerCards.appendChild(card); // Adiciona o card ao container
        
    }
}


//botao de retorno
const cidadeParam = new URLSearchParams(document.location.search);
const cidadeId = cidadeParam.get('cidade');
const urlRetorno = `cursos.html?canal=${canal}&cidade=${cidadeId}`;
document.getElementById("btnRetornar__cursos").addEventListener("click", () => {
    window.location.href = urlRetorno;
});

// Listener para o botão "Avançar"
document.getElementById("btnAvancar__cursos").addEventListener("click",async () => {
    if (!ofertaSelecionada) {
        alert("Por favor, selecione uma oferta antes de avançar.");
        return;
    }

    const urlParams = new URLSearchParams(document.location.search);
    const cidadeId = urlParams.get('cidade');
    const formaId = urlParams.get("forma-ingresso");

    try{
        const conexaoOferta = await fetch("https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/interesse", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                canal: canal,
                lead: leadId,
                oferta: ofertaSelecionada
                
            })
        })
        if (conexaoOferta.status === 200) {
            const ofertaJson = await conexaoOferta.json();
            
            console.log( ofertaJson);

             const urlDestino = `complemento.html?canal=${canal}&cidade=${cidadeId}&forma-ingresso=${formaId}&lead=${leadId}&oferta=${ofertaSelecionada}`;
             window.location.href = urlDestino;

        }
        
    }catch (error) {
        console.log(`Erro na requisição: ${error}` )
    }

});




checarParamsForms();
chamarApiCursos();

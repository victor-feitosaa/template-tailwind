function checarParamsComplemento(){
    const urlParams = new URLSearchParams(window.location.search);
    const ofertaParams = urlParams.has('oferta');
    if (!ofertaParams) {
        window.location.href = 'inicio.html'
    }
};

//globais
const urlParamsLead = new URLSearchParams(window.location.search);
let leadId = urlParamsLead.get("lead");
const canalParam = new URLSearchParams(document.location.search);
const canal = canalParam.get('canal');
const urlParamsOferta = new URLSearchParams(window.location.search);
const ofertaParams = urlParamsOferta.get("oferta");



//segunda pagina de formulario
const genero = document.getElementById("genero__forms");
const cep = document.getElementById("cep__forms");
const cidade = document.getElementById("cidade__forms");
const estado = document.getElementById("estado__forms");
const bairro = document.getElementById("bairro__forms");
const rua = document.getElementById("rua__forms");
const numero = document.getElementById("numero__forms");
const rg = document.getElementById("rg__forms");
const data = document.getElementById("data__forms");
const formComp = document.getElementById("form__forms--complemento");




formComp.addEventListener("submit",(event) => {
    event.preventDefault();
    checkInputs();
} );

function validarDataNascimento(input) {
    const dataValor = input.value.trim();

    // Regex para validar o formato DD/MM/AAAA
    const dataRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = dataValor.match(dataRegex);

    if (!match) {
        errorInput(input, "Data de nascimento inválida (use o formato DD/MM/AAAA)");
        return false;
    }

    const dia = parseInt(match[1], 10);
    const mes = parseInt(match[2], 10) - 1; // Os meses em JavaScript começam de 0
    const ano = parseInt(match[3], 10);

    // Validar a data usando o objeto Date
    const data = new Date(ano, mes, dia);
    if (
        data.getDate() !== dia || 
        data.getMonth() !== mes || 
        data.getFullYear() !== ano
    ) {
        errorInput(input, "Data de nascimento inválida");
        return false;
    }

    // Validar a faixa etária (exemplo: maior de 18 anos)
    const hoje = new Date();
    const idade = hoje.getFullYear() - ano - (hoje < new Date(hoje.getFullYear(), mes, dia) ? 1 : 0);

    if (idade < 18) {
        errorInput(input, "Você precisa ter pelo menos 18 anos");
        return false;
    }

    if (idade > 120) {
        errorInput(input, "Data de nascimento inválida");
        return false;
    }

    removeError(input); // Se tudo estiver válido, remove qualquer erro
    return true;
}

// Adiciona evento de validação ao campo de data de nascimento
data.addEventListener("blur", () => validarDataNascimento(data));
//adiciona as barras / na digitação da data automaticamente 
data.addEventListener("input", (e) => {
    let valor = e.target.value.replace(/\D/g, ""); // Remove tudo que não for dígito
    if (valor.length > 2 && valor.length <= 4) {
        valor = `${valor.slice(0, 2)}/${valor.slice(2)}`;
    } else if (valor.length > 4) {
        valor = `${valor.slice(0, 2)}/${valor.slice(2, 4)}/${valor.slice(4, 8)}`;
    }
    e.target.value = valor; // Atualiza o valor formatado
});



async function checkInputs() {
    let isValid = true; // Assume que tudo está válido inicialmente

    if (genero.value === "") { 
        errorInput(genero, "Selecione uma opção"); 
        isValid = false;
    } else {
        removeError(genero);
    }

    if (cep.value === "") { 
        errorInput(cep, "Informe seu cep"); 
        isValid = false;
    } else {
        const cepValido = await validarCep(cep.value); // Valida o CEP na API
        if (!cepValido) {
            errorInput(cep, "CEP inválido ou não encontrado");
            isValid = false;
        } else {
            removeError(cep);
        }
    }

    if (cidade.value === "") { 
        errorInput(cidade, "Informe sua cidade"); 
        isValid = false;
    } else {
        removeError(cidade);
    }

    if (estado.value === "") { 
        errorInput(estado, "Informe seu estado"); 
        isValid = false;
    } else {
        removeError(estado);
    }

    if (bairro.value === "") { 
        errorInput(bairro, "Informe seu bairro"); 
        isValid = false;
    } else {
        removeError(bairro);
    }

    if (rua.value === "") { 
        errorInput(rua, "Informe sua rua"); 
        isValid = false;
    } else {
        removeError(rua);
    }

    if (numero.value === "") { 
        errorInput(numero, "Informe o número da sua residência"); 
        isValid = false;
    } else {
        removeError(numero);
    }

    if (data.value === "") { 
        errorInput(data, "Informe a data do seu aniversário"); 
        isValid = false;
    } else {
        removeError(data);
    }
    if (!validarDataNascimento(data)) {
        isValid = false;
    }
    

    return isValid; // Retorna o estado da validação
}






function errorInput(input, message) {
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a");
    textMessage.innerText = message;
    formItem.classList.add("error");
}

function removeError(input) {
    const formItem = input.parentElement;
    const mensagemErro = formItem.querySelector("a");
    mensagemErro.classList.add("opacity-0");
    formItem.classList.remove("error");
}

// Função para validar o CEP usando a API
async function validarCep(cep) {
    const URL = `https://viacep.com.br/ws/${cep}/json/`;
    
    try {
        const resposta = await fetch(URL);
        if (resposta.status === 200) {
            const enderecoJson = await resposta.json();
            if (enderecoJson.erro) {
                return false; // Retorna falso se o CEP não existe
            }
            // Atualiza os campos com os dados retornados pela API
            cidade.value = enderecoJson.localidade || cidade.value;
            estado.value = enderecoJson.uf || estado.value;
            bairro.value = enderecoJson.bairro || bairro.value;
            rua.value = enderecoJson.logradouro || rua.value;
            return true; // CEP válido
        }
        return false;
    } catch (error) {
        console.error("Erro ao validar o CEP:", error);
        return false; // Considera inválido em caso de erro na requisição
    }
}

async function cepApi() {
    
    
    cep.addEventListener("focusout", async () => {
        const cepValue = cep.value;
        const URL = `https://viacep.com.br/ws/${cepValue}/json/`;
        
        try {
            const endereco = await fetch(URL);
            
            if (endereco.status === 200) {
                const enderecoJson = await endereco.json();
                console.log(enderecoJson);
                
                // Atualize os campos com os dados recebidos
                cidade.value = enderecoJson.localidade;
                estado.value = enderecoJson.uf;
                bairro.value = enderecoJson.bairro;
                rua.value = enderecoJson.logradouro;
            } else {
                console.log("Erro na requisição:", endereco.status);
            }
        } catch (error) {
            console.log("Erro ao buscar o CEP:", error);
            errorInput(cep, "Cep inválido");
        }
    });
}


// Adiciona o listener de input e change para remover o erro ao digitar ou preenchimento automático
[genero, cep, cidade, estado, bairro, rua, numero, data].forEach(input => {
    input.addEventListener("input", () => removeError(input));
    input.addEventListener("change", () => removeError(input)); 
});


const paramsComp = new URLSearchParams(window.location.search);
const cidadeParam = paramsComp.get("cidade");
const formaIngressoParam = paramsComp.get("forma-ingresso");



async function dadosComplemento(dataNascimento, sexo, cep, rua, numero, bairro, cidade, estado) {
    
    try {
        const conexao = await fetch(`https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/lead/${leadId}`, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                data_nascimento: dataNascimento,
                sexo: sexo,
                cep: cep,
                logradouro: rua,
                numero: numero,
                bairro: bairro,
                cidade: cidade,
                estado: estado
                
            })
        })
        console.log("Status da resposta (complementos):", conexao.status);
        if (conexao.ok) {

            const conexaoInscricao = await fetch('https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/inscricao', {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    canal: canal,
                    lead: leadId,
                    oferta: ofertaParams
                })
            })
            console.log("Status da resposta (inscrição): ", conexaoInscricao.status)
            if (conexaoInscricao.ok) {
                const inscricao = await conexaoInscricao.json();
                return inscricao;
            }  else {
                console.error("Erro na requisição, status:", conexao.status);
                return null;
            }

            // const responseText = await conexao.text();
            // if (responseText) {
            //     const complementoJson = JSON.parse(responseText);
            //     console.log(complementoJson);
            //     return complementoJson;
            // } else {
            //     console.log("Resposta sem conteúdo.");
            //     return null;
            // }
        } else {
            console.error("Erro na requisição, status:", conexao.status);
            return null;
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
    
}



//botão de retorno
document.getElementById("btnRetornar__complemento").addEventListener("click", () => {
    const leadId = new URLSearchParams(document.location.search).get('lead');
    
    window.location.href = `cursos.html?canal=${canal}&cidade=${cidadeParam}&forma-ingresso=${formaIngressoParam}&lead=${leadId}`
    
})

//botão de finalizar inscrição e enviar dados(POST)
document.getElementById("btnAvancar__complemento").addEventListener("click", async () => {
    const validacao = await checkInputs(); // Aguarda a validação completa
    if (!validacao) {
        console.error("Formulário contém erros. Corrija antes de enviar.");
        return; // Interrompe o fluxo caso existam erros
    }
    
    // Captura os valores dos campos
    const dataValue = data.value;
    const generoValue = genero.value;
    const cepValue = cep.value;
    const ruaValue = rua.value;
    const numeroValue = numero.value;
    const bairroValue = bairro.value;
    const cidadeValue = cidade.value;
    const estadoValue = estado.value;
    
    try {
        const conexaoCep = await fetch(`https://viacep.com.br/ws/${cepValue}/json/`)
        if (conexaoCep.status === 200) {
            const conexaoCepJson = await conexaoCep.json();
            const cidadeIBGE = conexaoCepJson.ibge
            const estadoIBGE = cidadeIBGE.slice(0, 2);
            console.log(cidadeIBGE, estadoIBGE)
            
            try {
                // Envia os dados para a API
                const resultado = await dadosComplemento(dataValue, generoValue, cepValue, ruaValue, numeroValue, bairroValue, cidadeIBGE, estadoIBGE);
                console.log(resultado);
                
                // Redireciona para o portal do aluno
                  window.location.href = ` https://teste-candidato.uninorteac.edu.br/sso?token=${resultado.token_inscricao}`;
            } catch (error) {
                console.error("Erro ao processar a inscrição: " + error);
            }
            
            
            
        } else {
            alert("Erro na requisição")
        }
        
    } catch (error) {
        console.log(`Erro na requisição: ${error}`)
    }
    
    
});




cepApi();
checarParamsComplemento();


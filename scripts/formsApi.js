import  enviarDados  from "./envioDados.js";


const urlParams = new URLSearchParams(window.location.search);
const cidadeParam = urlParams.has('cidade');

const canalParam = new URLSearchParams(document.location.search);
const canal = canalParam.get('canal');


function checarParamsForms() {

    if (!cidadeParam) {
        window.location.href = 'inicio.html';
    }
}

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) soma += parseInt(cpf.charAt(i)) * (10 - i);
    let resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) soma += parseInt(cpf.charAt(i)) * (11 - i);
    resto = 11 - (soma % 11);
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
}

function validarFormulario() {
    const formasValue = document.getElementById("formasDeIngresso__forms").value;
    const cpfValue = document.getElementById("cpf__forms").value;
    const nomeValue = document.getElementById("nome__forms").value;
    const emailValue = document.getElementById("email__forms").value;
    const telefoneValue = document.getElementById("telefone__forms").value;


    if (!formasValue || !cpfValue || !nomeValue || !emailValue || !telefoneValue) {
        return false;
    }

    if (cpfValue.length !== 14 || !validarCPF(cpfValue)) {
        return false;
    }

    if (telefoneValue.length !== 15) {
        return false;
    }

    return { cpfValue, nomeValue, emailValue, telefoneValue, formasValue, cidadeParam  };
}

async function formasDeIngresso() {
    const urlParam = new URLSearchParams(document.location.search);
    const cidadeEscolhida = urlParam.get('cidade');

    const URL = `https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/formas-ingresso?canal=${canal}&cidade=${cidadeEscolhida}`;

    const resp = await fetch(URL);
    if (resp.status === 200) {
        const obj = await resp.json();
        const sel = document.getElementById('formasDeIngresso__forms');

        obj.result.forEach(forma => {
            const opt = document.createElement("option");
            opt.innerHTML = forma.nome;
            opt.value = forma.uid;
            sel.appendChild(opt);
        });

        document.getElementById('btn__forms').addEventListener('click', enviarFormulario);
    }
}

async function enviarFormulario() {
    // Valida o formulário
    const dadosValidos = validarFormulario();
    if (dadosValidos) {
        let { cpfValue, nomeValue, emailValue, telefoneValue, formasValue, cidadeParam } = dadosValidos;

        cpfValue = cpfValue.replace(/\D/g, ''); // Remove caracteres não numéricos do CPF

        try {
            // Envia os dados e aguarda o retorno do `leadId`
            const leadData = await enviarDados(cpfValue, nomeValue, emailValue, telefoneValue, formasValue, cidadeParam);

            // Extrai o `leadId` do retorno
            const leadId = leadData; 
            console.log("Lead ID recebido:", leadId);

            if (!leadId) {
                alert("Erro na validação dos dados");
                return;
            }

            // Redireciona para a próxima página com o `leadId` na URL

             const cidadeId = new URLSearchParams(document.location.search).get('cidade');
             const urlUid = `cursos.html?canal=${canal}&cidade=${cidadeId}&forma-ingresso=${formasValue}&lead=${leadId}`;
             window.location.href = urlUid;

        } catch (error) {
            console.error("Erro ao enviar dados ou capturar o Lead ID:", error);
            alert("Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.");
        }
    }
}



checarParamsForms();
formasDeIngresso();

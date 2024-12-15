const form = document.getElementById("form__forms");
const cpf = document.getElementById("cpf__forms");
const nome = document.getElementById("nome__forms");
const email = document.getElementById("email__forms");
const telefone = document.getElementById("telefone__forms");
const select = document.getElementById('formasDeIngresso__forms');



form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkInputCpf();
    checkInputEmail();
    checkInputNome();
    checkInputTelefone();
    checkSelect();
    
});



function checkSelect(){
    const selectValue = select.value;

    if(selectValue === "") {
        errorInput(select, "Selecione uma opção!")
    } else {
        const formItem = select.parentElement;

        formItem.className = "conteudo__forms flex flex-col gap-2"
    }
};

function checkInputCpf() {
    const cpfValue = cpf.value;

    if(cpfValue === "") {
        //mostrar mensagem de erro...
        errorInput(cpf, "Preencha o campo corretamente!");
    }else if(cpfValue.length > 14) {
        errorInput(cpf, "Número de caracteres excedido!")
    }else if (cpfValue.length < 14 ) {
        errorInput(cpf, "Caracteres insuficientes!")
    }else {
        const formItem = cpf.parentElement;
        formItem.classList = "conteudo__forms flex flex-col"
    }
    
    if (validarCPF(cpfValue)) {
       return true;
    } else {
        errorInput(cpf, "CPF invalido!");
    }
    
};

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false; // Checa o formato e se todos os dígitos são iguais

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



function formatarCPF(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca o primeiro ponto
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2'); // Coloca o segundo ponto
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); // Coloca o hífen

    input.value = valor;
}
    


function checkInputNome() {
    const nomeValue = nome.value;

    if(nomeValue === ""){
        errorInput(nome, "O Nome é obrigatório.")
    } else {
        const formItem = nome.parentElement;
        formItem.className = "conteudo__forms flex flex-col";
    }
}

function checkInputEmail(){
    const emailValue = email.value;

    if(emailValue === "") {
        errorInput(email, "O email é obrigatório")
    } else {
        const formItem = email.parentElement;
        formItem.className = "conteudo__forms flex flex-col"
    }
}


function checkInputTelefone(){
    const telefoneValue = telefone.value;

    if(telefoneValue === "") {
        errorInput(telefone, "O telefone é obrigatório")
    } else if(telefoneValue.length < 15) {
        errorInput(telefone, "O número tem caracteres insuficientes.")
    }else if (telefoneValue.length > 15) {
        errorInput(telefone, "Número de caracteres excedido!")
    }else {
        const formItem = telefone.parentElement;
        formItem.className = "conteudo__forms flex flex-col"
    }
}





function formatarTelefone(input) {
    let valor = input.value.replace(/\D/g, ''); // Remove qualquer caractere que não seja número

    // Formatação para o formato (XX) XXXXX-XXXX
    if (valor.length > 10) {
        //formatar como celular
        valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (valor.length > 2) {
        //adicionar o DDD
        valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
    }

input.value = valor; // Atualiza o valor do input com a formatação
}


[cpf, nome, email, telefone, select].forEach(input => {
    input.addEventListener("input", () => removeError(input));
    input.addEventListener("change", () => removeError(input)); 
})

function errorInput(input, message){
    const formItem = input.parentElement;
    const textMessage = formItem.querySelector("a")

    textMessage.innerText = message;

    formItem.classList.add("error") ;
};


function removeError(input) {
    const formItem = input.parentElement;
    const mensagemErro = formItem.querySelector("a");
    mensagemErro.classList.add("opacity-0");
    formItem.classList.remove("error");
}
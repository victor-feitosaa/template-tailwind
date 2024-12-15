const canal = '019288cf-9615-7b8d-87d9-84f134d7b3ba'

const canalTeste = '019288d0-303b-7471-a708-330cf33c21b9'

const canalTesteSecundario = '01936a76-1e5c-7478-b842-61e0c35fcdb4'

const canalEmUso = canal;

const URL = `https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/localidades?canal=${canalEmUso}`

//URL para teste com multiplas localidades:
//  const URL = `https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/estados/ac/cidades`





async function local(){
    const api = await fetch(URL);

    if (api.status === 200) {
        const apiJson = await api.json();
        const apiLength = apiJson.result.length;
        console.log(apiJson);
        console.log(apiLength);
        if (apiLength === 0) {
            window.location.href = "localidadesVazio.html";
        } else if (apiLength === 1) {
            window.location.href = `formularios.html?canal=${canalEmUso}&cidade=${apiJson.result[0].id}`;
        } else {
            window.location.href = "localidadesMult.html";
        }
    }
};

local();

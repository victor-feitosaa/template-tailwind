function checarParamsForms(){
    const urlParams = new URLSearchParams(window.location.search);
    const formasParams = urlParams.has('forma-ingresso');
    if (!formasParams) {
        window.location.href = 'inicio.html'
    }
 };




async function chamarApiCursos() {

    const params = new URLSearchParams(document.location.search);
    const cidadeParam = params.get('cidade');
    const formaIngressoParam = params.get('forma-ingresso');

    const cursosURL = 'https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/cursos?ctx=018c3fc0-dcf7-7b30-8c17-220c7bd5853c&cidade=' + cidadeParam + '&modalidade=018c3fdc-033c-7357-8e19-6872888b7fd4&forma-ingresso=' + formaIngressoParam;

    const respC = await fetch(cursosURL);

    if (respC.status === 200) {
     const objC = await respC.json();
 
    

     console.log(objC.result.length);
     console.log(objC);
     const selC = document.getElementById('cursosDisponiveis__cursos');
 
     for (let iC = 0 ; iC < objC.result.length; iC++ ){
         const optValueC = `${objC.result[iC].nome}`;
         const optUid = `${objC.result[iC].uid}`
         const optC = document.createElement("option");
         optC.innerHTML = optValueC;
         selC.appendChild(optC);
         optC.setAttribute("value",optUid);

    }

        //exibirRol
        selC.addEventListener('change', function(event) {
         let value = event.target.value;
         
         console.log(value);
         let rol = document.querySelector('.rolDois__cursos')
         if (value === '') {
            rol.classList.add('hidden');
         } else {
         rol.className = 'rolDois__cursos';
         }
         console.log(value)

         

 
        })
    

        //mudar o texto
        selC.addEventListener('change',async function(event) {
         
        //fazendo requisição das ofertas de acordo com uid do curso selecionado

        let uid = event.target.value;

        const cidadeParam = new URLSearchParams(window.location.search)
        const cidade = cidadeParam.get ('cidade');
        
        const formaIngressoParam = new URLSearchParams(window.location.search);
        const formaIngresso = formaIngressoParam.get("forma-ingresso");

        const cursosTextURL = "https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/ofertas/?ctx=018c3fc0-dcf7-7b30-8c17-220c7bd5853c&cidade=" + cidade +"&modalidade=018c3fdc-033c-7357-8e19-6872888b7fd4&forma-ingresso=" + formaIngresso + "&denominacao=" + uid;

        console.log(cursosTextURL);  
        

        const respText = await fetch(cursosTextURL);

            if (respText.status == 200) {
                const det = await respText.json();

                console.log(det);

            //definir onde as informações requisitadas irão aparecer
                const divTexto = document.getElementById("textoApi");
                //oferta um

                const divDuration = document.getElementById('semestresApi');
                const divTipoCurso = document.getElementById('tipoCursoApi');       
                const modalidadeCursoOftUm = document.getElementById('modalidadeApi');
                const porcentagemOftUm = document.getElementById('porcentagemOferta');
                const divValorIntegral = document.getElementById('valorIntegral');
                const divPrimeiraMensalidade = document.getElementById('primeiraMensalidade');
                const divMensalidadeDesconto = document.getElementById('mensalidadeDesconto');
                const divPeriodoLetivo = document.getElementById('periodoLetivo');
                const divTurno = document.getElementById('turno');
                const divIes = document.getElementById('ies');
                const divCampus = document.getElementById('campus');

                //oferta dois
                
                const divInscricao = document.getElementById('taxaInscricao');
                const modalidadeCursoOftDois = document.getElementById('modalidadeApi2');
                const porcentagemOftUm2 = document.getElementById('porcentagemOferta2');
                const divValorIntegral2 = document.getElementById('valorIntegral2');
                const divPrimeiraMensalidade2 = document.getElementById('primeiraMensalidade2');
                const divMensalidadeDesconto2 = document.getElementById('mensalidadeDesconto2');
                const divPeriodoLetivo2 = document.getElementById('periodoLetivo2');
                const divTurno2 = document.getElementById('turno2');
                const divIes2 = document.getElementById('ies2');
                const divCampus2 = document.getElementById('campus2');

                //Mudar texto card oferta Um
                const modalidadeDet = det.result[1].curso.especialidade.modalidade.nome
                modalidadeCursoOftUm.innerHTML = modalidadeDet.toUpperCase();

                const porcentagem = det.result[1].percentual_desconto;
                const tipoOferta = det.result[1].bolsa.nome;
                const frasePorcentagem = porcentagem + '% ' + tipoOferta;
                porcentagemOftUm.innerHTML = frasePorcentagem;

                const valor = det.result[1].precificacao.valor;
                divValorIntegral.innerHTML = valor;

                const primeiraMensalidade = valor / (100 - porcentagem);
                divPrimeiraMensalidade.innerHTML = primeiraMensalidade;

                const mensalidadeDesconto = det.result[1].valor_demais_mensalidades;
                divMensalidadeDesconto.innerHTML = mensalidadeDesconto;

                const periodoLetivo =  det.result[1].processo_seletivo.periodo_letivo.nome;
                divPeriodoLetivo.innerHTML = periodoLetivo + '° Semestre';
                
                const turno = det.result[1].curso.turno.nome;
                divTurno.innerHTML = turno;

                const ies = det.result[1].campus.mantida.nome;
                divIes.innerHTML = ies;

                const campus = det.result[1].campus.nome;
                divCampus.innerHTML = campus;

                //oferta dois
                const taxaInscricao = det.result[0].valor_inscricao;
                divInscricao.innerHTML = taxaInscricao;

                const modalidadeDet2 = det.result[0].curso.especialidade.modalidade.nome
                modalidadeCursoOftDois.innerHTML = modalidadeDet2.toUpperCase();

                const porcentagem2 = det.result[0].percentual_desconto;
                const tipoOferta2 = det.result[0].bolsa.nome;
                const frasePorcentagem2 = porcentagem2 + '% ' + tipoOferta2;
                porcentagemOftUm2.innerHTML = frasePorcentagem2;

                const valor2 = det.result[0].precificacao.valor;
                divValorIntegral2.innerHTML = valor2;

                const primeiraMensalidade2 = valor2 / (100 - porcentagem2);
                divPrimeiraMensalidade2.innerHTML = primeiraMensalidade2;

                const mensalidadeDesconto2 = det.result[0].valor_demais_mensalidades;
                divMensalidadeDesconto2.innerHTML = mensalidadeDesconto2;

                const periodoLetivo2 =  det.result[0].processo_seletivo.periodo_letivo.nome;
                divPeriodoLetivo2.innerHTML = periodoLetivo2 + '° Semestre';
                
                const turno2 = det.result[0].curso.turno.nome;
                divTurno2.innerHTML = turno2;

                const ies2 = det.result[0].campus.mantida.nome;
                divIes2.innerHTML = ies2;

                const campus2 = det.result[0].campus.nome;
                divCampus2.innerHTML = campus2;

                //requisitando os textos do curso selecionado baseado no uid em ofertas e adicionando no html

                const uidDet = det.result[1].curso.uid;

                const urlDet = 'https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/conteudo/' + uidDet;
                const pegarTexto = await fetch (urlDet);
                if (pegarTexto.status == 200){
                    
                    const textos = await pegarTexto.json();
                    console.log(textos);

                    const duration = textos.duration;
                    divDuration.innerHTML = duration;

                    const tipoCurso = textos.degree.name;
                    divTipoCurso.innerHTML = tipoCurso;

                    const textoApresentacao = textos.texts[0].text;   
                    divTexto.innerHTML = textoApresentacao;

                    document.getElementById('btn1').addEventListener('click', () => {
                        const textoApresentacao = textos.texts[0].text;   
                        divTexto.innerHTML = textoApresentacao;

                        
                    })

                    document.getElementById('btn2').addEventListener('click', () => {
                        const textoApresentacao = textos.texts[1].text;   
                        divTexto.innerHTML = textoApresentacao;
                    
                     })
            
                }
            
            
         
            }


        })


    }


 };


   
    checarParamsForms();
    chamarApiCursos().then (()=> {
         const btn1 = document.getElementById('btn1');
         const btn2 = document.getElementById('btn2');
        
        
            btn2.addEventListener('click', (event) => {
                
                console.log(this.className);
                btn2.classList.add('pressed');
                btn1.classList.remove('pressed');

                
            })

            btn1.addEventListener('click', (event) => {
                btn1.classList.add('pressed');
                btn2.classList.remove('pressed');
                
            })

        
         const ofertaUm = document.querySelector('.ofertaUm__cursos');
         const ofertaDois = document.querySelector('.ofertaDois__cursos');

            ofertaUm.addEventListener ('click', (event) => {
                ofertaUm.classList.add('pressed');
                ofertaDois.classList.remove('pressed');
            })

            ofertaDois.addEventListener ('click', (event) => {
                ofertaDois.classList.add('pressed');
                ofertaUm.classList.remove('pressed');
            })

    })
    
    


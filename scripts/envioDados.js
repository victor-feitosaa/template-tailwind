 async function enviarDados( cpf, nome, email, telefone, formaIngresso, cidade ) {
    try { 
        const conexao = await fetch("https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/lead", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({

                mantenedora: "018c3fc0-dcf7-7b30-8c17-220c7bd5853c",
                cpf: cpf,
                nome_civil: nome,
                email: email,
                telefone: telefone

    
            })
        });
        if ( conexao.status === 200) {

            const conexaoConvertidaLead = await conexao.json();
            console.log(conexaoConvertidaLead.id);
            const leadId = conexaoConvertidaLead.id;
            
 


            try {
                const conexaoInteresse = await fetch("https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/interesse", {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({
                        canal: "019288cf-9615-7b8d-87d9-84f134d7b3ba",
                        lead: leadId,
                        forma_ingresso: formaIngresso,
                        cidade: cidade
                        
                    })
                })
                if (conexaoInteresse.status === 200) {
                    const conexaoConvertidaInteresse = await conexaoInteresse.json();
                    console.log(conexaoConvertidaInteresse.uid);
                    
                    return leadId;
                }
                
            } catch (error) {
                console.log("Erro na requisição:", error);

            }

            
        }
    } catch (error) {
        console.log("Erro na requisição:", error);
    }

}

// async function enviarInteresse(lead, formaIngresso, cidade, bolsa) {
//     try {
//         const conexao = await fetch("https://teste-api-capta.uninorteac.edu.br:443/api/v1/ficha/interesse", {
//             method: "POST",
//             headers: {
//                 "Content-type": "application/json"
//             },
//             body: JSON.stringify({
//                 mantenedora: "018c3fc0-dcf7-7b30-8c17-220c7bd5853c",
//                 lead: lead,
//                 forma_ingresso: formaIngresso,
//                 cidade: cidade,
//                 bolsa: bolsa 
//             })
//         })
//         if (conexao.status === 200 ) {
//             const conexaoConvertida = await conexao.json();
//             console.log(conexaoConvertida);
//             return conexaoConvertida;
//         }
//     } catch (error) {
//         console.log("Erro na requisição:", error);
        
//     }
// }



export default enviarDados; 








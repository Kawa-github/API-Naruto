$(document).ready( async () => {
        
    let personagens = await $.get('https://naruto-api.herokuapp.com/api/v1/characters/')

    personagens.map(personagem => {
        
        let altura
        let sexo = personagem.info.Sexo

        if(!("Altura" in personagem.info)){ // verificando se não existe um item/campo em um objeto
             altura = 'Altura desconhecida.'    
        }else{
            altura = personagem.info.Altura
            .replace('Parte I:', ' ')
            .replace('Parte II:', ' ')
        }

        let cla = !("Clã" in personagem.info)
            ? "Clã desconhecido ou inexistente."
            : personagem.info.Clã

        let idade = !("Idade" in personagem.info)
            ? "Idade Desconhecida." 
            : personagem.info.Idade.replace('Parte I:', ' ').replace('Parte II:', ' ')
    
        
        let aniversario = !("Aniversário" in personagem.info)
            ?  "Aniversário desconhecido."
            : personagem.info.Aniversário
            
            
            let informacoes = `
            <div class="card cardPersonagem m-3 pt-3 shadow headline" data-aos="fade-down">
                <div class="borderCard">
                    <center>
                        <img src="${personagem.images[0]}" class="imgPersonagens card-img-top">
                    </center>
                    <div class="card-title text-center p-2 txtNaruto divNomePersonagem ">
                        ${personagem.name.replace('_',' ')}
                    </div>
                        <div class="card-body">
                            <p class="">Clã: <span class="spanCla"> ${cla} </span> </p>
                            <p class="">Sexo: <span class="spanSexo"> ${sexo} </span> </p>
                            <p>Idade: ${idade}</p>
                            <p>Aniverśario: ${aniversario}</p>
                            <p>Altura: ${altura} </p>
                            <button id-personagem="${personagem.id}" data-bs-toggle="modal" data-bs-target="#myModal" class="btn btn-primary btn-detalhes">Saiba mais</button>
                        </div>
                    </div>
                </div>
        `
    
        $('.cards').append(informacoes)
    })
    
    // AOS.init(); // para iniciar a animação

    let modalDetalhes = new bootstrap.Modal($('#myModal')) // abrir modal bootstrap

     async function abrirCard(){
        modalDetalhes.show()
        let id = $(this).attr('id-personagem')
        let personagem = await $.get(`https://naruto-api.herokuapp.com/api/v1/characters/${id}`)
        
        $('#myModal .modal-title')
            .empty()
            .append(personagem.name.replace('_', ' '))


        $('#myModal .modal-body')
            .empty()
            .append(personagem.about.join('<br>'))
    }

    
    $('.btn-detalhes').on('click', abrirCard)

    function filtrarCla(){     
        let filtro = $(this).val()
        $(`.spanCla:contains(${filtro})`).closest('.cardPersonagem').removeClass('d-none')
        $(`.spanCla:not(:contains(${filtro}))`).closest('.cardPersonagem').addClass('d-none')
    }

    function filtrarSexo(){
        let filtro = $(this).val()
        $(`.spanSexo:contains(${filtro})`).closest('.cardPersonagem').removeClass('d-none')
        $(`.spanSexo:not(:contains(${filtro}))`).closest('.cardPersonagem').addClass('d-none')
    }

     function removerFiltro(){

        $('.cardPersonagem').removeClass('d-none')
        
    }
    
    $(function(){
        $('.buscaNome').keyup(function(){
            let texto = $(this).val()

            $('.cardPersonagem').each(function(){
                let resultado = $(this).text().toUpperCase().indexOf(' ' + texto.toUpperCase())
            
                if(resultado < 0){
                    $(this).addClass('d-none')
                }else{
                    $(this).removeClass('d-none')
                }

            })
        })
    })

    $('.opcoes-select').on('change', removerFiltro)
    $('.select-cla').on('change', filtrarCla)
    $('.select-sexo').on('change', filtrarSexo)
    

    $('.opcoes-select').on('change', function(){          
        let opcoes = $('.opcoes-select').val()
        
        switch (opcoes){
            case 'TODOS':
                $('.div-cla').addClass('d-none')
                $('.div-sexo').addClass('d-none')
                $('.div-nome').addClass('d-none')           
            break
            case 'CLA':
                $('.div-cla').removeClass('d-none')
                $('.div-sexo').addClass('d-none')
                $('.div-nome').addClass('d-none')
            break
            case 'SEXO':
                $('.div-sexo').removeClass('d-none')
                $('.div-cla').addClass('d-none')
                $('.div-nome').addClass('d-none')
            break
            case 'NOME':
                $('.div-nome').removeClass('d-none')
                $('.div-sexo').addClass('d-none')
                $('.div-cla').addClass('d-none')
            break
        }
    })

})
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}




                                                //FUNÇÕES JQUERY

//IR PARA TELA LISTA DE TAREFAS
function TelaLista() {

   	$(".divLista").addClass("mostraTelaLista");
   	
   	$(".divNovaTarefa").addClass("esconderTelaNovaTarefa");

	window.history.pushState({page:1}, 'TelaLista', 'Lista');

    $(".btn-lista").addClass("display");
    $(".btn-voltar").removeClass("display");
}

//VOLTAR PARA TELA NOVA TAREFA (Botao do Aplicativo)
function Voltar(){

    $(".divLista").removeClass("mostraTelaLista");	   	

    $(".divNovaTarefa").removeClass("esconderTelaNovaTarefa");
	
    $(".btn-lista").removeClass("display");
    $(".btn-voltar").addClass("display");

    history.go(-1);
};

//VOLTAR PARA TELA NOVA TAREFA (Botao de voltar do Telefone)
window.addEventListener('popstate', e => {
    
    $(".divLista").removeClass("mostraTelaLista");	   	

    $(".divNovaTarefa").removeClass("esconderTelaNovaTarefa");

    $(".btn-lista").removeClass("display");
    $(".btn-voltar").addClass("display");
    
});


                                            //ADICIONAR TAREFAS

'use strict'

// Cria array que representará nosso 'banco de dados' local
let banco = []

// Armazenar em constante array function que retorna os valores da chave 'todoList'
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? []

// Armazenar em constante array function que define um valor da chave 'tarefa' do nosso 'todoList'
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco))

// CRIAR ITEM NA NOSSA LISTAGEM DE TAREFAS
const criarItem = (titulo,descricao, indice) => {
    
    // Criar div
    const item = document.createElement('div');

    // Adicionar class 'accordion-item' a div
    item.classList.add('accordion-item');

    // Variável contadora
    var indices = indice+1;

    // Definir no conteudo da div
    item.innerHTML =  `<h2 class="" style="display:flex;" id="flush-heading`+indices+`">
                        <button class="accordion-button collapsed" style="width:90%;" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapse`+indices+`" aria-expanded="false" aria-controls="flush-collapseOne">
                        <span class='badge bg-primary text-white'>`+indices+`</span>
                        <span id='idTitulo'>${titulo}</span>
                        </button>
                        <button class="btn" onclick="excluirTarefa(${indice})">
                        <svg xmlns="http://www.w3.org/2000/svg" style="margin-top:3%;" width="25" height="25" fill="currentColor" class="bi text-danger bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                        </svg>
                        </button>
                      </h2>
                      <div id="flush-collapse`+indices+`" class="accordion-collapse collapse" aria-labelledby="flush-heading`+indices+`" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">${descricao}</div>
                      </div>
        	
    `;
    // Definir o novo item como filho do nosso todoList (div)    
    document.getElementById('accordionFlushExample').appendChild(item)
}


// LIMPAR TAREFAS

// Para evitar insercao duplica da lista toda quando chamamos a funcao atualizarTela()
const limparTarefas = () => {
    // Elemento todoList que é a nossa lista
    const todoList = document.getElementById('accordionFlushExample')

    // Enquanto todoList tiver um primeiro filho
    // Remova o ultimo filho que foi adicionado ao todoList
    // Lembrando que a lista é readicionada a cada nova insercao
    while (todoList.firstChild) { todoList.removeChild(todoList.lastChild) }
}

// ATUALIZAR TELA
const atualizarTela = () => {

    // Limpar tarefas
    limparTarefas()

    // Pega o Banco
    const banco = getBanco()

    // Pega e adiciona os dados para criaItem()
    banco.forEach ( (item, indice) => criarItem (item.titulo, item.descricao, indice));
    
    // Verifica se há tarefas
    let dados = JSON.parse(localStorage.getItem('todoList')).length;

    var mensagem = document.getElementById('mensagem');

    // Condição se exitir tarefas ou não
    if(dados == 0){
        mensagem.style.display = 'block';
        // Mostra mensagem (Não há Tarefas);
    }else{
        mensagem.style.display = 'none';
        // Esconde mensagem (Não há Tarefas);
    }
}

// INSERIR ITEM NA LISTA DE TAREFAS
const inserirItem = (evento) => {

    // Verifica campos vazios
    if ($("#titulo").val() === ""|| $("#descricao").val() === "") {
        
        // SweetAlert2
        Swal.fire({
            text: 'Preencha os campos!',
        });
    }else{
        
        // Valores dos campos
        const titulo = $("#titulo").val();
        const descricao = $("#descricao").val();

        
        // Pega o banco
        const banco = getBanco()

        // Faça um push (adicione) de chave/valor da tarefa
        banco.push ({'titulo': titulo, 'descricao': descricao})

        // Coloca a chave/valor no banco
        setBanco(banco)

        // SweetAlert2 ()
        Swal.fire({
            icon: 'success',
            text: 'Tarefa Adicionada!',
        });

        // Atualiza a tela
        atualizarTela()

        // Limpa o valor do evento da ultima tarefa digitada no input
        $("#titulo").val("");
        $("#descricao").val("");
    }

}

// REMOVER ITEM por indice
function excluirTarefa(indice) {

    //Alerta de Exclusao (SweetAlert2)
    Swal.fire({
        text: "Excluir Tarefa?",
        icon: 'question',
        cancelButtonText: 'Não',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
    }).then((result) => {
        if (result.value) {
            const banco = getBanco()

            // Faça um splice (corte) no seu (banco que eh um array) do indice, so uma posicao
            banco.splice (indice, 1)

            // Set do splice no seu banco, permitir a persistencia dos dados
            setBanco(banco)

            // Atualiza tela
            atualizarTela()
        }
    });
}

// Pegar o click de ADICIONAR tarefas
document.getElementById('ADICIONAR').addEventListener('click', inserirItem);

// Atualiza a tela assim que abre o APP
atualizarTela();
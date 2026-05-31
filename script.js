// PERGUNTAS DO QUIZ 
const perguntas = [
    {
        pergunta: 'Quanto é 7 x 8?',
        opcoes: ['54', '56', '63', '48'],
        correta: 1
    },
    {
        pergunta: 'Quanto é 6 x 9?',
        opcoes: ['54', '56', '63', '48'],
        correta: 0
    },
    {
        pergunta: 'Quanto é 15 + 27?',
        opcoes: ['42', '38', '44', '40'],
        correta: 0
    },
    {
        pergunta: 'Quanto é 48 ÷ 6?',
        opcoes: ['6', '7', '8', '9'],
        correta: 2
    },
    {
        pergunta: 'Quanto é 9 x 9?',
        opcoes: ['72', '81', '90', '63'],
        correta: 2
    }
]

// VARIÁVEIS DE CONTROLE
let perguntaAtual = 0
let pontuacao = 0
let nomeJogador = ''

// PEGANDO OS ELEMENTOS DO HTML
const telaInicio = document.getElementById('tela-inicio')
const telaQuiz = document.getElementById('tela-quiz')
const telaResultado = document.getElementById('tela-resultado')
const nomeInput = document.getElementById('nome-input')   
const btnIniciar = document.getElementById('btn-iniciar')
const saudacao = document.getElementById('saudacao')
const pontuacaoEl = document.getElementById('pontuacao')
const numeropergunta = document.getElementById('numero-pergunta')
const perguntaTexto = document.getElementById('pergunta-texto')
const opcoesBox = document.getElementById('opcoes-box')
const feedback = document.getElementById('feedback')
const barraPreenchimento = document.getElementById('barra-preenchimento')
const resultadoNome = document.getElementById('resultado-nome')
const resultadoPontos = document.getElementById('resultado-pontos')
const btnJogarNovamente = document.getElementById('btn-jogar-novamente')

// FUNÇÃO PARA INICIAR O QUIZ
btnIniciar.addEventListener('click', function() {
    nomeJogador = nomeInput.value.trim()

    if (nomeJogador === '') {
        alert('Coloca seu nome antes de começar! 🌸')
        return
    }

    telaInicio.classList.add('escondido')
    telaQuiz.classList.remove('escondido')
    saudacao.textContent = 'Olá, ' + nomeJogador + '! 🌸'

    mostrarPergunta()
})

// FUNÇÃO PARA MOSTRAR A PERGUNTA 
function mostrarPergunta() {
    const p = perguntas[perguntaAtual]

    numeropergunta.textContent = 'Pergunta ' + (perguntaAtual + 1) + ' de ' + perguntas.length
    perguntaTexto.textContent = p.pergunta

    // ATUALIZAR A BARRA DE PROGRESSO
    const progresso = (perguntaAtual / perguntas.length) * 100
    barraPreenchimento.style.width = progresso + '%'

    // LIMPAR OPÇÕES ANTERIORES
    opcoesBox.innerHTML = ''
    feedback.textContent = ''

    // CRIAR OS BOTÕES DE OPÇÃO
    p.opcoes.forEach(function(opcao, index) { 
        const btn = document.createElement('button')
        btn.classList.add('opcao')
        btn.textContent = opcao
        btn.addEventListener('click', function() {
            verificarResposta(index)
        })
        opcoesBox.appendChild(btn)
    })

}

// FUNÇÃO PARA VERIFICAR A RESPOSTA
function verificarResposta(indexEscolhido) {
    const p = perguntas[perguntaAtual]
    const botoes = opcoesBox.querySelectorAll('.opcao')

    // DESABILITAR TODOS OS BOTÕES
    botoes.forEach(function(btn) {
        btn.disabled = true
    })

    if (indexEscolhido === p.correta) {
        botoes[indexEscolhido].classList.add('correta')
        feedback.textContent = '✅ Correto! Muito bem, ' + nomeJogador + '!'
        feedback.style.color = '#28a745'
        pontuacao += 10
        pontuacaoEl.textContent = '⭐ ' + pontuacao + ' pontos'
    } else {
        botoes[indexEscolhido].classList.add('errada')
        botoes[p.correta].classList.add('correta')
        feedback.textContent = '❌ Quase! A resposta era: ' + p.opcoes[p.correta]
        feedback.style.color = '#dc3545'
    }

    // AGURDAR 2 SEGUNDOS E PASSA PARA A PRÓXIMA 
    setTimeout(function() {
        perguntaAtual++

        if (perguntaAtual <perguntas.length) {
            mostrarPergunta()
        
        } else {
            mostrarResultado()
        }
    }, 2000)
}

    // FUNÇÃO PARA MOSTRAR O RESULTADO 
    function mostrarResultado() {
        telaQuiz.classList.add('escondido')
        telaResultado.classList.remove('escondido')
        resultadoNome.textContent= nomeJogador + ', você foi Incrível! 🌸'
        resultadoPontos.textContent = 'Você fez ' + pontuacao + ' de ' + (perguntas.length * 10) + ' pontos!'
        barraPreenchimento.style.width = '100%'
    }

    // BOTÃO JOGAR NOVAMENTE
  btnJogarNovamente.addEventListener('click', function() {
    perguntaAtual = 0
    pontuacao = 0
    nomeJogador = ''
    nomeInput.value = ''
    telaResultado.classList.add('escondido')
    telaInicio.classList.remove('escondido')
    pontuacaoEl.textContent = '⭐ 0 pontos'
    barraPreenchimento.style.width = '0%'
})


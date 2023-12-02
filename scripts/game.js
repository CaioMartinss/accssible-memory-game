// Numero de tentativas
let attempts = 0
// Obter o nome do usuario pela URL
const queryString = window.location.search
const params = new URLSearchParams(queryString)

// Obter o valor do parâmetro 'name' (nome do usuário)
const userName = params.get('name')

// Função para criar ou obter o cookie
function getUserLocalStorage(key) {
  return localStorage.getItem(key)
}

// Função para definir um cookie
function setUserLocalStorage(key, data) {
  localStorage.setItem(key, data)
}

function createUser() {
  const existingUser = getUserLocalStorage('user')

  if (!existingUser) {
    const user = {
      name: userName,
      score: 0
    }

    axios
      .post(`http://localhost:3006/user`, user)
      .then(response => {
        const user = response.data
        setUserLocalStorage('user', JSON.stringify(user))
        console.log(`usuario salvo, id: ${user._id}`)
      })
      .catch(error => {
        console.log(error)
      })
  }
}

function updateUser(score) {
  const existingUser = getUserLocalStorage('user')
  if (existingUser) {
    let user = JSON.parse(existingUser)
    user.score = score
    axios
      .put(`http://localhost:3006/user/${user._id}`, user)
      .then(response => {
        const updatedUser = response.data
        if (updatedUser.length === 0) {
          console.log('Não foi obtida resposta da api')
        } else {
          setUserLocalStorage('user', JSON.stringify(updatedUser))
          console.log(`Score do usuario atualizado: ${updatedUser.score}`)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}

// script.js
document.addEventListener('DOMContentLoaded', () => {
  const memoryGame = document.getElementById('memoryGame')
  const cardImages = [
    '../assets/coracao.svg',
    '../assets/fantasma.svg',
    '../assets/dragao.svg',
    '../assets/gamepad.svg',
    '../assets/caveira.svg',
    '../assets/tabuleiro_de_xadrez.svg',
    '../assets/quadrado.svg',
    '../assets/chapeu_de_mago.svg'
  ] // Pares de valores para as cartas

  // Duplica os valores para criar pares
  const allCardImages = cardImages.concat(cardImages)

  let pairsFound = 0 // Contador de pares encontrados

  // Função para embaralhar as cartas
  const shuffleCards = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  // Função para criar as cartas e adicioná-las ao DOM
  const createCards = () => {
    shuffleCards(allCardImages)

    allCardImages.forEach((imagePath, index) => {
      const card = document.createElement('div')
      const cardImage = document.createElement('img')
      card.className = 'card'
      card.dataset.value = imagePath
      card.dataset.index = index
      cardImage.src = '../assets/carta_virada.svg' // Imagem da parte de trás da carta
      cardImage.alt = 'Card Back' // Texto alternativo para a imagem da parte de trás
      card.appendChild(cardImage)
      card.addEventListener('click', flipCard)
      memoryGame.appendChild(card)
    })

    // Mostra todas as cartas por um tempo para memorização
    setTimeout(() => {
      const allCards = document.querySelectorAll('.card')
      allCards.forEach(card => {
        const cardImage = card.querySelector('img')
        cardImage.src = card.dataset.value
        setTimeout(() => {
          cardImage.src = '../assets/carta_virada.svg'
        }, 3000) // 3 segundos para memorização
      })
    }, 300)
  }

  // Adiciona a lógica para virar as cartas
  let flippedCards = []
  const flipCard = event => {
    const selectedCard = event.currentTarget
    const cardImage = selectedCard.querySelector('img')

    if (flippedCards.length < 2 && !flippedCards.includes(selectedCard)) {
      cardImage.src = selectedCard.dataset.value
      flippedCards.push(selectedCard)

      if (flippedCards.length === 2) {
        attempts++ // Incrementa o número de tentativas após dois cliques
        setTimeout(checkMatch, 500)
      }
    }
  }

  // Verifica se as cartas viradas formam um par
  const checkMatch = () => {
    const [card1, card2] = flippedCards

    if (card1.dataset.value === card2.dataset.value) {
      // Cartas formam um par
      card1.removeEventListener('click', flipCard)
      card2.removeEventListener('click', flipCard)
      pairsFound++
      checkWin()
    } else {
      // Cartas não formam um par, vira de volta
      const card1Image = card1.querySelector('img')
      const card2Image = card2.querySelector('img')
      card1Image.src = '../assets/carta_virada.svg'
      card2Image.src = '../assets/carta_virada.svg'
    }

    flippedCards = [] // Limpa as cartas viradas
  }

  // Calcula a pontuação do jogador
  const calculateScore = (attempts, maxAttempts) => {
    const maxScore = 1500 // Pontuação máxima por partida
    const score = Math.max(0, maxScore - (attempts / maxAttempts) * maxScore)
    return Math.round(score)
  }

  // Verifica se todas as cartas foram encontradas
  const checkWin = () => {
    if (pairsFound === cardImages.length) {
      const maxAttempts = cardImages.length * 2 // Número máximo de tentativas possíveis
      const score = calculateScore(attempts, maxAttempts)
      showSuccessMessage(score)
      updateUser(score)
    }
  }

  const showSuccessMessage = () => {
    const successMessage = document.querySelector('.success-message')
    successMessage.classList.toggle('hidden', pairsFound !== cardImages.length)
  }

  const checkUser = () => {
    createUser() // Chama a função para criar o usuário
  }

  checkUser() // Chama a verificação ao carregar a página
  createCards() // Inicia o jogo ao carregar a página
})

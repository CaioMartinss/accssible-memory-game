// script.js
document.addEventListener('DOMContentLoaded', () => {
  const memoryGame = document.getElementById('memoryGame')
  const cardImages = [
    '../accssible-memory-game/assets/coracao.svg',
    '../accssible-memory-game/assets/fantasma.svg',
    '../accssible-memory-game/assets/dragao.svg',
    '../accssible-memory-game/assets/gamepad.svg',
    '../accssible-memory-game/assets/caveira.svg',
    '../accssible-memory-game/assets/tabuleiro_de_xadrez.svg',
    '../accssible-memory-game/assets/quadrado.svg',
    '../accssible-memory-game/assets/chapeu_de_mago.svg'
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
      cardImage.src = '../accssible-memory-game/assets/carta_virada.svg' // Imagem da parte de trás da carta
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
          cardImage.src = '../accssible-memory-game/assets/carta_virada.svg'
        }, 3000) // 3 segundos para memorização
      })
    }, 300)
  }

  // Adiciona a lógica para virar as cartas
  let flippedCards = []
  const flipCard = event => {
    const selectedCard = event.currentTarget
    const cardImage = selectedCard.querySelector('img')

    // Evita clicar na mesma carta ou cartas já viradas
    if (flippedCards.length < 2 && !flippedCards.includes(selectedCard)) {
      cardImage.src = selectedCard.dataset.value // Mostra a imagem
      flippedCards.push(selectedCard)

      if (flippedCards.length === 2) {
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
      card1Image.src = '../accssible-memory-game/assets/carta_virada.svg'
      card2Image.src = '../accssible-memory-game/assets/carta_virada.svg'
    }

    flippedCards = [] // Limpa as cartas viradas
  }

  // Verifica se todas as cartas foram encontradas
  const checkWin = () => {
    if (pairsFound === cardImages.length) {
      showSuccessMessage()
    }
  }

  const showSuccessMessage = () => {
    const successMessage = document.querySelector('.success-message')
    successMessage.classList.toggle('hidden', pairsFound !== cardImages.length)
  }

  createCards() // Inicia o jogo ao carregar a página
})

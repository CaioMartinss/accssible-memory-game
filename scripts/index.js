// Função para obter dados do localStorage
function getUserLocalStorage(key) {
  return localStorage.getItem(key)
}

// Função para verificar e remover o usuário do localStorage
function checkUser() {
  const existingUser = getUserLocalStorage('user')
  if (existingUser) {
    localStorage.removeItem('user')
  }
}

// Chama a função para verificar o usuário ao carregar a página
checkUser()

// Função para iniciar o jogo
function startGame(playerName) {
  if (playerName.trim() !== '') {
    // Redireciona para a página do jogo com o nome do jogador
    window.location.href = `../../accssible-memory-game/pages/game.html?name=${encodeURIComponent(
      playerName
    )}`
  } else {
    // Exibe um alerta com SweetAlert2 se o nome estiver em branco
    Swal.fire({
      title: 'Atenção',
      text: 'Por favor, digite seu nome para começar o jogo.',
      icon: 'warning',
      confirmButtonColor: '#000'
    })
  }
}

// Função para tocar os sons
function playClickSong() {
  const audioClique = document.getElementById('audioClique')
  audioClique.play()
}

// index.js
document.addEventListener('DOMContentLoaded', () => {
  const playerNameInput = document.getElementById('playerName')
  const startButton = document.querySelector('button')
  const rankingTableBody = document.querySelector('#rankingTable tbody')
  const tutorialButton = document.getElementsByTagName('button')

  // Adiciona um ouvinte de evento de clique ao botão de início
  startButton.addEventListener('click', () => {
    playClickSong()
    startGame(playerNameInput.value)
  })

  // Função para renderizar o ranking
  function renderRanking(users) {
    rankingTableBody.innerHTML = ''
    users
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .forEach((user, index) => {
        const row = document.createElement('tr')
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${user.name}</td>
          <td>${user.score}</td>
        `
        rankingTableBody.appendChild(row)
      })
  }

  // Função para carregar o ranking
  function loadRanking() {
    axios
      .get('http://localhost:3006/user')
      .then(response => {
        const users = response.data
        console.log(users)
        renderRanking(users)
      })
      .catch(error => {
        console.error('Erro ao carregar o ranking:', error)
      })
  }

  // Inicia o carregamento do ranking ao carregar a página
  loadRanking()
})

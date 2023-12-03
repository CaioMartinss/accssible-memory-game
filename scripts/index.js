// index.js
document.addEventListener('DOMContentLoaded', () => {
  const playerNameInput = document.getElementById('playerName')
  const startButton = document.querySelector('button')
  const rankingTableBody = document.querySelector('#rankingTable tbody')

  startButton.addEventListener('click', () => startGame(playerNameInput.value))

  function startGame(playerName) {
    if (playerName.trim() !== '') {
      // Redireciona para a página do jogo com o nome do jogador
      window.location.href = `../../accssible-memory-game/pages/game.html?name=${encodeURIComponent(
        playerName
      )}`
    } else {
      alert('Digite seu nome para começar!')
    }
  }

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

  function loadRanking() {
    axios.get('http://localhost:3006/user').then(response => {
      const users = response.data
      console.log(users)
      renderRanking(users)
    })
  }

  loadRanking()
})

function getUserLocalStorage(key) {
  return localStorage.getItem(key)
}
function checkUser() {
  const existingUser = getUserLocalStorage('user')
  if (existingUser) {
    localStorage.removeItem('user')
  }
}

checkUser()

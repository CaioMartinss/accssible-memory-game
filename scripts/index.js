axios
  .get('http://192.168.1.8:3006/')
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.log(error)
  })
// welcome.js
function startGame() {
  const playerNameInput = document.getElementById('playerName')
  const playerName = playerNameInput.value

  if (playerName.trim() !== '') {
    // Redireciona para a página do jogo com o nome do jogador
    window.location.href = `../../accssible-memory-game/pages/game.html?name=${encodeURIComponent(
      playerName
    )}`
  }
}

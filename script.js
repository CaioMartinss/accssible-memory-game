const cardImages = [
    'image1.jpg',
    'image2.jpg',
    'image3.jpg',
    'image4.jpg',
    'image5.jpg',
    'image6.jpg',
    'image7.jpg',
    'image8.jpg',
  ];
  
  const generateCards = () => {
    const cards = [...cardImages, ...cardImages];
    cards.sort(() => Math.random() - 0.5);
    return cards;
  };
  
  const createCardElement = (image) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.style.backgroundImage = `url(${image})`;
    card.addEventListener('click', () => flipCard(card, image));
    return card;
  };
  
  const initializeGame = () => {
    const memoryGame = document.getElementById('memoryGame');
    const cards = generateCards();
  
    cards.forEach((image) => {
      const card = createCardElement(image);
      memoryGame.appendChild(card);
    });
  };
  
  let flippedCards = [];
  let matchedPairs = 0;
  
  const flipCard = (card, image) => {
    if (!flippedCards.includes(card) && flippedCards.length < 2) {
      card.classList.add('flipped');
      flippedCards.push({ card, image });
  
      if (flippedCards.length === 2) {
        setTimeout(() => checkMatch(), 500);
      }
    }
  };
  
  const checkMatch = () => {
    const [card1, card2] = flippedCards;
  
    if (card1.image === card2.image) {
      card1.card.classList.add('matched');
      card2.card.classList.add('matched');
      matchedPairs++;
  
      if (matchedPairs === cardImages.length) {
        alert('Parabéns! Você completou o jogo!');
      }
    } else {
      card1.card.classList.remove('flipped');
      card2.card.classList.remove('flipped');
    }
  
    flippedCards = [];
  };
  
  initializeGame();
  
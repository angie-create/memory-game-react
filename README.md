# Frontend Mentor - Memory Game Solution

![Memory Game Screenshot](./preview.jpg)

This is a solution to the [Memory game challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/memory-game-vse4WFPvM). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the game depending on their device's screen size
- See hover states for all interactive elements on the page
- Play the Memory game either solo or multiplayer (up to 4 players)
- Set the theme to use numbers or icons within the tiles
- Choose to play on either a 6x6 or 4x4 grid
- Complete the game and see a results modal showing their performance
- Restart the game or start a new game with different settings


### Links

- Solution URL: [GitHub Repository](https://github.com/yourusername/memory-game-react)
- Live Site URL: [Live Demo](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- CSS Grid and Flexbox
- Mobile-first workflow
- [React](https://reactjs.org/) - JS library
- [Vite](https://vitejs.dev/) - Build tool
- [React Router](https://reactrouter.com/) - For navigation
- [Font Awesome](https://fontawesome.com/) - For icon theme
- Context API for state management

### What I learned

This project was an excellent opportunity to practice complex state management in React and create a fully functional game. Some key learnings include:

**Game State Management with Context API:**
```jsx
const gameReducer = (state, action) => {
  switch (action.type) {
    case 'FLIP_CARD':
      // Handle card flipping logic
    case 'CHECK_MATCH':
      // Handle match checking and scoring
    case 'START_NEW_GAME':
      // Initialize new game state
    default:
      return state;
  }
};
```

**Responsive Design Patterns:**
```css
.players-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-md);
}

@media (max-width: 480px) {
  .player-card {
    flex-direction: column;
    min-width: 64px;
    min-height: 70px;
  }
}
```

**Dynamic Icon Integration:**
```jsx
const getCardContent = () => {
  if (!card.isFlipped && !card.isMatched) return '';

  if (typeof card.value === 'object' && card.value.iconName) {
    return <FontAwesomeIcon icon={card.value} className="card__icon" />;
  }

  return card.value;
};
```

Key challenges solved:
- Implementing game logic for both single and multiplayer modes
- Managing timer functionality for solo games
- Creating smooth card flip animations with CSS transforms
- Implementing proper turn-based gameplay mechanics


### Useful resources

- [React Context API Documentation](https://reactjs.org/docs/context.html) - Essential for understanding global state management
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/) - Helped with responsive grid layouts
- [Font Awesome React Documentation](https://fontawesome.com/docs/web/use-with/react/) - For implementing the icon theme
- [Vite Documentation](https://vitejs.dev/guide/) - For understanding the build process and development setup

## Author

- Frontend Mentor - [@angie-create](https://www.frontendmentor.io/profile/angie-create)
- GitHub - [@angie-create](https://github.com/angie-create)


import { createContext, useContext, useReducer } from 'react';
import {
  faAnchor,
  faBicycle,
  faBolt,
  faBug,
  faCar,
  faCoffee,
  faGem,
  faHeart,
  faLeaf,
  faLightbulb,
  faMoon,
  faMusic,
  faPaw,
  faRocket,
  faStar,
  faSun,
  faTree,
  faWater
} from '@fortawesome/free-solid-svg-icons';

const GameContext = createContext();

const initialState = {
  gameSettings: {
    theme: 'numbers', // 'numbers' or 'icons'
    playerCount: 1,
    gridSize: '4x4' // '4x4' or '6x6'
  },
  gameState: {
    board: [],
    flippedCards: [],
    matchedPairs: [],
    currentPlayer: 0,
    players: [],
    timer: 0,
    moves: 0,
    isGameStarted: false,
    isGameEnded: false
  }
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GAME_SETTINGS':
      return {
        ...state,
        gameSettings: { ...state.gameSettings, ...action.payload }
      };

    case 'START_NEW_GAME':
      const { theme, playerCount, gridSize } = state.gameSettings;
      const totalCards = gridSize === '4x4' ? 16 : 36;
      const pairCount = totalCards / 2;

      // Define available Font Awesome icons
      const icons = [
        faAnchor, faBicycle, faBolt, faBug, faCar, faCoffee, faGem, faHeart,
        faLeaf, faLightbulb, faMoon, faMusic, faPaw, faRocket, faStar, faSun, faTree, faWater
      ];

      // Create pairs of cards
      const cards = [];
      for (let i = 1; i <= pairCount; i++) {
        const cardValue = theme === 'icons' ? icons[i - 1] : i;
        cards.push({ id: `${i}-1`, value: cardValue, isFlipped: false, isMatched: false });
        cards.push({ id: `${i}-2`, value: cardValue, isFlipped: false, isMatched: false });
      }

      // Shuffle cards
      const shuffledCards = cards.sort(() => Math.random() - 0.5);

      // Initialize players
      const players = Array.from({ length: playerCount }, (_, i) => ({
        id: i,
        name: `Player ${i + 1}`,
        score: 0,
        isActive: i === 0
      }));

      return {
        ...state,
        gameState: {
          ...initialState.gameState,
          board: shuffledCards,
          players,
          isGameStarted: true
        }
      };

    case 'FLIP_CARD':
      const { cardId } = action.payload;
      const updatedBoard = state.gameState.board.map(card =>
        card.id === cardId ? { ...card, isFlipped: true } : card
      );

      return {
        ...state,
        gameState: {
          ...state.gameState,
          board: updatedBoard,
          flippedCards: [...state.gameState.flippedCards, cardId]
        }
      };

    case 'CHECK_MATCH':
      const flippedCards = state.gameState.flippedCards;
      if (flippedCards.length !== 2) return state;

      const [card1Id, card2Id] = flippedCards;
      const card1 = state.gameState.board.find(c => c.id === card1Id);
      const card2 = state.gameState.board.find(c => c.id === card2Id);

      const isMatch = card1.value === card2.value;

      if (isMatch) {
        const newBoard = state.gameState.board.map(card =>
          card.id === card1Id || card.id === card2Id
            ? { ...card, isMatched: true }
            : card
        );

        const updatedPlayers = state.gameState.players.map(player =>
          player.id === state.gameState.currentPlayer
            ? { ...player, score: player.score + 1 }
            : player
        );

        const newMatchedPairs = [...state.gameState.matchedPairs, card1.value];
        const totalPairs = state.gameSettings.gridSize === '4x4' ? 8 : 18;
        const isGameEnded = newMatchedPairs.length === totalPairs;

        return {
          ...state,
          gameState: {
            ...state.gameState,
            board: newBoard,
            flippedCards: [],
            matchedPairs: newMatchedPairs,
            players: updatedPlayers,
            moves: state.gameState.moves + 1,
            isGameEnded
          }
        };
      } else {
        const newBoard = state.gameState.board.map(card =>
          card.id === card1Id || card.id === card2Id
            ? { ...card, isFlipped: false }
            : card
        );

        const nextPlayer = state.gameSettings.playerCount > 1
          ? (state.gameState.currentPlayer + 1) % state.gameSettings.playerCount
          : state.gameState.currentPlayer;

        const updatedPlayers = state.gameState.players.map(player => ({
          ...player,
          isActive: player.id === nextPlayer
        }));

        return {
          ...state,
          gameState: {
            ...state.gameState,
            board: newBoard,
            flippedCards: [],
            currentPlayer: nextPlayer,
            players: updatedPlayers,
            moves: state.gameState.moves + 1
          }
        };
      }

    case 'UPDATE_TIMER':
      return {
        ...state,
        gameState: {
          ...state.gameState,
          timer: state.gameState.timer + 1
        }
      };

    case 'RESET_GAME':
      return {
        ...state,
        gameState: {
          ...initialState.gameState
        }
      };

    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const value = {
    ...state,
    dispatch
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameContext;
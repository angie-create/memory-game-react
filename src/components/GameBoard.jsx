import { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import Card from './Card';
import GameEndModal from './GameEndModal';
import './GameBoard.css';

const GameBoard = () => {
  const { gameState, gameSettings, dispatch } = useGame();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let timer;
    if (gameState.isGameStarted && !gameState.isGameEnded && gameSettings.playerCount === 1) {
      timer = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER' });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState.isGameStarted, gameState.isGameEnded, gameSettings.playerCount, dispatch]);

  useEffect(() => {
    if (gameState.flippedCards.length === 2) {
      const timeout = setTimeout(() => {
        dispatch({ type: 'CHECK_MATCH' });
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [gameState.flippedCards, dispatch]);

  const handleCardClick = (cardId) => {
    if (gameState.flippedCards.length >= 2) return;
    dispatch({ type: 'FLIP_CARD', payload: { cardId } });
  };

  const isCardDisabled = gameState.flippedCards.length >= 2;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPlayerName = (player) => {
    if (isMobile) {
      return `P${player.id + 1}`;
    }
    return player.name;
  };

  const gridClass = gameSettings.gridSize === '4x4' ? 'game-board__grid--4x4' : 'game-board__grid--6x6';

  return (
    <div className="game-board">
      <div className={`game-board__grid ${gridClass}`}>
        {gameState.board.map((card) => (
          <Card
            key={card.id}
            card={card}
            onCardClick={handleCardClick}
            isDisabled={isCardDisabled}
          />
        ))}
      </div>

      {/* Solo player stats */}
      {gameSettings.playerCount === 1 && (
        <div className="game-stats">
          <div className="stat-card">
            <div className="stat-card__label">Time</div>
            <div className="stat-card__value">{formatTime(gameState.timer)}</div>
          </div>
          <div className="stat-card">
            <div className="stat-card__label">Moves</div>
            <div className="stat-card__value">{gameState.moves}</div>
          </div>
        </div>
      )}

      {/* Multiplayer stats */}
      {gameSettings.playerCount > 1 && (
        <div className="players-stats">
          {gameState.players.map((player) => (
            <div key={player.id} className="player-container">
              <div
                className={`player-card ${player.isActive ? 'player-card--active' : ''}`}
              >
                <div className="player-card__name">{getPlayerName(player)}</div>
                <div className="player-card__score">{player.score}</div>
              </div>
              {player.isActive && (
                <div className="current-turn-indicator">
                  CURRENT TURN
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Game End Modal */}
      <GameEndModal />
    </div>
  );
};

export default GameBoard;
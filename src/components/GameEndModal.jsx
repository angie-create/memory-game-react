import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import './GameEndModal.css';

const GameEndModal = () => {
  const { gameState, gameSettings, dispatch } = useGame();
  const navigate = useNavigate();

  if (!gameState.isGameEnded) return null;

  const handleRestart = () => {
    dispatch({ type: 'START_NEW_GAME' });
  };

  const handleNewGame = () => {
    dispatch({ type: 'RESET_GAME' });
    navigate('/');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSortedPlayers = () => {
    return [...gameState.players].sort((a, b) => b.score - a.score);
  };

  const getWinnerText = () => {
    if (gameSettings.playerCount === 1) {
      return "You did it!";
    }

    const sortedPlayers = getSortedPlayers();
    const topScore = sortedPlayers[0].score;
    const winners = sortedPlayers.filter(player => player.score === topScore);

    if (winners.length > 1) {
      return "It's a tie!";
    } else {
      return `${winners[0].name} Wins!`;
    }
  };

  const renderSinglePlayerStats = () => (
    <div className="game-end-modal__stats">
      <div className="stat-item">
        <span className="stat-item__label">Time Elapsed</span>
        <span className="stat-item__value">{formatTime(gameState.timer)}</span>
      </div>
      <div className="stat-item">
        <span className="stat-item__label">Moves Taken</span>
        <span className="stat-item__value">{gameState.moves} Moves</span>
      </div>
    </div>
  );

  const renderMultiPlayerStats = () => {
    const sortedPlayers = getSortedPlayers();

    return (
      <div className="game-end-modal__stats">
        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className={`player-result ${index === 0 ? 'player-result--winner' : ''}`}
          >
            <span className="player-result__name">
              {player.name} {index === 0 && sortedPlayers[0].score > sortedPlayers[1]?.score ? '(Winner!)' : ''}
            </span>
            <span className="player-result__score">{player.score} Pairs</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="game-end-modal__overlay">
      <div className="game-end-modal">
        <h2 className="game-end-modal__title">{getWinnerText()}</h2>
        <p className="game-end-modal__subtitle">
          Game over! Here are the results...
        </p>

        {gameSettings.playerCount === 1
          ? renderSinglePlayerStats()
          : renderMultiPlayerStats()
        }

        <div className="game-end-modal__actions">
          <Button variant="primary" onClick={handleRestart}>
            Restart
          </Button>
          <Button variant="secondary" onClick={handleNewGame}>
            Setup New Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameEndModal;
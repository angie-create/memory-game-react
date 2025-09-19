import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import Button from './Button';
import './GameHeader.css';

const GameHeader = () => {
  const navigate = useNavigate();
  const { dispatch } = useGame();

  const handleRestart = () => {
    dispatch({ type: 'START_NEW_GAME' });
  };

  const handleNewGame = () => {
    dispatch({ type: 'RESET_GAME' });
    navigate('/');
  };

  return (
    <div className="game-header">
      <h1 className="game-header__title">memory</h1>
      <div className="game-header__actions">
        <Button variant="primary" size="small" onClick={handleRestart}>
          Restart
        </Button>
        <Button variant="secondary" size="small" onClick={handleNewGame}>
          New Game
        </Button>
      </div>
    </div>
  );
};

export default GameHeader;
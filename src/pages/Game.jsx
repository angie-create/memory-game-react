import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import Layout from '../components/Layout';
import GameHeader from '../components/GameHeader';
import GameBoard from '../components/GameBoard';
import './Game.css';

const Game = () => {
  const navigate = useNavigate();
  const { gameState } = useGame();

  useEffect(() => {
    if (!gameState.isGameStarted) {
      navigate('/');
    }
  }, [gameState.isGameStarted, navigate]);

  if (!gameState.isGameStarted) {
    return null;
  }

  return (
    <Layout>
      <div className="game">
        <GameHeader />
        <GameBoard />
      </div>
    </Layout>
  );
};

export default Game;
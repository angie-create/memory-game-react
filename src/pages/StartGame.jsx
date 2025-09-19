import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';
import Button from '../components/Button';
import Layout from '../components/Layout';
import './StartGame.css';

const StartGame = () => {
  const navigate = useNavigate();
  const { gameSettings, dispatch } = useGame();

  const [settings, setSettings] = useState(gameSettings);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleStartGame = () => {
    dispatch({
      type: 'SET_GAME_SETTINGS',
      payload: settings
    });

    dispatch({ type: 'START_NEW_GAME' });
    navigate('/game');
  };

  return (
    <div className="start-game-layout">
      <Layout>
        <div className="start-game">
          <h1 className="start-game__title">memory</h1>

        <div className="start-game__panel">
          {/* Theme Selection */}
          <div className="setting-group">
            <h2 className="setting-group__title">Select Theme</h2>
            <div className="setting-group__options">
              <Button
                variant={settings.theme === 'numbers' ? 'selected' : 'secondary'}
                onClick={() => handleSettingChange('theme', 'numbers')}
              >
                Numbers
              </Button>
              <Button
                variant={settings.theme === 'icons' ? 'selected' : 'secondary'}
                onClick={() => handleSettingChange('theme', 'icons')}
              >
                Icons
              </Button>
            </div>
          </div>

          {/* Player Count Selection */}
          <div className="setting-group">
            <h2 className="setting-group__title">Number of Players</h2>
            <div className="setting-group__options setting-group__options--four">
              {[1, 2, 3, 4].map(count => (
                <Button
                  key={count}
                  variant={settings.playerCount === count ? 'selected' : 'secondary'}
                  onClick={() => handleSettingChange('playerCount', count)}
                >
                  {count}
                </Button>
              ))}
            </div>
          </div>

          {/* Grid Size Selection */}
          <div className="setting-group">
            <h2 className="setting-group__title">Grid Size</h2>
            <div className="setting-group__options">
              <Button
                variant={settings.gridSize === '4x4' ? 'selected' : 'secondary'}
                onClick={() => handleSettingChange('gridSize', '4x4')}
              >
                4x4
              </Button>
              <Button
                variant={settings.gridSize === '6x6' ? 'selected' : 'secondary'}
                onClick={() => handleSettingChange('gridSize', '6x6')}
              >
                6x6
              </Button>
            </div>
          </div>

          {/* Start Game Button */}
          <Button
            variant="primary"
            size="large"
            onClick={handleStartGame}
            className="start-game__button"
          >
            Start Game
          </Button>
        </div>
        </div>
      </Layout>
    </div>
  );
};

export default StartGame;
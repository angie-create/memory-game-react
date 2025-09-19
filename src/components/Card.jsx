import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Card.css';

const Card = ({ card, onCardClick, isDisabled }) => {
  const handleClick = () => {
    if (isDisabled || card.isFlipped || card.isMatched) return;
    onCardClick(card.id);
  };

  const getCardContent = () => {
    if (!card.isFlipped && !card.isMatched) return '';

    // If it's a Font Awesome icon object, render it with FontAwesome
    if (typeof card.value === 'object' && card.value.iconName) {
      return <FontAwesomeIcon icon={card.value} className="card__icon" />;
    }

    // Otherwise, render as text (numbers)
    return card.value;
  };

  return (
    <div
      className={`card ${card.isFlipped || card.isMatched ? 'card--flipped' : ''} ${
        card.isMatched ? 'card--matched' : ''
      } ${isDisabled ? 'card--disabled' : ''}`}
      onClick={handleClick}
    >
      <div className="card__inner">
        <div className="card__front"></div>
        <div className="card__back">
          {getCardContent()}
        </div>
      </div>
    </div>
  );
};

export default Card;
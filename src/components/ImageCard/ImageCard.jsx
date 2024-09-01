import css from './ImageCard.module.css';

const ImageCard = ({ smallUrl, bigUrl, description, onImageClick }) => {
  return (
    <div className={css.card}>
      <img
        className={css.img}
        src={smallUrl}
        alt={description}
        onClick={() => {
          onImageClick({ bigUrl, description });
        }}
      />
    </div>
  );
};

export default ImageCard;
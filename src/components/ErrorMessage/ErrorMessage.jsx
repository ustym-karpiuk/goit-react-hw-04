import css from './ErrorMessage.module.css';

const ErrorMessage = ({ message }) => {
  return <p className={css.error}>{message}</p>;
};

export default ErrorMessage;
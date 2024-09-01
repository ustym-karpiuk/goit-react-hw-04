import toast, { Toaster } from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';

import css from './SearchBar.module.css';

const notify = () => toast('Please enter a search term!');
const toastOptions = {
  duration: 2500,
  style: {
    background: '#000000',
    color: '#ffffff',
  },
};

const SearchBar = ({ onSubmit }) => {
  const handleSubmit = e => {
    e.preventDefault();
    const newQuery = e.target.elements.query.value.trim();
    newQuery === '' ? notify() : onSubmit(newQuery);
    e.target.reset();
  };

  return (
    <header className={css.header}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.input}
        />
        <button type="submit" className={css.btn}>
          <FaSearch size="23" />
        </button>
      </form>
      <Toaster toastOptions={toastOptions} position="top-left" />
    </header>
  );
};

export default SearchBar;
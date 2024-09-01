import { useState, useEffect, useRef } from 'react';

import SearchBar from '../SearchBar/SearchBar';
import Loader from '../Loader/Loader';
import LoadMoreBtn from '../LoadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import fetchPhotoSearch from '../../api/unsplash-api';
import ImageGallery from '../ImageGallery/ImageGallery';
import ImageModal from '../ImageModal/ImageModal';

import css from './App.module.css';

const App = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(false);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [selectedImg, setSelectedImg] = useState('');
  const [description, setDescription] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const contentRef = useRef();

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchPhotoSearch(searchQuery, page);
        setError(!data.total_pages);
        setErrorText('No search results found ...');
        setTotalPage(page < data.total_pages);
        setImages(prevImages => [...prevImages, ...data.results]);
      } catch (error) {
        setError(true);
        setErrorText('Oops! Something went wrong! Reload!');
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [searchQuery, page]);

  useEffect(() => {
    if (page === 1) {
      return;
    }

    contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [page, images]);

  const handleSearch = newQuery => {
    setSearchQuery(newQuery);
    setPage(1);
    setImages([]);
  };

  const handleMore = () => {
    setPage(page + 1);
  };

  const handleModalOpen = ({ bigUrl, description }) => {
    setSelectedImg(bigUrl);
    setDescription(description);
    setModalIsOpen(true);
  };

  const handleModalClose = () => {
    setSelectedImg('');
    setDescription('');
    setModalIsOpen(false);
  };

  return (
    <div ref={contentRef} className={css.container}>
      <SearchBar onSubmit={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleModalOpen} />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage message={errorText} />}
      {images.length > 0 && totalPage && !isLoading && (
        <LoadMoreBtn onClick={handleMore} />
      )}
      <ImageModal
        bigUrl={selectedImg}
        isOpen={modalIsOpen}
        description={description}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default App;
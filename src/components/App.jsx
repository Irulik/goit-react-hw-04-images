import React, { useState, useEffect } from 'react';
import Searchbar from './searchbar/Searchbar';
import { fetchImages } from './api/fetchimages';
import ImageGallery from './imageGallery/ImageGallery';
import Button from './button/Button';
import Loader from './loader/Loader';
import Modal from './modal/Modal';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');
  const [pageNr, setPageNr] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [hasMoreImages, setHasMoreImages] = useState(true);

  useEffect(() => {
    if (images.length > 0 && images.length >= 12) {
      setHasMoreImages(true);
    } else {
      setHasMoreImages(false);
    }
  }, [images]);

  useEffect(() => {
    if (currentSearch !== '') {
      fetchImagesData(currentSearch, 1);
    }
  }, [currentSearch]);

  const fetchImagesData = async (searchQuery, pageNum) => {
    setIsLoading(true);
    const response = await fetchImages(searchQuery, pageNum);
    setIsLoading(false);
    
    if (pageNum === 1) {
      setImages(response);
    } else {
      setImages(prevImages => [...prevImages, ...response]);
    }
    setPageNr(pageNum);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const inputForSearch = e.target.elements.inputForSearch;
    if (inputForSearch.value.trim() === '') {
      return;
    }
    setCurrentSearch(inputForSearch.value);
    fetchImagesData(inputForSearch.value, 1);
  };

  const handleClickMore = async () => {
    fetchImagesData(currentSearch, pageNr + 1);
  };

  const handleImageClick = e => {
    setModalOpen(true);
    setModalAlt(e.target.alt);
    setModalImg(e.target.name);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalImg('');
    setModalAlt('');
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Searchbar onSubmit={handleSubmit} />
          <ImageGallery
            onImageClick={handleImageClick}
            images={images}
          />
          {images.length > 0 && images.length >= 12 && hasMoreImages ? (
            <Button onClick={handleClickMore} />
          ) : null}
        </>
      )}
      {modalOpen && (
        <Modal
          src={modalImg}
          alt={modalAlt}
          handleClose={handleModalClose}
        />
      )}
    </div>
  );
}

export default App;
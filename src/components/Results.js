import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import StackGrid from 'react-stack-grid';
import NasaApod from '../api/nasa-apod';
import Skeleton from '@mui/material/Skeleton';
import Modal from 'react-modal';
import disableScroll from 'disable-scroll';
import Heart from '../../src/img/heart-white.png';
import HeartRed from '../../src/img/heart-red.png';
import NoLikesImg from '../../src/img/no-likes.png';
import NoLikesImgDark from '../../src/img/no-likes-dark.png';
import 'react-loading-skeleton/dist/skeleton.css';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 120px 0 144px 0;
  background-color: rgba(0,0,0,0);
  @media (max-width: 1280px){
    margin: 64px 0;
  }
`;

const ImageResult = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const ImageMedium = styled.div`
  width: 300px;
  height: 400px;
  background-color: grey;
  border-radius: 24px;
  background-image: ${props => props.backgroundImg};
  background-repeat:no-repeat;
  background-position: center center;
  background-size: cover; 
`;

const ImageSmall = styled(ImageMedium)`
  height: 240px;
`;

const ImageLarge = styled(ImageMedium)`
  height: 540px;
`;

const ImageName = styled.p`
  font-size: 18px;
  color: ${props => props.color ? '#fff' : '#101010'};
  font-weight: 700;
  margin: 16px 0 0 0;
  line-height: 1.5em;
  width: 300px;
  @media (max-width: 1280px){
    width: 100%;
    font-size: 16px;
  }
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: ${props => props.darkMode ? '#fff' : 'rgba(0,0,0,0)'};
  width: 100%;
`;

const ImageExpanded = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  background-image: ${props => 'url("' + props.backgroundImg + '")'};
  background-repeat:no-repeat;
  background-position: center center;
  background-size: cover;
  padding: 0 72px 0 0;
  @media (max-width: 960px){
    padding: 0 0 64px 0;
  }
`;

const ImageDescDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: center;
  background-color: #fff;
  padding: 78px 36px 42px 36px;
  @media (max-width: 1280px){
    padding: 24px;
  }
  @media (max-width: 768px){
    justify-content: space-between;
  }
`;

const ImageDesc = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageTitle = styled.p`
  font-size: 30px;
  font-weight: 700;
  color: #101010;
  margin: 0 0 16px 0;
  @media (max-width: 1280px){
    font-size: 24px;
  }
`;

const ImageDate = styled.p`
  font-size: 18px;
  font-weight: 700;
  color: #6c6c6c;
  margin: 0 0 36px 0;
  @media (max-width: 1280px){
    font-size: 16px;
  }
  @media (max-width: 768px){
    margin: 0;
  }
`;

const ImageDescText = styled.p`
  font-size: 16px;
  color: #101010;
  line-height: 1.5em;
  margin: 0;
  @media (max-width: 1280px){
    font-size: 14px;
  }
  @media (max-width: 768px){
    display: none;
  }
`;

const LikesDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 36px;
  @media (max-width: 1280px){
    margin-top: 36px;
    height: 42px;
  }
  @media (max-width: 768px){
    margin-top: 16px;
    height: 42px;
  }
`;

const ViewLikes = styled.div`
  display: flex;
  flex-direction: row;
  background-color:  ${props => props.backgroundColor};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  max-height: 42px;
  @media (max-width: 1280px){
    max-width: none;
  }
`;

const HeartImg = styled.img`
  width: 24px;
  height: auto;
  margin: 0 0 0 10px;
`;

const HeartOnImage = styled(HeartImg)`
  position: absolute;
  left: 260px;
  top: 16px;
  margin: 0;
`;

const LikesText = styled.p`
  font-size: 18px;
  color: #fff;
  font-weight: 700;
  margin: 10px;
  @media (max-width: 1280px){
    font-size: 16px;
  }
`;

const CloseText = styled(ImageDate)`
  display: flex;
  flex-direction: column-reverse;
  color: #101010;
  cursor: pointer;
  margin: 0;
`;

const NoLikes = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  margin: 120px 0 0 150%;
  @media (max-width: 1280px){
    margin: 64px 0 0 0;
  }
`;

const NoLikesText = styled(ImageName)`
  max-width: none;
  color: #101010;
  text-align: center;
`;

const StackGridStyle = {
  width: "100%",
};

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    zIndex: 1000
  },
  content: 
    window.innerWidth >= 1280 
    ?
    {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      padding: 0,
      border: 0,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '1280px',
      height: 'auto',
      borderRadius: '24px',
      backgroundColor: 'white',
    }
    :
    window.innerWidth >= 960
    ?
    {
      display: 'flex',
      flexDirection: 'row',
      flex: 1,
      padding: 0,
      border: 0,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      height: 'auto',
      borderRadius: '24px',
      backgroundColor: 'gray',
    }
    :
    {
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
      padding: 0,
      border: 0,
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      height: '60%',
      borderRadius: '24px',
      backgroundColor: 'black',
    },
};

function getStartEnd() {
  let currDateStart = new Date(new Date().setDate(new Date().getDate()));
  let currDateEnd = new Date(new Date().setDate(new Date().getDate()-30));
  currDateStart = currDateStart.toISOString().split('T')[0];
  currDateEnd = currDateEnd.toISOString().split('T')[0]
  return [String(currDateStart), String(currDateEnd)];
};

const START_DATE = getStartEnd()[1];
const END_DATE = getStartEnd()[0];

Modal.setAppElement('#root');

function Results(props) {

  const [allImages, setAllImages] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currImg, setCurrImg] = useState({});
  const [likes, setLike] = useState([]);
  const [likedTitles, setLikedTitle] = useState([]);
  const [localLikes, setLocalLikes] = useLocalStorage('localLikes', []);
  const [localLikedTitles, setLocalLikedTitles] = useLocalStorage('localLikedTitles', []);

  useEffect(() => {
    const getImages = async () => {
      const response = await NasaApod.get("/planetary/apod", {
        params: {
          start_date: START_DATE,
          end_date: END_DATE
        }
      });
      const filteredImages = response.data.filter(
        (item) => item.media_type !== "video"
      );
      setAllImages(filteredImages.reverse());
    };
    getImages();
  }, []);

  useEffect(() => {
    if(localStorage.getItem('localLikes') !== null) {
      setLike(JSON.parse(localStorage.getItem('localLikes')));
    };
    if(localStorage.getItem('localLikedTitles') !== null) {
      setLikedTitle(localStorage.getItem('localLikedTitles'));
    };
  }, []);

  function renderSkeletons() {
    const Skeletons = [];
    const heights = [300, 450, 250, 350];
    for(var i = 0; i < heights.length; i++) {
      Skeletons.push(
        <Skeleton sx={{ bgcolor: 'grey.250' }} variant="rectangular" width={300} height={heights[i]} />
      )
    };
    return Skeletons;
  };

  function getImgSize(url) {

    let img = new Image();
    img.src = url;

    const height = img.height;
    const width = img.width;

    const ratio = height / width;
    if(ratio <= 0.85) { 
      return <ImageSmall backgroundImg={'url("' + url + '")'} />; 
    }
    if(ratio <= 1) { 
      return <ImageMedium backgroundImg={'url("' + url + '")'} />; 
    }
    return <ImageLarge backgroundImg={'url("' + url + '")'} />; 
  };

  function openModal(img) {
    let newImg = {}
    newImg.title = img.title;
    newImg.date = img.date;
    newImg.explanation = img.explanation;
    newImg.url = img.url;
    setCurrImg(newImg);
    setIsOpen(true);
    disableScroll.on();
  };

  function closeModal() {
    setIsOpen(false);
    disableScroll.off();
    setCurrImg({});
  };

  function updateNumLikes(newNumLikes) {
    props.onNumLikesChange(newNumLikes);
  };

  function addToLikes() {
    if(!likedTitles.includes(currImg.title)){
      let newlikedTitles = [...likedTitles];
      let currLikes = [...likes];
      let likedImg = {
        title: currImg.title,
        date: currImg.date,
        explanation: currImg.explanation,
        url: currImg.url
      };
      currLikes.push(likedImg);
      setLike(currLikes);
      newlikedTitles.push(currImg.title);
      setLikedTitle(newlikedTitles);
      updateNumLikes(1);
      setLocalLikes(currLikes);
      setLocalLikedTitles(newlikedTitles);
    }
  };

  function removeFromLikes() {
    let currLikes = [];
    let currLikedTitles = [];
    for(var i = 0; i < likes.length; i ++){
      if(likes[i].title !== currImg.title) {
        currLikes.push(likes[i]);
        currLikedTitles.push(likes[i].title);
      }
    };
    setLike(currLikes);
    setLikedTitle(currLikedTitles);
    updateNumLikes(-1);
    setLocalLikes(currLikes);
    setLocalLikedTitles(currLikedTitles);
  };

  return (
    <Wrapper>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ImageExpanded backgroundImg={currImg.url} />
        <ImageDescDiv>
          <ImageDesc>
            <ImageTitle>{currImg.title}</ImageTitle>
            <ImageDate>{currImg.date}</ImageDate>
            <ImageDescText>{currImg.explanation}</ImageDescText>
          </ImageDesc>
          <LikesDiv>
            <ViewLikes  onClick={!likedTitles.includes(currImg.title) ?  () => addToLikes() : () => removeFromLikes()} backgroundColor={likedTitles.includes(currImg.title) ?  '#C14953' : '#101010'}>
              <HeartImg src={Heart} />
              <LikesText>
                {likedTitles.includes(currImg.title) ?  'Remove from likes' : 'Add to likes'}
              </LikesText>
            </ViewLikes>
            <CloseText onClick={closeModal}>Close</CloseText>
          </LikesDiv>
        </ImageDescDiv>
      </Modal>
      {
        allImages.length ?
        <StackGrid
            columnWidth={303}
            style={StackGridStyle}
            gutterWidth={16}
            gutterHeight={24}
          >
          {
            !props.showLikes ?
              allImages.map((item) => (
                <ImageResult onClick={() => openModal(item)}>
                  {getImgSize(item.url)}
                  { likedTitles.includes(item.title) ? <HeartOnImage src={HeartRed} /> : null}
                  <ImageName color={props.darkMode}>{item.title}</ImageName>
                </ImageResult>
              ))
          :
            likes.length >= 1 ?
            likes.map((item) => (
              <ImageResult onClick={() => openModal(item)}>
                {getImgSize(item.url)}
                { likedTitles.includes(item.title) ? <HeartOnImage src={HeartRed} /> : null}
                <ImageName color={props.darkMode}>{item.title}</ImageName>
              </ImageResult>
            ))
          :
            <NoLikes>
              <img src={props.darkMode ? NoLikesImgDark : NoLikesImg} alt='empty clipboard' />
              <NoLikesText color={props.darkMode}>You currently have no liked images</NoLikesText>
            </NoLikes>
          }
        </StackGrid>
        :
        <SkeletonContainer backgroundColor={props.darkMode}>
          <StackGrid
            columnWidth={303}
            style={StackGridStyle}
            gutterWidth={16}
            gutterHeight={16}
          >
            {renderSkeletons()}
          </StackGrid>
        </SkeletonContainer>
      }
    </Wrapper>
  );
}

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
    }
  };
  return [storedValue, setValue];
}

export default Results;

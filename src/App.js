import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import Results from '../src/components/Results';
import Logo from '../src/img/spacestagram-logo.png';
import LogoDark from '../src/img/spacestagram-logo-dark.png';
import Heart from '../src/img/heart.png';
import DarkMode from '../src/img/dark-mode.png';
import LightMode from '../src/img/light-mode.png';
import ImagesDark from '../src/img/images-dark.png';

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  height: 100%;
  justify-content: center;
  background-color: ${props => props.backgroundColor ? '#101010' : '#fff'};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 1280px;
  @media (max-width: 1280px){
    width: 100%;
    padding: 0 72px;
  }
  @media (max-width: 440px){
    padding: 0 16px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 144px 0 0 0;
  @media (max-width: 1280px){
    flex-direction: column;
    padding: 72px 0 0 0;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpaceLogo = styled.img`
  width: 295.05px;
  height: 75.98px;
  @media (max-width: 1280px){
    width: 196.7px;
    height: auto;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${props => props.color ? 'rgba(255,255,255,0.75)' : '#101010'};
  margin: 16px 0 0 0;
  @media (max-width: 1280px){
    font-size: 16px;
    max-width: 320px;
    line-height: 1.5em;
  }
`;

const LikesDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 160px;
  @media (max-width: 1280px){
    height: 108px;
    flex-direction: row-reverse;
    justify-content: space-between;
  }
`;

const ViewLikes = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: ${props => props.color ? '0' : '2px solid #101010'};
  @media (max-width: 1280px){
    max-width: 170px;
  }
`;

const HeartImg = styled.img`
  width: 24px;
  height: auto;
  margin: 0 0 0 10px;
  @media (max-width: 1280px){
    width: 20px;
    height: auto;
  }
`;

const LikesText = styled.p`
  font-size: 18px;
  color: #101010;
  font-weight: 700;
  margin: 10px;
  @media (max-width: 1280px){
    font-size: 16px;
  }
`;

const LightDarkImg = styled.img`
  width: 32px;
  height: auto;
  cursor: pointer;
  @media (max-width: 1280px){
    width: 24px;
    height: auto;
  }
`;

function App() {

  const [darkMode, setDarkMode] = useState(false);
  const [numLikes, setNumLikes] = useState(0);
  const [showLikes, setShowLikes] = useState(false);

  function updateNumLikes(newNumLikes) {
    setNumLikes(numLikes + newNumLikes);
    let localNumLikes = numLikes;
    localStorage.setItem('numLikes', localNumLikes += newNumLikes);
  };

  useEffect(() => {
    if(localStorage.getItem('numLikes') !== null){
      setNumLikes(parseInt(localStorage.getItem('numLikes')));
    }
  }, []);

  return (
    <Wrapper backgroundColor={darkMode}>
      <Content>
        <Header>
          <>
            <Title>
              <SpaceLogo src={darkMode ? Logo : LogoDark} />
              <Subtitle color={darkMode}>A collection of each NASA Photo of the Day from the past month.</Subtitle>
            </Title>
          </>
          <LikesDiv>
            <LightDarkImg src={darkMode ? LightMode : DarkMode} onClick={() => setDarkMode(!darkMode)} />
            <ViewLikes onClick={() => setShowLikes(!showLikes)} backgroundColor={darkMode}>
              <HeartImg src={showLikes ? ImagesDark : Heart} />
              <LikesText>{showLikes ? 'Return to posts' : 'View likes (' + numLikes + ')'}</LikesText>
            </ViewLikes>
          </LikesDiv>
        </Header>
        <Results showLikes={showLikes} onNumLikesChange={updateNumLikes} darkMode={darkMode} />
      </Content>
    </Wrapper>
  );
}

export default App;

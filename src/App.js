import React, { useState, useEffect, } from "react";
import styled from 'styled-components';
import Results from '../src/components/Results';
import Logo from '../src/img/spacestagram-logo.png';
import LogoDark from '../src/img/spacestagram-logo-dark.png';
import Heart from '../src/img/heart.png';
import DarkMode from '../src/img/dark-mode.png';
import LightMode from '../src/img/light-mode.png';

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
  @media (max-width: 768px){
    padding: 0 64px;
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 144px 0 0 0;
  @media (max-width: 1080px){
    flex-direction: column;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
`;

const SpaceLogo = styled.img`
  width: 295.05px;
  height: 75.98px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${props => props.color ? 'rgba(255,255,255,0.75)' : '#101010'};
  margin: 16px 0 0 0;
`;

const LikesDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  height: 160px;
  @media (max-width: 1280px){
    height: 108px;
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
`;

const LikesText = styled.p`
  font-size: 18px;
  color: #101010;
  font-weight: 700;
  margin: 10px;
`;

const LightDarkImg = styled.img`
  width: 32px;
  height: auto;
  cursor: pointer;
`;

function App() {

  const [darkMode, setDarkMode] = useState(false);

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
            <ViewLikes backgroundColor={darkMode}>
              <HeartImg src={Heart} />
              <LikesText>View likes ({0})</LikesText>
            </ViewLikes>
          </LikesDiv>
        </Header>
        <Results darkMode={darkMode} />
      </Content>
    </Wrapper>
  );
}

export default App;

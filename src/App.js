import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import Results from '../src/components/Results';
import Logo from '../src/img/spacestagram-logo.png';
import Heart from '../src/img/heart.png';

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  height: 100%;
  justify-content: center;
  background-color: #101010;
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
  color: #bababa;
  margin: 16px 0 0 0;
`;

const LikesDiv = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 113.97px;
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

function App() {
  return (
    <Wrapper>
      <Content>
        <Header>
          <>
            <Title>
              <SpaceLogo src={Logo} />
              <Subtitle>Brought to you by NASA's Astronomy Photo of the Day.</Subtitle>
            </Title>
          </>
          <LikesDiv>
            <ViewLikes>
              <HeartImg src={Heart} />
              <LikesText>View likes ({0})</LikesText>
            </ViewLikes>
          </LikesDiv>
        </Header>
        <Results />
      </Content>
    </Wrapper>
  );
}

export default App;

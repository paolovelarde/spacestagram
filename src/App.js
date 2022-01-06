import React, { Component } from 'react';
import styled from 'styled-components';
import Logo from '../src/img/spacestagram-logo.png';
import Heart from '../src/img/heart.png';
import SearchIcon from '../src/img/search-icon.png';

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  background-color: #101010;
`;

const Content = styled.div`
  display: flex;
  width: 1280px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  padding: 144px 0 0 0;
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

const SearchBar = styled.div`
  display: flex;
  width: 400px;
  height: 36px;
  background-color: #1C1C1C;
  border-radius: 45px;
  margin: 77.97px 144px 0 0;
`;

const SearchInput = styled.input`
  display: flex;
  width: 100%;
  font-family: Karla;
  background-color: rgba(0,0,0,0);
  border: 0;
  transform: none;
  color: #fff;
  box-shadow: none;
  outline: none;
  font-size: 16px;
`;

const SearchIconImg = styled.img`
  margin: 6px 16px 8px 16px;
  width: 24px;
  height: 24px;
  opacity: 0.5;
`;

const LikesDiv = styled.div`
  display: flex;
  flex-direction: column-reverse;
  height: 113.97px;
`;

const ViewLikes = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
              <Subtitle>Brought to you by NASA's image API.</Subtitle>
            </Title>
            <SearchBar>
              <SearchIconImg src={SearchIcon} />
              <SearchInput key='searchInput' type='text' name='search' placeholder='Search for NASA images...' />
            </SearchBar>
          </>
          <LikesDiv>
            <ViewLikes>
              <HeartImg src={Heart} />
              <LikesText>View likes</LikesText>
            </ViewLikes>
          </LikesDiv>
        </Header>
      </Content>
    </Wrapper>
  );
}

export default App;

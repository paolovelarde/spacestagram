import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import StackGrid from 'react-stack-grid';
import NasaApod from '../api/nasa-apod';
import Skeleton from '@mui/material/Skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const START_DATE = "2021-12-22";
const END_DATE = "2022-01-05";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 120px 0 144px 0;
  background-color: #101010;
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
  color: #fff;
  font-weight: 700;
  margin: 16px 0 0 0;
  line-height: 1.5em;
  width: 300px;
`;

const SkeletonContainer = styled.div`
  display: flex;
  flex: 1;
  background-color: #101010;
  width: 100%;
`;

const StackGridStyle = {
  width: "100%",
};

function Results() {

  const [allImages, setAllImages] = useState("");

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
      setAllImages(filteredImages);
    };
    getImages();
    console.log(allImages);
  }, []);


  function renderSkeletons() {
    const Skeletons = [];
    const heights = [500, 300, 400, 200];
    for(var i = 0; i < heights.length; i++) {
      Skeletons.push(
        <Skeleton sx={{ bgcolor: 'grey.800' }} variant="rectangular" width={300} height={heights[i]} />
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
    console.log(url);
    if(ratio <= 0.85) { 
      return <ImageSmall backgroundImg={'url("' + url + '")'} />; 
    }
    if(ratio <= 1) { 
      return <ImageMedium backgroundImg={'url("' + url + '")'} />; 
    }
    return <ImageLarge backgroundImg={'url("' + url + '")'} />; 
  };

  return (
    <Wrapper>
      {
        allImages.length ?
        <StackGrid
            columnWidth={303}
            style={StackGridStyle}
            gutterWidth={16}
            gutterHeight={24}
            monitorImagesLoaded
          >
          {allImages.map((item) => (
            <ImageResult>
              {getImgSize(item.url)}
              <ImageName>{item.title}</ImageName>
            </ImageResult>
          ))}
        </StackGrid>
        :
        <SkeletonContainer>
          <StackGrid
            columnWidth={303}
            style={StackGridStyle}
            gutterWidth={16}
            gutterHeight={16}
            monitorImagesLoaded
          >
            {renderSkeletons()}
          </StackGrid>
        </SkeletonContainer>
      }
    </Wrapper>
  );
}

export default Results;

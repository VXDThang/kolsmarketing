import React, { useState } from 'react';
import ItemsCarousel from 'react-items-carousel';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Avatar from '@mui/material/Avatar';

export default () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  return (
    <div style={{ padding: `0 ${chevronWidth}px` }}>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={1}
        gutter={20}
        rightChevron={
          <Avatar sx={{ width: 24, height: 24,  "&:hover": { bgcolor: "#00B14F" } }}>
            <ChevronRightIcon />
          </Avatar>
        }
        leftChevron={
          <Avatar sx={{ width: 24, height: 24, "&:hover": { bgcolor: "#00B14F" } }}>
            <KeyboardArrowLeftIcon />
          </Avatar>
        }
        outsideChevron
        chevronWidth={chevronWidth}
      >
        <div style={{ height: 160, background: '#EEE' }}> <img style={{height: 160,width:"100%"}} src="ads_mb_1.jpg" /></div>
        <div style={{ height: 160, background: '#EEE' }}> <img style={{height: 160,width:"100%"}} src="ads2.jpg" /></div>
        <div style={{ height: 160, background: '#EEE' }}> <img style={{height: 160,width:"100%"}} src="ads3.jpg" /></div>
        <div style={{ height: 160, background: '#EEE' }}> <img style={{height: 160,width:"100%"}} src="ads4.jpg" /></div>
      </ItemsCarousel>
    </div>
  );
};
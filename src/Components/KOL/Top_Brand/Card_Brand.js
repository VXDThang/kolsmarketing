import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import "./Brand.css"

export default function Card_Brand({ info }) {
  const navigate = useNavigate();


  function handleClickStalkBrand(e,id) {
    navigate(`/stalkbrand/${id}`);
  }
  return (
    <Card sx={{ maxWidth: 345 }} onClick={(event)=>handleClickStalkBrand(event,info.id)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={info.cover ? info.cover : "brand.jpg"}
          alt="green iguana"
        />
        <CardContent>
          <div className="title-brand-name" style={{ fontWeight: "bold", fontSize: "14px" }}>
            {info.brand_name}
          </div>
          <Typography className="about-brand" variant="body2" color="text.secondary">
            {info.introduce ? info.introduce 
            : 
           "Chúng tôi luôn tìm kiếm những bạn tài năng cho các cơ hội tuyển dụng. Hãy theo dõi chúng tôi để nắm bắt được những cơ hội hấp dẫn nhé! "}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

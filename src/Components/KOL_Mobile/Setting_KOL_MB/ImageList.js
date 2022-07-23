import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

//zoom image
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const itemData = [
    {
        img: 'post1.jpg',
        title: 'Breakfast',
    },
    {
        img: 'post2.jpg',
        title: 'Burger',
    },
    {
        img: 'post3.jpg',
        title: 'Camera',
    },
    {
        img: 'post4.jpg',
        title: 'Coffee',
    },


];

export default function Image_List({ listImage }) {

    return (
        <div>
            <div className='d-flex justify-content-between'>
                <div style={{ fontWeight: "bold", }}>
                    Danh sách ảnh
                </div>
            </div>
            {listImage.length > 0 ?
                <div style={{ paddingTop: "10px" }}>
                    <Grid container spacing={1}>
                        {listImage.map((item,index) => (
                            <Grid item xs={6}>
                                <Zoom>
                                    <div key={index}>
                                        <img id="image_kol"
                                            src={item}
                                            srcSet={item}
                                            alt={item}
                                            loading="lazy"
                                        />
                                    </div>
                                </Zoom>
                            </Grid>
                        ))}

                    </Grid>
                </div>
                : ""}
        </div>

    );
}

import { Carousel } from 'react-carousel-minimal';

function App() {
    const data = [
        {
            image: "ads_2_1.jpg"
        },
        {
            image: "ads_2_2.jpg"
        },
        {
            image: "ads_2_3.jpg"
        },
        {
            image: "ads_2_4.jpg"
        }
    ];

    const captionStyle = {
        fontSize: '2em',
        fontWeight: 'bold',
    }
    const slideNumberStyle = {
        fontSize: '20px',
        fontWeight: 'bold',
    }
    return (
        <div>

            <Carousel
                data={data}
                width="auto"
                height="600px"
                time={3000}
                captionStyle={captionStyle}
                radius="5px"
                slideNumber={false}
                slideNumberStyle={slideNumberStyle}
                captionPosition="bottom"
                automatic={true}
                dots={true}
                pauseIconColor="red"
                pauseIconSize="40px"
                slideBackgroundColor="#eefff6"
                slideImageFit="cover"
                thumbnails={false}
                showNavBtn={false}
            />
        </div>

    );
}

export default App;
import React from 'react'
import { Carousel } from 'react-bootstrap';


const CustomCarousel = () => {
    return (
        <Carousel>
            <Carousel.Item >
                <img
                    className='d-block w-100'
                    src='https://mdbootstrap.com/img/new/slides/043.jpg'
                    alt='Society Slide 1'
                />
                <Carousel.Caption className='text-black'>
                    <h5 >Society Slide 1 Label</h5>
                    <p>Description for Society Slide 1.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className='d-block w-100'
                    src='https://mdbootstrap.com/img/Photos/Slides/img%20(35).jpg'
                    alt='Society Slide 2'
                />
                <Carousel.Caption className='text-white'>
                    <h5>Society Slide 2 Label</h5>
                    <p>Description for Society Slide 2.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className='d-block w-100'
                    src='https://mdbootstrap.com/img/new/slides/042.jpg'
                    alt='Society Slide 3'
                />
                <Carousel.Caption className='text-black'>
                    <h5>Society Slide 3 Label</h5>
                    <p>Description for Society Slide 3.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}

export default CustomCarousel
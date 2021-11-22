import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

const Image = ({ image }) => {
    return (
        <LazyLoadImage effect='opacity' threshold={0} src={image} alt='banner' className='image' wrapperClassName='image'/>
    )
}

export default Image;
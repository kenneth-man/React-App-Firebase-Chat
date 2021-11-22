import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../Components/Image';
import backgroundImage from '../Res/Images/background.png';
import logoImage from '../Res/Images/firebase-logo2.png';

const Home = () => {
    return (
        <div className='Page home col fw'>
            <div className='Page__section--large home__hero row fw'>
                <div className='col'>
                    <h1>Firebase helps you build and run successful apps</h1>
                    <h2>Backed by Google and loved by app development teams - from startups to global enterprises</h2>
                    <Link to='/GlobalChat' exact ='true' className='home__link'>Get Started</Link>
                </div>
                
                <Image image={backgroundImage}/>
            </div>

            <div className='Page__section--large col fw'>
                <h1>Learn more about what Firebase is all about</h1>

                <iframe src='https://www.youtube.com/embed/O17OWyx08Cg' width="1080" height="620" frameBorder="0" allowFullScreen allow='encrypted-media'></iframe>
            </div>

            <div className='Page__section--large ctr fw'>
                <Image image={logoImage}/>
            </div>

            <div className='Page__section--medium col fw'>
                <h1>Try Firebase today!</h1>

                <h2>Integrating it into your app is easy.</h2>

                <Link to='/GlobalChat' exact ='true' className='home__link'>Get Started</Link>
            </div>
        </div>
    )
}

export default Home;
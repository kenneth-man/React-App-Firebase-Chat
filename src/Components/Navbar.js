import React, { useContext } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import Navlink from './Navlink';
import logoImg from '../Res/Images/firebase-logo.png';

const Navbar = () => {
    const { auth, navbarData, scrollToTop } = useContext(Context);

    return (
        <div className='navbar row fw'>
            <Link to='/' exact='true' className='link' onClick={scrollToTop}>
                <img src={logoImg} alt='firebase-logo' className='logo'/>
            </Link>

            <h3 id='greeting'>Welcome back, <span className='bold'>{auth ? auth.currentUser.displayName : null}</span></h3>

            <div className='navbar__links row'>
                {
                    navbarData.map((curr,index) => 
                        <Navlink key={index} url={curr.path} icon={curr.icon} text={curr.text} func={curr.func}/>
                    )
                }
            </div>
        </div>
    )
}

export default Navbar;
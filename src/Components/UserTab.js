import React, { useContext } from 'react';
import { Context } from '../Context';
import Image from './Image';
import { sampleUserIcons } from '../SampleUserIcons';
import { Link } from 'react-router-dom';

//a user tab on Users Screen
const UserTab = ({ uid, name, email, img }) => {
    const { auth, getRandomNumber, scrollToTop, setPrivateChatUsers } = useContext(Context);

    const userTabOnClick = () => {
        const uidArray = [auth.currentUser.uid, uid];
        //collection name determined by alphabetical order of uids, therefore whoever initiates private chat convo, won't create 2 diff collections; only 1
        const sortedUidArray = uidArray.sort();

        setPrivateChatUsers(
            sortedUidArray.map((curr,index) => 
                ({
                    userID: curr,
                    name: sortedUidArray[index] === auth.currentUser.uid ? auth.currentUser.displayName : name
                })
            )
        )

        scrollToTop();
    }

    return (
        <Link to='/PrivateChats' exact='true' className='link userTab ctr' onClick={userTabOnClick}>
            <div className='col fh'>
                <Image image={img ? img : sampleUserIcons[getRandomNumber(sampleUserIcons.length)]}/>

                <h1>{name}</h1>

                <h2>{email}</h2>
            </div>
        </Link>
    )
}

export default UserTab;
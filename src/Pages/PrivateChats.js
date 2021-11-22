import React, { useContext } from 'react';
import { Context } from '../Context';
import Channel from '../Components/Channel';

const PrivateChats = () => {
    const { auth, privateChatUsers } = useContext(Context);
    //checking if state array isn't empty and if currently signed in user is one of the recipients in the private chat; ensuring only two people can view a specific chat
    const privateChatCollectionName = privateChatUsers.length > 0 && (auth.currentUser.uid === privateChatUsers[0].userID || auth.currentUser.uid === privateChatUsers[1].userID) ? 
        `${privateChatUsers[0].userID}-AND-${privateChatUsers[1].userID}` : 
        null;

    return (
        <div className='Page privateChat col fw'>
            <div className='Page__section--smallest fw ctr privateChat--inner'>
                <h1>
                    {privateChatCollectionName ? 
                    `(PRIVATE CHAT): ${privateChatUsers[0].name}, ${privateChatUsers[1].name}` : 
                    'NO USERS IN PRIVATE CHAT'}
                </h1>
            </div>

            <Channel 
                channelType='Chat' 
                collectionName={privateChatCollectionName}
            />
        </div>
    )
}

export default PrivateChats;
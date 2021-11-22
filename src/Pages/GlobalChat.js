import React from 'react';
import Channel from '../Components/Channel';

const GlobalChat = () => {
    return (
        <div className='Page col fw'>
            <Channel 
                channelType='Chat' 
                collectionName='globalChat'
            />
        </div>
    )
}

export default GlobalChat;
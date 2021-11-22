import React from 'react';
import Channel from '../Components/Channel';

const GlobalFeed = () => {
    return (
        <div className='Page col fw'>
            <Channel 
                channelType='Feed' 
                collectionName='globalFeed'
            />
        </div>
    )
}

export default GlobalFeed;
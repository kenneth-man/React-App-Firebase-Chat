import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../Context';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Message from './Message';
import Post from './Post';

const Channel = ({ channelType, collectionName }) => {
    const { auth, db, scrollToBottom, readAllDocumentsFromCollection } = useContext(Context);
    const [channelData, setChannelData] = useState(null);
    const [textInput, setTextInput] = useState('');

    //-CREATE post or message document on firestore
    const handleOnSubmit = e => {
        const { uid, displayName, photoURL, email } = auth.currentUser;

        e.preventDefault();
      
        const trimmedData = textInput.trim();

        if(trimmedData && db) {
            // Add new document in Firestore
            channelType === 'Chat' ?
            db.collection(collectionName).add({
                text: trimmedData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL
            }) :
            db.collection(collectionName).add({
                text: trimmedData,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                displayName,
                photoURL,
                email,
                likes: 0,
                dislikes: 0,
                likedOrDislikedBy: [],
                imageURL: '',
                comments: []
            }) 

            // Clear input field
            setTextInput('');
        }
    };

    useEffect(() => {
        if(db && collectionName) {
            readAllDocumentsFromCollection(collectionName, 'createdAt', setChannelData);
            
            //useEffect cleanup function called every render to prevent error: "To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function",
            //caused by dismounting before async call finished, resulting in memory leak
            return () => setChannelData(null);
        }
    }, [db])

    return (
        <div className='Page channel col fw'>
            <div className='Page channel__container col fw'>
                {
                    channelData ?
                    channelData.map(curr => 
                        channelType === 'Chat' ? 
                        <Message
                            key={curr.id}
                            msgData={curr}
                            collectionName={collectionName}
                        /> :
                        <Post
                            key={curr.id}
                            postData={curr}
                            collectionName={collectionName}
                        /> 
                    ) :
                    <h1 className='ma'>No {channelType} Data found...</h1>
                }  
            </div>

            <form onSubmit={collectionName ? e => handleOnSubmit(e) : null} className='Page__section--smallest channel__input row fw'>
                <textarea
                    value={textInput}
                    onChange={e => setTextInput(e.target.value)}
                    placeholder={`Type your ${channelType} message here...`}
                />

                <div className='row'>
                    <button className='channel__input--cancel' onClick={() => setTextInput('')}>
                        Cancel
                    </button>

                    <button className='channel__input--submit' type='submit' disabled={!textInput} onClick={scrollToBottom}>
                        Send
                    </button>
                </div>
            </form>  
        </div>
    )
}

export default Channel;
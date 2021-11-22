import React, { useContext } from 'react';
import { Context } from '../Context';
import Image from './Image';
import { ReactComponent as ButtonLikeIcon } from '../Res/Icons/thumb_up_off_alt.svg';
import { ReactComponent as ButtonDislikeIcon } from '../Res/Icons/thumb_down_off_alt.svg';
import { ReactComponent as ButtonDeleteIcon } from '../Res/Icons/delete.svg';
import { sampleUserIcons } from '../SampleUserIcons';

const Post = ({ postData, collectionName }) => {
    const { auth, convertTimestampToDate, deleteDocument, updateDocument, getRandomNumber } = useContext(Context);
    const postSentByUser = postData.uid === auth.currentUser.uid;
    const userAlreadyClicked = postData.likedOrDislikedBy.find(curr => curr.user === auth.currentUser.uid);

    const likeOrDislikeOnClick = async (buttonType, dataProp) => {
        if(userAlreadyClicked){    
            const filteredOutUser = postData.likedOrDislikedBy.filter(curr => curr.user !== userAlreadyClicked.user);
            
            userAlreadyClicked.buttonClicked === 'likes' ?
            await updateDocument(collectionName, postData.id, 'likes', postData.likes -= 1) :
            await updateDocument(collectionName, postData.id, 'dislikes', postData.dislikes -= 1);

            await updateDocument(collectionName, postData.id, 'likedOrDislikedBy', filteredOutUser);
        } else {
            await updateDocument(collectionName, postData.id, buttonType, dataProp += 1);
            await updateDocument(collectionName, postData.id, 'likedOrDislikedBy', { user: auth.currentUser.uid, buttonClicked: buttonType }, false);
        }
    }

    return (
        <div className='post col'>
            <div className='Page__section--small col fw'>
                <Image image={postData.photoURL ? postData.photoURL : sampleUserIcons[getRandomNumber(sampleUserIcons.length)]}/>
                <h1>{postData.displayName}</h1>
                <h2>{postData.email}</h2>
            </div>

            <div className='Page__section--small col fw'>
                <div className='Page__section--smallest ctr'>
                    {/* wait for data to exist before calling convertTimestampToDate */}
                    <h2>...wrote on <span className='bold'>{postData.createdAt ? convertTimestampToDate(postData.createdAt) : '(LOADING TIME)'}</span>:</h2>
                </div>
                <div className='Page__section--smallest ctr'>
                    <p>{postData.text}</p>
                </div>
            </div>

            <div className='Page__section--smallest post__btn-panel row'>
                <div className='col'>
                    <button 
                        className={userAlreadyClicked ? (userAlreadyClicked.buttonClicked === 'likes' ? 'post-likes--active': null) : null}
                        id='post-likes' 
                        onClick={() => postSentByUser ? null : likeOrDislikeOnClick('likes', postData.likes)}
                    >
                        <ButtonLikeIcon/>
                    </button>

                    <h3>{postData.likes}</h3>
                </div>

                <div className='col'>
                    <button 
                        className={userAlreadyClicked ? (userAlreadyClicked.buttonClicked === 'dislikes' ? 'post-dislikes--active': null) : null}
                        id='post-dislikes' 
                        onClick={() => postSentByUser ? null : likeOrDislikeOnClick('dislikes', postData.dislikes)}
                    >
                        <ButtonDislikeIcon/> 
                    </button>

                    <h3>{postData.dislikes}</h3>
                </div>     

                {
                    postSentByUser ?
                    <div className='col'>
                        <button id='post-delete' onClick={() => deleteDocument(collectionName, postData.id)}>
                            <ButtonDeleteIcon/> 
                        </button>

                        <h3>Delete</h3>
                    </div> : 
                    null
                }    
            </div>
        </div>
    )
}

export default Post;
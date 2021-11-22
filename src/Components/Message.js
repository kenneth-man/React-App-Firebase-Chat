import React, { useContext, useState } from 'react';
import { Context } from '../Context';
import Image from '../Components/Image';
import { ReactComponent as ButtonDeleteIcon } from '../Res/Icons/delete.svg';
import { sampleUserIcons } from '../SampleUserIcons';

const Message = ({ msgData, collectionName }) => {
    const { auth, convertTimestampToDate, deleteDocument, getRandomNumber }  = useContext(Context);
    const [deleteBtnShown, setDeleteBtnShown] = useState(false);
    const msgSentByUser = msgData.uid === auth.currentUser.uid;
    const msgClass = msgSentByUser ? 'message__sent' : 'message__received';

    const toggleDeleteBtnShown = () => setDeleteBtnShown(!deleteBtnShown);
    
    return (
        <div className={`message ${msgClass} ctr`}>  
            {
                msgClass === 'message__sent' ?
                <div className='row fw fh' onMouseOver={toggleDeleteBtnShown} onMouseOut={toggleDeleteBtnShown}>
                    <p>{msgData.text}</p>

                    <div className='col'>
                        <Image image={msgData.photoURL ? msgData.photoURL : sampleUserIcons[getRandomNumber(sampleUserIcons.length)]}/>

                        <h2 className='mt'>{msgData.displayName}</h2>

                        <h3>{msgData.createdAt ? convertTimestampToDate(msgData.createdAt, true) : '(LOADING TIME)'}</h3>
                    </div>
                    
                    <button onClick={() => deleteDocument(collectionName, msgData.id)} className={deleteBtnShown ? 'message-delete' : 'message-delete__hidden hidden'}>
                        <ButtonDeleteIcon/>
                    </button>    
                </div> :
                <div className='row fw fh'>
                    <div className='col'>
                        <Image image={msgData.photoURL ? msgData.photoURL : sampleUserIcons[getRandomNumber(sampleUserIcons.length)]}/>

                        <h2 className='mt'>{msgData.displayName}</h2>

                        <h3>{msgData.createdAt ? convertTimestampToDate(msgData.createdAt, true) : '(LOADING TIME)'}</h3>
                    </div>

                    <p>{msgData.text}</p>
                </div>
            }  
        </div>
    )
}

export default Message;
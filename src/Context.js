import React, { createContext, useState } from 'react';
import firebase from 'firebase/compat/app';
import { ReactComponent as Home } from './Res/Icons/home.svg';
import { ReactComponent as GlobalChat } from './Res/Icons/public.svg';
import { ReactComponent as GlobalFeed } from './Res/Icons/location_city.svg';
import { ReactComponent as PrivateChats } from './Res/Icons/library_books.svg';
import { ReactComponent as Users } from './Res/Icons/group.svg';

export const Context = createContext();

const ContextProvider = ({ children, auth, db }) => {
    const [allUsers, setAllUsers] = useState(null);
    const [privateChatUsers, setPrivateChatUsers] = useState([]);

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }

    const signOut = () => {
        if(auth.currentUser) auth.signOut();
    }

    const scrollToTop = () => {
        //prevent .Page from being overlapped by .navbar; offset position from top by 100px (bc .navbar is 100px height); scrollIntoView() doesn't allow offset positioning
        document.querySelector('.App').scrollTo({
            top: document.querySelector('.Page').offsetTop - 100,
            behavior: 'smooth'
        });
    }

    const scrollToBottom = () => {
        const element = document.querySelector('.App');

        //scrollTo after data updates; not immediately otherwise will scroll to just before added message/post
        setTimeout(() => {
            element.scrollTo({
                top: element.scrollHeight,
                behavior: 'smooth'
            });
        }, 1000)
    }

    //convert firebase timestamp to a Date object, then to String
    const convertTimestampToDate = (timestamp, timeOnly = false) => 
        timeOnly ? 
        `${String(timestamp.toDate()).slice(16, 28)}` :
        `${String(timestamp.toDate()).slice(0, 15)} at ${String(timestamp.toDate()).slice(16, 28)}`

    //-DELETE a document in firestore based on collection name and document id
    const deleteDocument = async (collection, documentId) => {
        try {
            await db.collection(collection).doc(documentId).delete();
        } catch(error){
            console.log(error);
        }
    }

    //-READ a single document in firestore
    const readDocument = async (collection, documentId) => {
        try {
            const document = await db.collection(collection).doc(documentId).get();
            return document.data();
        } catch(error){
            console.log(error);
        }
    }

    //-READ all documents in a collection in firestore
    const readAllDocumentsFromCollection = async (collection, orderedBy, setState) => {
        //subscribe to query with onSnapshot
        const unsubscribe = await db
        .collection(collection)
        .orderBy(orderedBy)
        .limit(1000)
        .onSnapshot(querySnapshot => {
            //get all documents from collection - with IDs
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));

            setState(data);
        })

        //detach listener
        return unsubscribe;
    }

    //-UPDATE a document in firestore; if want to completely overwrite an entire document then use .set()
    const updateDocument = async (collection, documentId, key, newValue, overwriteField = true) => {
        try {
            let updatingProperty = {};
            const existingFieldData = await readDocument(collection, documentId);

            //using 'key' parameter as the key for updating a property of firestore object
            overwriteField ?
            updatingProperty[key] = newValue :
            updatingProperty[key] = [...existingFieldData.likedOrDislikedBy, newValue];

            await db.collection(collection).doc(documentId).update(updatingProperty);
        } catch(error){
            console.log(error);
        }
    }

    const getRandomNumber = maxNumber => Math.floor(Math.random() * maxNumber);
    
    const navbarData = [
        {
            path: '/',
            icon: <Home/>,
            text: 'Home',
            func: scrollToTop
        },
        {
            path: '/GlobalChat',
            icon: <GlobalChat/>,
            text: 'Global Chat',
            func: scrollToBottom
        },
        {
            path: '/GlobalFeed',
            icon: <GlobalFeed/>,
            text: 'Global Feed',
            func: scrollToBottom
        },
        {
            path: '/PrivateChats',
            icon: <PrivateChats/>,
            text: 'Private Chats',
            func: scrollToTop
        },
        {
            path: '/Users',
            icon: <Users/>,
            text: 'Users',
            func: scrollToTop
        } 
    ]

    return (
        <Context.Provider value={{ auth, db, navbarData, allUsers, privateChatUsers,
            signInWithGoogle, signOut, scrollToTop, scrollToBottom, convertTimestampToDate, deleteDocument, readDocument, updateDocument, 
            readAllDocumentsFromCollection, setAllUsers, getRandomNumber, setPrivateChatUsers }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider;
import React, { useContext, useState, useEffect, useRef } from 'react';
import { Context } from '../Context';
import { Link } from 'react-router-dom';
import UserTab from '../Components/UserTab';
import SearchBar from '../Components/SearchBar';

const Users = () => {
    const { auth, db, allUsers, setAllUsers, readAllDocumentsFromCollection, signOut, setPrivateChatUsers } = useContext(Context);
    //all users currently in firebase db, before checking to add currently signed in user if already exists or not in db
    const [dbAllUsers, setDbAllUsers] = useState(null);
    //setting default state to empty array since if only one user registered, would be an empty array which is truthy; so need to test .length
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchString, setSearchString] = useState('');
    const isInitialRender = useRef(true);

    const filterResults = (searchStr) => {
        const filteredResultsArray = allUsers.filter(curr => curr.displayName.toLowerCase().includes(searchStr.toLowerCase()) && curr.uid !== auth.currentUser.uid);
        setFilteredResults(filteredResultsArray);
    }

    //currently signed in user's account shouldn't show up in Users page; so removing possibility of messaging yourself
    const excludeSignedInUser = () => allUsers.filter(curr => curr.uid !== auth.currentUser.uid);

    const signOutOnClick = () => {
        setPrivateChatUsers([]);
        signOut();
    }

    useEffect(() => {
        if(dbAllUsers && auth.currentUser && db){
            const { uid, displayName, email, photoURL } = auth.currentUser;

            //if firebase db contains user that's currently signed in, set state, otherwise add the signed in user's credentials to collection on firestore
            dbAllUsers.find(curr => curr.uid === auth.currentUser.uid) ?
            setAllUsers(dbAllUsers) :
            db.collection('allUsers').add({ 
                uid, 
                displayName, 
                email,
                photoURL
            });
        }
    }, [dbAllUsers])

    useEffect(() => {
        if(db) readAllDocumentsFromCollection('allUsers', 'uid', setDbAllUsers);

        //useEffect cleanup function
        return () => setDbAllUsers(null);
    }, [db])

    useEffect(() => {
        if(allUsers) setFilteredResults(excludeSignedInUser());
    }, [allUsers]);

    useEffect(() => {
        isInitialRender.current ?
        isInitialRender.current = false :
        (
            searchString ? filterResults(searchString) : setFilteredResults(excludeSignedInUser())
        )
    }, [searchString]);

    return (
        <div className='Page col fw'>
            <div className='Page__section--small col'>
                <h1>Search for Users</h1>

                <SearchBar   
                    state={searchString}
                    setState={setSearchString}
                />
            </div>

            <div className='Page__section--large users row fw'>
                {
                    filteredResults.length > 0 ? 
                    filteredResults.map((curr, index) => 
                        <UserTab
                            key={index}
                            uid={curr.uid}
                            name={curr.displayName}
                            email={curr.email}
                            img={curr.photoURL}
                        />
                    ) :
                    <div className='Page__section--medium ctr'>
                        <h1>No users found</h1>
                    </div>
                }
            </div>

            <div className='Page__section--smallest ctr'>
                <Link to='/' exact ='true' onClick={signOutOnClick} className='link'>Sign Out</Link>
            </div>
        </div>
    )
}

export default Users;
import './App.css';
import ContextProvider from './Context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from './Pages/SignIn';
import Home from './Pages/Home';
import GlobalChat from './Pages/GlobalChat';
import GlobalFeed from './Pages/GlobalFeed';
import PrivateChats from './Pages/PrivateChats';
import Users from './Pages/Users';
import Navbar from './Components/Navbar';
//firebase sdk; 
//1) create project on firebase.com 
//2) enable firestore api and create firstore database on google cloud platform
//3) update database rules (permissions) https://stackoverflow.com/questions/46590155/firestore-permission-denied-missing-or-insufficient-permissions
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp({
  apiKey: "AIzaSyBFNs58oOV7MB_PM9SZrX5MpS4GhWldZMY",
  authDomain: "fir-chat-d6993.firebaseapp.com",
  projectId: "fir-chat-d6993",
  storageBucket: "fir-chat-d6993.appspot.com",
  messagingSenderId: "775403671098",
  appId: "1:775403671098:web:8ff3057c3fbeaf7617af03",
  measurementId: "G-KYYNPGZQ7C"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  //'useAuthState' firebase hook used to ensure update of the UI as soon as 'firebase.auth()' resolves; similar to useState
  //'if signed in, user' is an object, otherwise null; 'auth.currentUser' is same as 'user' in this example
  const [user] = useAuthState(auth);

  return (
    <div className="App col">
      <ContextProvider auth={auth} db={firestore}>
        <BrowserRouter>
          {user ? <Navbar/> : null}

          <Routes>
            <Route path='/' exact element={user ? <Home/> : <SignIn/>}/>
            <Route path='/GlobalChat' exact element={<GlobalChat/>}/>
            <Route path='/GlobalFeed' exact element={<GlobalFeed/>}/>
            <Route path='/PrivateChats' exact element={<PrivateChats/>}/>
            <Route path='/Users' exact element={<Users/>}/>
          </Routes>
        </BrowserRouter>
      </ContextProvider>
    </div>
  );
}

export default App;
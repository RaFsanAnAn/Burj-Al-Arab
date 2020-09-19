import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(userContext);
    let history = useHistory();
    let location = useLocation();
  
    let { from } = location.state || { from: { pathname: "/" } };
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
    
            const  {displayName, email} = result.user;
            const signedInUser = {name : displayName, email };
            setLoggedInUser(signedInUser);
            history.replace(from);
            // ...
          }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
          });
    }

    return (
        <div>
         <h1>This is Login</h1>
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
           
        </div>
    );
};

export default Login;
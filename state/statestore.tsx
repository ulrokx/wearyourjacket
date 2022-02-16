import * as React from 'react';
import {FirebaseApp} from '../firebase'
import {onAuthStateChanged, Auth} from  'firebase/auth'

export const userInfo = React.createContext({});

export const UserInfoProvider = ({children}) => {
    const [userData, setUserData] = React.useState(null);

    React.useEffect(() => {
       FirebaseApp.auth().onAuthStateChanged(setUserData);
    }, [])
 
    return(
        <userInfo.Provider value = {userData} >
            {children}
            </userInfo.Provider>
    )
}
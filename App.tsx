import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Weather from "./screens/Weather";
import { useFonts, Kalam_400Regular } from "@expo-google-fonts/kalam";
import AppLoading from "expo-app-loading";
import {FirebaseApp, db} from "./firebase";
import * as SecureStore from "expo-secure-store";
import * as FirebaseAuth from "firebase/auth";
import * as Firestore from "firebase/firestore";
import { AuthContext } from "./state/contextProvider";
import { Rubik_300Light, Rubik_700Bold } from "@expo-google-fonts/rubik";
import { UserInfoProvider } from "./state/statestore";
export interface authState {
    userToken: string;
    isLoading: boolean;
    isSignout: boolean;
}

interface SignUp {
    email:string;
    nick: string;
    zipcode:string;
    password:string;
}

export interface actionType {
    type: string;
    token?: any;
}


export default function App() {

    const setUserData = async (token: string) => {
        try {
        const docRef = Firestore.doc(db, "users", token);
        const data = await Firestore.getDoc(docRef);
        } catch (e) {
            console.error(e);
        }

    }
    const [state, dispatch] = React.useReducer( // global state about auth state
        (prevState: authState, action: actionType) => {
            switch (action.type) {
                case "RESTORE_TOKEN":
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case "SIGN_IN":
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case "SIGN_OUT":
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
                case "GUEST":
                    return{
                        ...prevState,
                        isSignout: false,
                        userToken: null,
                    };
                case "SIGN_UP":
                    return{
                        ...prevState,
                        isSignout: false,
                        userToken: action.token
                    }
            }
        },
        {
            isLoading: true,
            isSignout: true,
            userToken: null,
        }
    );

    const authContext = React.useMemo( // usecontext goes back to this
        () => ({
            signIn: async ({ username, password }) => {
                try {
                    const auth = FirebaseAuth.getAuth(FirebaseApp);
                    const userCredential =
                        await FirebaseAuth.signInWithEmailAndPassword(
                            auth,
                            username,
                            password
                        );
                    console.log(userCredential.user.uid);
                    dispatch({
                        type: "SIGN_IN",
                        token: userCredential.user.uid,
                    });
                } catch (e) {
                    console.log(e.message);
                }
            },

            signOut: () => dispatch({ type: "SIGN_OUT" }),

            signUp: async (email, password, nick, zipcode) => {
                try {
                    const auth = FirebaseAuth.getAuth(FirebaseApp);
                    const userCredential = 
                        await FirebaseAuth.createUserWithEmailAndPassword(
                            auth,
                            email,
                            password
                    );
                    
                    await Firestore.setDoc(Firestore.doc(db, "users", userCredential.user.uid),
                    {
                        uid: userCredential.user.uid,
                        email: email,
                        nick: nick,
                        zipcode: zipcode
                    }
                    )
                    dispatch({type: "SIGN_UP", token: userCredential.user.uid})
                } catch (e) {
                    console.log(e.message);
                }
            },

            asGuest: () => {
                console.log("here")
                dispatch({type: "GUEST", token: null})},
        }),
        []
    );

    const Stack = createNativeStackNavigator();

    let [fontsLoaded] = useFonts({
        Kalam_400Regular,
        Rubik_300Light,
        Rubik_700Bold
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <UserInfoProvider>
        <AuthContext.Provider value={[authContext, state]}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    {state.isSignout ? (
                        <>
                            <Stack.Screen name="Login" component={Login} options={{
                                headerShown: false
                            }}/>
                            <Stack.Screen
                                name="Register"
                                component={Register}
                                options = {{headerShown: false}}
                            />
                        </>
                    ) : (
                        <Stack.Screen
                            name="Weather"
                            component={Weather}
                            options={{ headerShown: false }}
                        />
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </AuthContext.Provider>
        </UserInfoProvider >
    );
}

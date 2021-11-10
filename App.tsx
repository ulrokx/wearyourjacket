// In App.js in a new project

import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Weather from "./screens/Weather";
import { useFonts, Kalam_400Regular } from "@expo-google-fonts/kalam";
import AppLoading from "expo-app-loading";
import FirebaseApp from "./firebase";
import * as SecureStore from "expo-secure-store";
import * as FirebaseAuth from "firebase/auth";
import { AuthContext } from "./state/contextProvider";
export interface authState {
    userToken: string;
    isLoading: boolean;
    isSignout: boolean;
}

export interface actionType {
    type: string;
    token?: any;
}

export default function App() {
    const [state, dispatch] = React.useReducer(
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
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    const authContext = React.useMemo(
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
                    console.log(userCredential);
                        dispatch({ type: "SIGN_IN", token: userCredential.user.uid })
                } catch (e) {
                    console.log(e.message);
                }
            },
            signOut: () => dispatch({ type: "SIGN_OUT" }),

            signUp: (data) => {
                dispatch({ type: "SIGN_IN", token: data });
            },
        }),
        []
    );

    const Stack = createNativeStackNavigator();
    let [fontsLoaded] = useFonts({
        Kalam_400Regular,
    });

    console.log("loading");

    if (!fontsLoaded) {
        return <AppLoading />;
    }
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    {state.userToken == null ? (
                        <>
                            <Stack.Screen name="Login" component={Login} />
                            <Stack.Screen
                                name="Register"
                                component={Register}
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
    );
}

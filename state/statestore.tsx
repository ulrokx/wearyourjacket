import FirebaseApp from "../firebase";
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import * as FirebaseAuth from "firebase/auth";

const auth = FirebaseAuth.getAuth(FirebaseApp);

const AuthContext = React.createContext(undefined);

AuthContext.displayName = "AuthContext";

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = React.useReducer(
        (prevState: any, action: { type: string; token: string | null }): any => {
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

    React.useEffect(() => {
        const boostrapAsync = async () => {
            let userToken;

            try {
                userToken = await SecureStore.getItemAsync("userToken");
            } catch (e) {}

            dispatch({ type: "RESTORE_TOKEN", token: userToken });
        };
    });

    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
            },

            signOut: () => dispatch({ type: "SIGN_OUT", token: null }),
            
            signUp: async (data) => {
                dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
            },
        }),
        []
    );

    FirebaseAuth.onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch({ type: "SIGN_IN", token: user.uid });
        } else {
        }
    });

    return <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>;
};

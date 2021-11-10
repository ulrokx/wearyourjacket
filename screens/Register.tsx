import React, { useEffect, useState } from "react";
import {
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import EmailValidator from 'email-validator'
import FirebaseApp from "../firebase";
import { getAuth } from "@firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { onRegister } from "../api/firebasefunctions";

const auth = getAuth(FirebaseApp);
const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [retype, setRetype] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [name, setName] = useState("");
    const [matching, setMatching] = useState(false);
    const [namegood, setNamegood] = useState(false);
    const [emailgood, setEmailgood] = useState(false);
    const [zipcodegood, setZipcodegood] = useState(false);
    const [passwordGood, setPasswordGood] = useState(false);
    const nameReg = new RegExp("^[A-Za-z]*$");

    useEffect(() => {
        if(password === retype && password) {
            setPasswordGood(true);
            setMatching(true);
        }
        else {
            setMatching(false);
            
        }
    }, [retype, password])

    const handleRegister = () => {
        console.log("here")
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
                console.log(errorCode)
            });
    };

    const onNameChanged = (value: string) => {
        setName(value);
        if (nameReg.test(value) && value.length >= 3 && value.length <= 12) {
            setNamegood(true);
        } else {
            setNamegood(false);
        }
    };

    const onEmailChanged = (value: string) => {
        setEmail(value);
        if(EmailValidator.validate(value))
        {
            setEmailgood(true);
        }
        else {
            setEmailgood(false);
        }
    };

    const onPasswordChanged = (value: string) => {
        setPassword(value);
        if(value.length >= 8) {
            setPasswordGood(true);
        }
        else{
            setPasswordGood(false);
        }
    }

    const onRePassChanged = (value: string) => {
        setRetype(value);
        if(value === password) {
            setMatching(true)
        }
        else {
            setMatching(false);
        }
    }

    const onZipChanged = (value: string) => {
        setZipcode(value);
        if(value.length == 5) {
            setZipcodegood(true);
        }
        else {
            setZipcodegood(false);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text style={styles.titleText}>let's get started!</Text>
            <TextInput
                placeholder="your nickname"
                value={name}
                onChangeText={(value) => onNameChanged(value)}
                style={[
                    styles.textField,
                    namegood ? styles.fieldGood : styles.fieldBad,
                ]}
            />
            <TextInput
                placeholder="your email"
                value={email}
                onChangeText={(value) => onEmailChanged(value)}
                style={[
                    styles.textField,
                    emailgood ? styles.fieldGood : styles.fieldBad,
                ]}
            />

            <TextInput
                placeholder="your password (length >= 8) :)"
                value={password}
                onChangeText={(value) => onPasswordChanged(value)}
                secureTextEntry
                style={[
                    styles.textField,
                    passwordGood ? styles.fieldGood : styles.fieldBad,
                ]}
            />
            <TextInput
                placeholder="your secret password again"
                value={retype}
                onChangeText={(value) => onRePassChanged(value)}
                secureTextEntry
                style={[
                    styles.textField,
                    matching ? styles.fieldGood : styles.fieldBad,
                ]}
            />
            <TextInput
                placeholder="your primary zipcode"
                value={zipcode}
                onChangeText={(value) => onZipChanged(value)}
                style={[
                    styles.textField,
                    zipcodegood ? styles.fieldGood : styles.fieldBad,
                ]}
            />

            <Pressable
                onPress={() => onRegister(email,password,name,zipcode)}
                style={[styles.login]}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Text>beam me up mom!</Text>
            </Pressable>
        </KeyboardAvoidingView>
    );
};

export default Register;
const styles = StyleSheet.create({
    textField: {
        width: "80%",
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "white",
        marginTop: "2%",
        borderWidth: 1,
        borderRadius: 8,
        borderColor: "#d49911",
    },
    fieldGood: {
        borderColor: "#09da09",
    },
    fieldBad: {
        borderColor: "#e63232",
    },
    text: {
        fontSize: 22,
    },
    titleText: {
        fontSize: 32,
        marginBottom: 24,
        fontFamily: "Kalam_400Regular",
    },
    login: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "lightgreen",
        height: "8%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "8%",
        width: "60%",
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});

import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const Greeting = () => {
    const converter = require("number-to-words");
    const [timeText, setTimeText] = useState("");
    const [phrase, setPhrase] = useState("");
    const [minute, setMinute] = useState("");
    const [hour, setHour] = useState("");
    const [time, setTime] = useState({
        m: new Date().getMinutes(),
        h: new Date().getHours()
    });
    useEffect(() => {
        const interval = setInterval(() => {
            setTime({
                m: new Date().getMinutes(),
                h: new Date().getHours()
            });
            setHour(converter.toWords(time.h % 12));
            if (time.m == 0) {
                setPhrase(" o' clock");
                setMinute(converter.toWords(time.h%12));
                setHour("");
            } else if (time.m <= 14) {
                setMinute(converter.toWords(time.m));
                setPhrase(" minutes past ");
            } else if (time.m == 15) {
                setPhrase("quarter past ");
                setMinute("");
            } else if (time.m <= 29) {
                setMinute(converter.toWords(time.m));
                setPhrase(" minutes past ");
            } else if (time.m == 30) {
                setPhrase("half past ");
                setMinute("");
            } else if (time.m <= 44) {
                setMinute(converter.toWords(60 - time.m));
                setPhrase(" minutes to ");
            } else if (time.m == 45) {
                setPhrase(`quarter to `);
                setMinute("");
            } else {
                setMinute(converter.toWords(60 - time.m));
                setPhrase(" minutes to ");
            }

            if (time.h <= 7) {
                setTimeText("Early bird! ");
            } else if (time.h <= 11) {
                setTimeText("Good morning! ");
            } else if (time.h <= 13) {
                setTimeText("Happy noon! ");
            } else if (time.h <= 17) {
                setTimeText("Good afternoon! ");
            } else if (time.h <= 20) {
                setTimeText("Dinner time! ");
            } else {
                setTimeText("Goodnight! ");
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    });

    return (
      <View>
        <View style={{ flexDirection: "row" }}>
            <Text style = {[styles.greeting, styles. standard]}>{timeText}</Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: 'wrap'}}>
            <Text style = {styles.standard}>{"It is "}</Text>
            <Text style = {[styles.standard,styles.minute]}>{minute}</Text>
            <Text style = {styles.standard}>{phrase}</Text>
            <Text style = {[styles.standard, styles.hour]}>{hour}</Text>
            <Text style = {styles.standard}>.</Text>
        </View>
      </View>
    );
};

const styles = StyleSheet.create({
    greeting: {
        fontSize: 40,
    },
    standard: {
        fontSize: 29,
        fontWeight: "bold",
        fontFamily: 'Rubik_300Light',
    }, 
    minute: {
        fontFamily: 'Rubik_700Bold'
    }, 
    hour: {
        fontFamily: 'Rubik_700Bold'
    }

});
export default Greeting;

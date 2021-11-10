import React, { SetStateAction, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import getSunTimes from "../api/getSunTimes";
export default function SunTimes() {
  const [isLoading, setLoading] = useState(true);
  const [sunTimes, setSunTimes] = useState([]);
  useEffect(() => {
    const grabSunTimes = async () => {
      const temp: SetStateAction<any> = await getSunTimes();
      if (temp) {
        setLoading(false);
      }
      setSunTimes(temp);
    };
    grabSunTimes();
  });

  return (
    <View style={{ flex: 1}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>{sunTimes[0]}</Text>
          <Text>{sunTimes[1]}</Text>
        </>
      )}
    </View>
  );
}
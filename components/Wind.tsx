import React, { SetStateAction, useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import getWind from "../api/getWind";
export default function Wind() {
  const [isLoading, setLoading] = useState(false);
  const [windStats, setWindStats] = useState([]);
  useEffect(() => {
    const grabWindStats = async () => {
      const temp: SetStateAction<any> = await getWind();
      
      if (temp) {
        setLoading(false);
      }
      setWindStats(temp);
    };
    grabWindStats();
  });

  return (
    <View style={{ flex: 1}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>{windStats[0]}</Text>
          <Text>{windStats[1]}</Text>
        </>
      )}
    </View>
  );
}
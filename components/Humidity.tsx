import React, { SetStateAction, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import getHumidity from '../api/getHumidity';
export default function Humidity () {
  const [isLoading, setLoading] = useState(true);
  const [humidity, setHumidity] = useState([]);
  useEffect(() => {
    const grabHumidity = async () => {
      const temp: SetStateAction<any> = await getHumidity();
      if(temp) {
        setLoading(false);
      }
      setHumidity(temp);
    }
    grabHumidity();
  })  

  

  return (
    <View style={{ flex: 1}}>
      {isLoading ? <ActivityIndicator/> : (
        <>
        <Text>{humidity}</Text>
        </>

      )}
    </View>
  );
}
import React, {useState} from 'react'
import { SafeAreaView, StyleSheet, View } from 'react-native'
import Greeting from '../components/Greeting'
import MinMax from '../components/MinMax'
import Temperature from '../components/Temperature'
import Wrapper from '../components/Wrapper'
import { StatusBar } from "expo-status-bar";
export default function Weather() {
const unitobj = {
  f: "F",
  c: "C"
}
const [units, setUnits] = useState(unitobj.f)
  const handleUnitChange = () => {
    console.log(units)
    if(units === unitobj.f)
    {
      setUnits(unitobj.c)
    }
    else
    {    
      setUnits(unitobj.f)
    }
  }
  return (
    <SafeAreaView style={[styles.safearea, {backgroundColor:'lightblue'}]}>
      <Wrapper>
        <View style={styles.container}>
          <Greeting />
          <View style = {{flex: .3, flexDirection:'row'}}>
              <Temperature 
                dUnit = {units}
              />
              <MinMax 
                dUnit = {units}
                onUnitChange = {() => handleUnitChange()}
              />
          </View>
          
          <StatusBar style="auto" />
        </View>
      </Wrapper>
    </SafeAreaView>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safearea: {
    flex: 1,
  },
});
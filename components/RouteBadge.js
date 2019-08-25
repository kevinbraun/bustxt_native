import React from 'react'
import {StyleSheet} from "react-native";
import { Text } from 'native-base';

const styles = StyleSheet.create({
  badge: {
    borderColor: 'black',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,

    fontWeight: 'bold',
    fontSize: 18,

    padding: 3,
    textAlign: 'center',
  }
});

const RouteBadge = props => {
  let {route} = props;

  return (
    <Text style={styles.badge}>
      {route.number}
    </Text>
  )
}

export default RouteBadge;
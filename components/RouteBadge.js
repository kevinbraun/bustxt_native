import React from 'react'
import {StyleSheet} from "react-native";
import { Text } from 'native-base';
import { View } from 'native-base';

const styles = StyleSheet.create({
  badgeContainer: {
    width: 40,
    height: 40,
    
    borderColor: 'black',
    borderRadius: 3,
    borderStyle: 'solid',
    borderWidth: 1,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  badge: {

    fontWeight: 'bold',
    fontSize: 18,

    padding: 2,
    textAlign: 'center',
  }
});

const RouteBadge = props => {
  let {route} = props;

  return (
    <View style={styles.badgeContainer} >
      <Text style={styles.badge}>
        {route.number}
      </Text>
    </View>
  )
}

export default RouteBadge;
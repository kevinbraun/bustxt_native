import React from 'react';
import { StyleSheet } from 'react-native';
import moment from 'moment';
import {Body, Left, ListItem, Right, Text} from "native-base";

import RouteBadge from './RouteBadge';

const styles = StyleSheet.create({
  listItem: {
    // paddingTop: 3,
    // paddingBottom: 3,
  }
});

const displayTime = time => {
  let parsed = moment(time);
  let relativeBound = moment().add(15, 'minutes');

  if(parsed.isBefore(relativeBound)) {
    return parsed.toNow(true);
  } else {
    return parsed.format("HH:mm");
  }
};

const ScheduledStop = props => {
  let { ss } = props;

  return(
    <ListItem thumbnail style={styles.listItem}>
      <Left><RouteBadge route={ss.route} /></Left>
      <Body><Text>{ss.variant.name}</Text></Body>
      <Right><Text>{displayTime(ss.estimated)}</Text></Right>
    </ListItem>
  )
};

export default ScheduledStop;

import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';
import {
  List, ListItem, Text, Left, Body, Right
} from 'native-base'

import _ from 'lodash';
import StopScheduleParser from '../lib/StopScheduleParser'

class QueryResultsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      resultData: null,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if((prevProps.query != this.props.query) && (this.props.query != '')) {
      this.search(this.props.query);
    }
  }

  search(query) {
    if(query.match(/\d{5}/)) {
      this.setState({loading: true});

      fetch(`https://api.winnipegtransit.com/v3/stops/${query}/schedule.json?api-key=Xay3Sjnxl58VscDylqO`)
        .then((response) => response.json())
        .then((response) => this.setState({resultData: new StopScheduleParser(response), loading: false}))
        .catch((error) => console.error(error));
    } else {
      this.setState({resultData: null})
    }
  }

  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  renderList() {
    let stop, schedule;

    if(!_.isEmpty(this.state.resultData)) {
      stop = this.state.resultData && this.state.resultData.stop();
      schedule = this.state.resultData && this.state.resultData.schedule();
    }

    if(stop && schedule) {
      return (
        <List>
          <ListItem>
            <Text>
              Results for {stop.number} - {stop.name}
            </Text>
          </ListItem>
          {schedule.map((ss) => { return(
            <ListItem avatar key={ss.key}>
              <Left><Text>{ss.route.number}</Text></Left>
              <Body><Text>{ss.route.name}</Text></Body>
              <Right><Text>{ss.estimated}</Text></Right>
            </ListItem>
          )})}
        </List>
      )
    } else {
      return( <List></List> );
    }
  }

  render() {
    return (this.state.loading ? this.renderLoading() : this.renderList())
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

export default QueryResultsList;
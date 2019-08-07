import React from 'react';
import { RefreshControl, StyleSheet, } from 'react-native';
import {
  Content, List, ListItem, Text, Left, Body, Right, Item, Icon, Input, Label
} from 'native-base'

import _ from 'lodash';
import StopScheduleParser from '../lib/StopScheduleParser'

class SearchScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query: '',
      loading: false,
      resultData: null,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if((prevState.query != this.state.query) && (this.state.query != '')) {
      this.search(this.state.query);
    }
  }

  search(query) {
    if(query.match(/\d{5}/)) {
      this.setState({loading: true});

      fetch(`https://api.winnipegtransit.com/v3/stops/${query}/schedule.json?api-key=Xay3Sjnxl58VscDylqO`)
        .then((response) => response.clone().json().catch(() => response.text()))
        .then((response) => this.setState({resultData: new StopScheduleParser(response), loading: false}))
        .catch((error) => console.error(error));
    } else {
      this.setState({resultData: null})
    }
  }

  renderList() {
    let stop, schedule, error;

    if(!_.isEmpty(this.state.resultData)) {
      error = this.state.resultData.errorMessage();
      stop = this.state.resultData.stop();
      schedule = this.state.resultData.schedule();
    }

    if(error) {
      return (<Text>{error}</Text>);
    } else if(stop && schedule) {
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
              <Body><Text>{ss.variant.name}</Text></Body>
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
    return (
      <Content
        padder
        contentContainerStyle={styles.searchScreen}
        refreshControl={
          <RefreshControl onRefresh={() => this.search(this.state.query)} refreshing={this.state.loading} />
        }>
        <Item rounded>
          <Icon active name='search' />
          <Input
            value={this.state.text}
            onChangeText={(text) => this.setState({query: text})}
            placeholder={"Enter a 5-digit stop number..."}
            keyboardType={'numeric'} />
        </Item>

        {this.renderList()}
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  searchScreen: {
    margin: 10,
    padding: 0,
  }
});

export default SearchScreen;
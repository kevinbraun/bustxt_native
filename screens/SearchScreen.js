import React from 'react';
import { RefreshControl, StyleSheet, } from 'react-native';
import {
  Card, CardItem, Content, List, ListItem, Text, Left, Body, Right, Item, Icon, Input, Label
} from 'native-base'
import _ from 'lodash';

import { API_KEY } from '../config/config';
import StopScheduleParser from '../services/StopScheduleParser';
import ScheduledStop from "../components/ScheduledStop";

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
    if(query.match(/^\d{5}$/)) {
      this.setState({loading: true});

      fetch(`https://api.winnipegtransit.com/v3/stops/${query}/schedule.json?api-key=${API_KEY}`)
        .then((response) => response.json())
        .then((response) => this.setState({resultData: new StopScheduleParser(response), loading: false}))
        .catch((error) => console.error(error));
    } else {
      this.setState({resultData: null})
    }
  }

  renderList() {
    let stop, schedule;

    if(!_.isEmpty(this.state.resultData)) {
      stop = this.state.resultData.stop();
      schedule = this.state.resultData.schedule();
    }

    if(stop && schedule) {
      return (
        <>
          <Card>
            <CardItem>
              <Body>
                <Text>
                  Results for {stop.number} - {stop.name}
                </Text>
              </Body>
            </CardItem>
          </Card>

          <List style={styles.resultList}>
            {schedule.map((ss) => <ScheduledStop ss={ss} key={ss.key}/> )}
          </List>
        </>
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
  },
  resultList: {
    marginBottom: 20,
  }
});

export default SearchScreen;
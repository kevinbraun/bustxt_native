import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {StyleSheet} from 'react-native';
import { Platform } from 'react-native';

import {
  Container, Content, Header, Body, Title, Item, Input, Icon, Left, Right
} from 'native-base';

import QueryResultsList from '../components/QueryResultsList'

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  textChange(text) {
    this.setState({text});
  }

  render() {
    return (
      <Container>
        <Header noLeft>
          <Left />
          <Body><Title>BUStxt</Title></Body>
          <Right />
        </Header>


        <Content
          style={styles.textInputView}>
          <Item rounded>
            <Icon active name='search' />
            <Input
              value={this.state.text}
              onChangeText={this.textChange.bind(this)}
              placeholder={"Enter a 5-digit stop number..."}
              keyboardType={'numeric'} />
          </Item>

          <QueryResultsList query={this.state.text} />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textInputView: {
    height: 100,
    padding: 2,
    margin: 5,
    borderColor: 'grey',
    borderRadius: 3,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

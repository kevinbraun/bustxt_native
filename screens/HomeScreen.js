import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';

import Container from "react-native-material-ui/src/Container";
import Toolbar from "react-native-material-ui/src/Toolbar";

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
        <Toolbar centerElement={'BUStxt'} />
        <View
          style={styles.textInputView}>
          <TextInput style={{margin: 10, fontSize: 32}}
            value={this.state.text}
            onChangeText={this.textChange.bind(this)}
            placeholder={"Enter a stop number"}
            keyboardType={'numeric'}
          />
        </View>
        <View>
          <QueryResultsList query={this.state.text} />
        </View>

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

import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class QueryResultsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      loaded: false,
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if((prevProps.query != this.props.query) && (this.props.query != '')) {
      this.search(this.props.query);
    }
  }

  search(query) {
    this.setState({loading: true})
    setTimeout(() => {
      this.setState({loading: false})
    }, 1200);
  }

  renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }

  renderList() {
    return (
      <Text>
        {"Your query is " + this.props.query}
      </Text>
    )
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
    backgroundColor: 'blue'
  }
});

export default QueryResultsList;
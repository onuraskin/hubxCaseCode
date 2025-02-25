import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../theme/Colors';

const MyGardenScreen = () => {
  return (
    <View style={styles.container}>
      <Text>My Garden Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background.default,
  },
});

export default MyGardenScreen; 
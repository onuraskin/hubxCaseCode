import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../theme/Colors';

const ScannerScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Scanner Screen</Text>
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

export default ScannerScreen; 
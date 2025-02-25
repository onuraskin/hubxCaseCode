import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image as RNImage,
  Animated,
  Keyboard,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../theme/Colors';
import {Images} from '../assets/png/index';

import {
  HomeScreen,
  DiagnoseScreen,
  ScannerScreen,
  MyGardenScreen,
  ProfileScreen,
} from '../screens';

const Tab = createBottomTabNavigator();

const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: Colors.tabBar.scanBorder,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <RNImage
        source={Images.tabbarscanner}
        style={{
          width: 32,
          height: 32,
          tintColor: Colors.white,
        }}
      />
    </View>
  </TouchableOpacity>
);

const TabNavigator = () => {
  const [scaleAnim] = React.useState(new Animated.Value(1));
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true),
    );
    const keyboardWillHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false),
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: [
          styles.tabBar,
          {display: isKeyboardVisible ? 'none' : 'flex'},
        ],
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray[400],
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: Platform.OS === 'ios' ? 0 : 8,
          marginTop: Platform.OS === 'ios' ? -10 : 0,
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === 'ios' ? 10 : 0,
        },
      }}
      screenListeners={{
        tabPress: () => {
          Animated.spring(scaleAnim, {
            toValue: 0.9,
            duration: 300,
            useNativeDriver: true,
            friction: 10,
            tension: 40,
          }).start(() => {
            Animated.spring(scaleAnim, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
              friction: 10,
              tension: 40,
            }).start();
          });
        },
      }}>
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Animated.View style={{transform: [{scale: scaleAnim}]}}>
              <Icon name="home" color={color} size={size} />
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="Diagnose"
        component={DiagnoseScreen}
        options={{
          tabBarLabel: 'Diagnose',
          tabBarIcon: ({color, size}) => (
            <Animated.View style={{transform: [{scale: scaleAnim}]}}>
              <Icon name="flower" color={color} size={size} />
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => null,
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="MyGarden"
        component={MyGardenScreen}
        options={{
          tabBarLabel: 'My Garden',
          tabBarIcon: ({color, size}) => (
            <Animated.View style={{transform: [{scale: scaleAnim}]}}>
              <Icon name="leaf" color={color} size={size} />
            </Animated.View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Animated.View style={{transform: [{scale: scaleAnim}]}}>
              <Icon name="person" color={color} size={size} />
            </Animated.View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 0,
    height: Platform.OS === 'ios' ? 85 : 72,
    borderRadius: 16,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
});

export default TabNavigator;

import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Images} from '../../assets/png';
import {Colors} from '../../theme/Colors';
import CustomButton from '../../components/CustomButton';

const {width, height} = Dimensions.get('window');

const getResponsiveSize = (size: number) => {
  return (width * size) / 375;
};

const getResponsiveHeight = (size: number) => {
  return (height * size) / 812;
};

interface OnboardingScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const GetStartedScreen: React.FC<OnboardingScreenProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image source={Images.background} style={styles.backgroundImage} />
      <View
        style={[styles.content, Platform.OS === 'ios' && styles.iosContent]}>
        <Text style={styles.title}>
          Welcome to <Text style={styles.boldText}>PlantApp</Text>
        </Text>
        <Text style={styles.subtitle}>
          Identify more than 3000+ plants and 88% accuracy.
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <Image source={Images.water} style={styles.waterIcon} />
        <Image source={Images.sun} style={styles.sunIcon} />
        <Image source={Images.plantApp} style={styles.mainImage} />
        <Image source={Images.camera} style={styles.cameraIcon} />
        <Image source={Images.spray} style={styles.sprayIcon} />
      </View>

      <View style={styles.footer}>
        <CustomButton
          title="Get Started"
          onPress={() => navigation.navigate('OnboardingHome')}
        />
        <Text style={styles.terms}>
          By tapping next, you are agreeing to PlantID
          <Text style={styles.link}> Terms of Use</Text> &
          <Text style={styles.link}> Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  time: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  content: {
    paddingHorizontal: getResponsiveSize(24),
    paddingTop: getResponsiveHeight(15),
    position: 'absolute',
    top: getResponsiveHeight(15),
  },
  iosContent: {
    paddingTop: getResponsiveHeight(50),
    top: getResponsiveHeight(0),
  },
  title: {
    fontSize: getResponsiveSize(28),
    color: Colors.text.primary,
    alignSelf: 'center',
    fontFamily: 'Rubik-Light',
  },
  boldText: {
    fontFamily: 'Rubik-Bold',
  },
  subtitle: {
    fontSize: getResponsiveSize(16),
    color: Colors.text.primary,
    marginTop: getResponsiveHeight(5),
    paddingHorizontal: getResponsiveSize(20),
    alignSelf: 'center',
    fontFamily: 'Rubik-Light',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: width,
  },
  mainImage: {
    width: width,
    height: height * 0.61,
    resizeMode: 'contain',
  },
  sprayIcon: {
    position: 'absolute',
    top: getResponsiveHeight(130),
    left: getResponsiveSize(15),
    width: getResponsiveSize(130),
    height: getResponsiveSize(240),
  },
  cameraIcon: {
    position: 'absolute',
    top: getResponsiveHeight(160),
    left: getResponsiveSize(30),
    width: getResponsiveSize(320),
    height: getResponsiveSize(320),
  },
  sunIcon: {
    position: 'absolute',
    top: getResponsiveHeight(170),
    right: getResponsiveSize(0),
    width: getResponsiveSize(150),
    height: getResponsiveSize(225),
  },
  waterIcon: {
    position: 'absolute',
    bottom: getResponsiveHeight(110),
    right:
      Platform.OS === 'ios' ? getResponsiveSize(40) : getResponsiveSize(50),
    width: getResponsiveSize(150),
    height: getResponsiveSize(200),
  },
  footer: {
    paddingBottom:
      Platform.OS === 'ios' ? getResponsiveHeight(50) : getResponsiveHeight(24),
    paddingHorizontal: getResponsiveSize(24),
    alignItems: 'center',
    position: 'absolute',
    bottom: getResponsiveHeight(15),
  },
  terms: {
    fontSize: getResponsiveSize(11),
    color: Colors.text.bottom,
    textAlign: 'center',
    paddingHorizontal: getResponsiveSize(50),
    marginTop: getResponsiveHeight(15),
  },
  link: {
    color: Colors.text.bottom,
    textDecorationLine: 'underline',
  },
});

export default GetStartedScreen;

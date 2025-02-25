import React, {useState} from 'react';
import {
  View as RNView,
  Text as RNText,
  StyleSheet,
  SafeAreaView as RNSafeAreaView,
  Image as RNImage,
  Dimensions,
  TouchableOpacity as RNTouchableOpacity,
  ScrollView,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  BackHandler,
  Platform,
} from 'react-native';
import {Colors} from '../../theme/Colors';
import {Images} from '../../assets/png';
import CustomButton from '../../components/CustomButton';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import PremiumFeatureCard from '../../components/PremiumFeatureCard';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import {useAppDispatch} from '../../hooks/redux';
import {setHasSeenOnboarding} from '../../store/slices/userSlice';

const {width, height} = Dimensions.get('window');

const getResponsiveSize = (size: number) => {
  return (width * size) / 375;
};

const getResponsiveHeight = (size: number) => {
  return (height * size) / 812;
};

interface OnboardingHomeScreenProps {
  navigation: NativeStackNavigationProp<any>;
}

const OnboardingHomeScreen: React.FC<OnboardingHomeScreenProps> = ({
  navigation,
}) => {
  const dispatch = useAppDispatch();
  const flatListRef = React.useRef<FlatList>(null);
  const [currentBoard, setCurrentBoard] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>(
    'yearly',
  );

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const handleContinue = () => {
    if (currentBoard < 2) {
      flatListRef.current?.scrollToIndex({
        index: currentBoard + 1,
        animated: true,
      });
      setCurrentBoard(currentBoard + 1);
    } else {
      navigation.navigate('MainApp');
    }
  };

  const handleFinishOnboarding = () => {
    dispatch(setHasSeenOnboarding(true));
    navigation.navigate('MainApp');
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffset = event.nativeEvent.contentOffset;
    const viewSize = event.nativeEvent.layoutMeasurement;
    const pageNum = Math.floor(contentOffset.x / viewSize.width);
    setCurrentBoard(pageNum);
  };

  const renderItem = ({item}: {item: number}) => {
    return renderBoard(item);
  };

  const renderBoard = (index: number) => {
    switch (index) {
      case 0:
        return (
          <RNView
            style={[
              styles.boardContainer,
              Platform.OS === 'ios' && styles.iosBoardContainer,
            ]}>
            <RNView style={styles.titleContainer}>
              <RNText style={styles.title}>
                Take a photo to
                <RNText style={styles.highlightText}> identify</RNText> {'\n'}
                the plant!
              </RNText>
              <RNImage
                source={Images.onboarding1brush}
                style={styles.brushImage}
                resizeMode="contain"
              />
            </RNView>
            <RNView style={styles.imageContainer}>
              <RNImage
                source={Images.onboarding1phone}
                style={styles.phoneImage}
                resizeMode="contain"
              />
            </RNView>
          </RNView>
        );
      case 1:
        return (
          <RNView
            style={[
              styles.boardContainer,
              Platform.OS === 'ios' && styles.iosBoardContainer,
            ]}>
            <RNImage
              source={Images.background2}
              style={styles.blurBackground}
              resizeMode="contain"
            />
            <RNView style={styles.titleContainer2}>
              <RNText style={[styles.title, styles.titleCenter]}>
                Get plant{' '}
                <RNText style={styles.highlightText}>care guides</RNText>
              </RNText>
              <RNImage
                source={Images.onboarding1brush}
                style={[styles.brushImage, styles.brushImage2]}
                resizeMode="contain"
              />
            </RNView>
            <RNView style={styles.imageContainer}>
              <RNImage
                source={Images.onboarding2phone}
                style={styles.phoneImage2}
                resizeMode="contain"
              />
              <RNImage
                source={Images.onboarding2twopot}
                style={styles.twoPotImage}
                resizeMode="contain"
              />
              <RNImage
                source={Images.spray}
                style={styles.sprayIconBoard2}
                resizeMode="contain"
              />
              <RNImage
                source={Images.sun}
                style={styles.sunIconBoard2}
                resizeMode="contain"
              />
            </RNView>
          </RNView>
        );
      case 2:
        return (
          <RNView style={[styles.boardContainer, styles.board3Container]}>
            <RNImage
              source={Images.background3}
              style={styles.background3Image}
              resizeMode="cover"
            />
            <RNView style={styles.premiumContainer}>
              <RNText style={styles.premiumTitle}>
                <RNText style={styles.plantAppText}>PlantApp</RNText> Premium
              </RNText>
              <RNText style={styles.premiumSubtitle}>
                Access All Features
              </RNText>

              <RNView style={styles.featuresContainer}>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    paddingHorizontal: getResponsiveSize(10),
                    paddingVertical: getResponsiveSize(8),
                  }}
                  style={styles.featuresScroll}
                  decelerationRate="fast"
                  snapToInterval={getResponsiveSize(200)}
                  onTouchStart={() => {
                    if (flatListRef.current) {
                      flatListRef.current.setNativeProps({
                        scrollEnabled: false,
                      });
                    }
                  }}
                  onMomentumScrollEnd={() => {
                    if (flatListRef.current) {
                      flatListRef.current.setNativeProps({scrollEnabled: true});
                    }
                  }}>
                  <PremiumFeatureCard
                    icon={Images.scanner}
                    title="Unlimited"
                    description="Plant Identify"
                  />
                  <PremiumFeatureCard
                    icon={Images.speedmeter}
                    title="Faster"
                    description="Process"
                  />
                  <PremiumFeatureCard
                    icon={Images.scanner}
                    title="Detailed"
                    description="Plant Care"
                  />
                  <PremiumFeatureCard
                    icon={Images.speedmeter}
                    title="Smart"
                    description="Search"
                  />
                </ScrollView>
              </RNView>

              <RNView style={styles.planContainer}>
                <RNTouchableOpacity onPress={() => setSelectedPlan('monthly')}>
                  <RNView
                    style={[
                      styles.planOption,
                      selectedPlan === 'monthly' && styles.planOptionSelected,
                    ]}>
                    {renderRadioButton(selectedPlan === 'monthly')}
                    <RNView style={styles.planInfo}>
                      <RNText style={styles.planDuration}>1 Month</RNText>
                      <RNText style={styles.planPrice}>
                        $2.99/month, auto renewable
                      </RNText>
                    </RNView>
                  </RNView>
                </RNTouchableOpacity>

                <RNTouchableOpacity onPress={() => setSelectedPlan('yearly')}>
                  <RNView
                    style={[
                      styles.planOption,
                      selectedPlan === 'yearly' && styles.planOptionSelected,
                    ]}>
                    {renderRadioButton(selectedPlan === 'yearly')}
                    <RNView style={styles.planInfo}>
                      <RNText style={styles.planDuration}>1 Year</RNText>
                      <RNText style={styles.planPrice}>
                        First 3 days free, then $529.99/year
                      </RNText>
                    </RNView>
                    <RNView style={styles.saveTag}>
                      <RNText style={styles.saveText}>Save 50%</RNText>
                    </RNView>
                  </RNView>
                </RNTouchableOpacity>
              </RNView>
            </RNView>
          </RNView>
        );
      default:
        return null;
    }
  };

  const renderRadioButton = (isSelected: boolean) => (
    <RNView
      style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
      {isSelected && (
        <RNView
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: Colors.text.light,
            margin: 6,
          }}
        />
      )}
    </RNView>
  );

  return (
    <RNSafeAreaView
      style={[
        styles.container,
        Platform.OS === 'ios' && currentBoard === 2 && styles.board3Container,
      ]}>
      <RNImage
        source={Images.background}
        style={[
          styles.backgroundImage,
          Platform.OS === 'ios' && currentBoard === 2 && styles.hideBackground,
        ]}
      />

      {currentBoard === 2 && (
        <RNTouchableOpacity
          style={styles.closeButton}
          onPress={handleFinishOnboarding}>
          <Icon name="close" size={24} color={Colors.text.light} />
        </RNTouchableOpacity>
      )}

      <FlatList
        ref={flatListRef}
        data={[0, 1, 2]}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        nestedScrollEnabled={true}
        scrollEventThrottle={16}
        keyExtractor={item => item.toString()}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />

      <RNView style={styles.footerContainer}>
        <RNView style={styles.buttonContainer}>
          <CustomButton
            title={currentBoard === 2 ? 'Try free for 3 days' : 'Continue'}
            onPress={
              currentBoard === 2 ? handleFinishOnboarding : handleContinue
            }
          />
          <RNText style={styles.termsText}>
            After the 3-day free trial period you'll be charged $274.99 per year
            unless you cancel before the trial expires. Yearly Subscription is
            Auto-Renewable
          </RNText>
        </RNView>
        {currentBoard === 2 ? null : (
          <RNView style={styles.paginationContainer}>
            {[0, 1, 2].map(index => (
              <RNView
                key={index}
                style={[
                  styles.paginationDot,
                  currentBoard === index && styles.paginationDotActive,
                ]}
              />
            ))}
          </RNView>
        )}
        <RNView style={styles.linksContainer}>
          <RNText style={styles.linkText}>Terms</RNText>
          <RNText style={styles.dotSeparator}>•</RNText>
          <RNText style={styles.linkText}>Privacy</RNText>
          <RNText style={styles.dotSeparator}>•</RNText>
          <RNText style={styles.linkText}>Restore</RNText>
        </RNView>
      </RNView>
    </RNSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.dark,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: Platform.OS === 'ios' ? '120%' : '100%',
    resizeMode: 'cover',
    opacity: 1,
  },
  hideBackground: {
    opacity: 0,
  },
  boardContainer: {
    width: width,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    overflow: Platform.OS === 'ios' ? 'hidden' : 'visible',
  },
  board3Container: {
    backgroundColor: Colors.onboarding.board3.background,
  },
  iosBoardContainer: {
    backgroundColor: 'transparent',
    marginBottom: Platform.OS === 'ios' ? -getResponsiveHeight(20) : 0,
  },
  titleContainer: {
    alignItems: 'center',
    position: 'relative',
    marginBottom: getResponsiveHeight(15),
    marginTop: Platform.OS === 'ios' ? 0 : getResponsiveHeight(40),
    width: '100%',
    zIndex: 1,
  },
  titleContainer2: {
    alignItems: 'center',
    position: 'relative',
    marginBottom: getResponsiveHeight(15),
    marginTop: Platform.OS === 'ios' ? 0 : getResponsiveHeight(20),
    width: '100%',
    zIndex: 1,
  },
  title: {
    fontSize: getResponsiveSize(30),
    lineHeight: getResponsiveSize(42),
    color: Colors.text.primary,
    textAlign: 'left',
    fontFamily: 'Rubik-Medium',
    fontWeight: '500',
    letterSpacing: -0.8,
    paddingHorizontal: getResponsiveSize(20),
  },
  highlightText: {
    fontFamily: 'Rubik-Bold',
    fontWeight: '500',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    position: 'relative',
    zIndex: 1,
    marginBottom: Platform.OS === 'ios' ? 0 : -getResponsiveHeight(80),
  },

  brushImage: {
    position: 'absolute',
    width: width * 0.35,
    height: getResponsiveSize(13),
    top: getResponsiveHeight(35),
    right: getResponsiveSize(30),
  },
  brushImage2: {
    top: getResponsiveHeight(50),
    right: getResponsiveSize(10),
    width: width * 0.6,
  },
  phoneImage: {
    width: width,
    height: Platform.OS === 'ios' ? height * 0.75 : height * 0.82,
    resizeMode: 'contain',
  },
  phoneImage2: {
    width: width * 0.7,
    height: Platform.OS === 'ios' ? height * 0.7 : height * 0.75,
    marginTop: getResponsiveHeight(20),
    zIndex: 0,
  },
  twoPotImage: {
    position: 'absolute',
    width: width * 0.5,
    height: width * 0.5,
    top: getResponsiveHeight(0),
    right: getResponsiveSize(10),
    zIndex: 1,
  },
  footerContainer: {
    width: '100%',
    position: 'absolute',
    bottom: getResponsiveHeight(10),
    alignItems: 'center',
    zIndex: 2,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: getResponsiveSize(8),
  },
  paginationDot: {
    width: getResponsiveSize(8),
    height: getResponsiveSize(8),
    borderRadius: getResponsiveSize(4),
    backgroundColor: 'rgba(19, 35, 27, 0.25)',
    marginHorizontal: getResponsiveHeight(2),
  },
  paginationDotActive: {
    backgroundColor: Colors.text.primary,
    width: getResponsiveSize(10),
    height: getResponsiveSize(10),
    borderRadius: getResponsiveSize(5),
    marginHorizontal: getResponsiveHeight(2),
  },
  text: {
    fontSize: getResponsiveSize(28),
    color: Colors.text.primary,
    textAlign: 'center',
    paddingHorizontal: getResponsiveSize(24),
    fontFamily: 'Rubik-Regular',
    fontWeight: '500',
  },
  titleCenter: {
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: getResponsiveHeight(10),
    fontFamily: 'Rubik-Regular',
    fontWeight: '500',
  },
  blurBackground: {
    position: 'absolute',
    width: width * 1.5,
    height: height * 1.5,
    opacity: 0.6,
    transform: [{rotate: '-74deg'}],
    top: -height * 0.3,
    left: -width * 0.1,
    zIndex: 0,
  },
  sprayIconBoard2: {
    position: 'absolute',
    width: width * 0.3,
    height: width * 0.4,
    top: getResponsiveHeight(-10),
    right: getResponsiveSize(120),
    zIndex: 2,
  },
  sunIconBoard2: {
    position: 'absolute',
    width: width * 0.35,
    height: width * 0.35,
    top: getResponsiveHeight(30),
    right: getResponsiveSize(-30),
    zIndex: 2,
  },

  background3Image: {
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
  },
  premiumContainer: {
    padding: getResponsiveSize(24),
    marginTop:
      Platform.OS === 'ios'
        ? -getResponsiveHeight(130)
        : -getResponsiveHeight(190),
  },
  premiumTitle: {
    fontSize: getResponsiveSize(30),
    color: Colors.text.light,
    fontFamily: 'Rubik-Regular',
    marginBottom: getResponsiveHeight(4),
  },
  plantAppText: {
    fontFamily: 'Rubik-Bold',
  },
  premiumSubtitle: {
    fontSize: getResponsiveSize(17),
    color: Colors.text.light,
    fontFamily: 'Rubik-Light',
    opacity: 0.7,
  },
  featuresContainer: {
    height: getResponsiveHeight(140),
    marginBottom: getResponsiveSize(10),
    overflow: 'visible',
  },
  featuresScroll: {
    height: '100%',
  },
  planContainer: {
    marginVertical: getResponsiveSize(15),
  },
  planOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: getResponsiveSize(10),
    backgroundColor: Colors.onboarding.board3.planBackground,
    borderRadius: 20,
    marginBottom: getResponsiveSize(10),
    opacity: 1,
    width: width - getResponsiveSize(20),
    borderWidth: 1,
    borderColor: Colors.onboarding.board3.planBorder,
    position: 'relative',
    overflow: 'hidden',
  },
  planOptionSelected: {
    borderColor: Colors.onboarding.board3.selectedBorder,
  },
  radioButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.text.light,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 3,
  },
  radioButtonSelected: {
    borderColor: Colors.onboarding.board3.selectedBorder,
    backgroundColor: Colors.onboarding.board3.selectedBorder,
  },
  planInfo: {
    flex: 1,
    marginLeft: getResponsiveSize(12),
  },
  planDuration: {
    fontSize: getResponsiveSize(16),
    color: Colors.text.light,
    fontFamily: 'Rubik-Medium',
    marginBottom: getResponsiveSize(2),
  },
  planPrice: {
    fontSize: getResponsiveSize(12),
    color: Colors.text.light,
    fontFamily: 'Rubik-Regular',
    opacity: 0.7,
  },
  saveTag: {
    backgroundColor: Colors.onboarding.board3.saveTag,
    paddingHorizontal: getResponsiveSize(12),
    paddingVertical: getResponsiveSize(6),
    position: 'absolute',
    right: getResponsiveSize(-10),
    top: getResponsiveSize(-5),
    borderBottomLeftRadius: 20,
    borderWidth: 2,
    borderColor: Colors.background.dark,
    zIndex: 2,
  },
  saveText: {
    color: Colors.text.light,
    fontSize: getResponsiveSize(12),
    fontFamily: 'Rubik-Medium',
    letterSpacing: 0.2,
    textAlign: 'center',
    minWidth: getResponsiveSize(80),
  },
  termsText: {
    fontSize: getResponsiveSize(10),
    color: Colors.text.light,
    textAlign: 'center',
    fontFamily: 'Rubik-Light',
    opacity: 0.7,
    marginTop: getResponsiveSize(10),
  },
  linksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkText: {
    fontSize: getResponsiveSize(11),
    color: Colors.text.light,
    fontFamily: 'Rubik-Regular',
    opacity: 0.5,
  },
  dotSeparator: {
    fontSize: getResponsiveSize(11),
    color: Colors.text.light,
    opacity: 0.5,
  },
  closeButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? getResponsiveSize(100) : getResponsiveSize(30),
    right: getResponsiveSize(30),
    zIndex: 10,
    width: getResponsiveSize(24),
    height: getResponsiveSize(24),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: getResponsiveSize(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default OnboardingHomeScreen;

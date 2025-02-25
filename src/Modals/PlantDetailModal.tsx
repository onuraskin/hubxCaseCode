import React, {useRef, useEffect} from 'react';
import {
  View as RNView,
  Text as RNText,
  StyleSheet,
  Modal,
  Image as RNImage,
  TouchableOpacity,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../theme/Colors';

const {width, height} = Dimensions.get('window');

const getResponsiveSize = (size: number) => {
  return (width * size) / 375;
};

interface PlantDetailModalProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  imageUrl: string;
}

const PlantDetailModal: React.FC<PlantDetailModalProps> = ({
  visible,
  onClose,
  title,
  imageUrl,
}) => {
  const panY = useRef(new Animated.Value(0)).current;

  // Modal açıldığında panY değerini sıfırla
  useEffect(() => {
    if (visible) {
      panY.setValue(0);
    }
  }, [visible]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      // Sadece aşağı yönlü harekete izin ver
      if (gestureState.dy > 0) {
        panY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dy > 100) {
        Animated.timing(panY, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }).start(onClose);
      } else {
        Animated.spring(panY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}>
      <RNView style={styles.container}>
        <Animated.View
          style={[
            styles.content,
            {
              transform: [{translateY: panY}],
            },
          ]}
          {...panResponder.panHandlers}>
          <RNView style={styles.dragIndicator} />

          <RNImage
            source={{uri: imageUrl}}
            style={styles.image}
            resizeMode="contain"
          />

          <RNText style={styles.title}>{title}</RNText>

          <RNText style={styles.description}>
            {title} are fascinating plants that have evolved to thrive in
            various environments. These resilient species have unique
            characteristics that make them popular choices for both indoor and
            outdoor gardens. With proper care and attention, they can flourish
            and bring natural beauty to any space.
          </RNText>

          <RNText style={styles.careInfo}>
            🌱 Light: Bright, indirect sunlight{'\n'}
            💧 Water: Moderate watering{'\n'}
            🌡️ Temperature: 18-24°C (65-75°F){'\n'}
            💨 Humidity: Average room humidity
          </RNText>

          <RNView style={styles.swipeHintContainer}>
            <RNText style={styles.swipeHintText}>Swipe down to close</RNText>
            <Icon name="chevron-down" size={16} color={Colors.text.gray} />
          </RNView>
        </Animated.View>
      </RNView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: Colors.background.white,
    width: '85%',
    borderRadius: getResponsiveSize(20),
    padding: getResponsiveSize(20),
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: getResponsiveSize(12),
    top: getResponsiveSize(12),
    zIndex: 1,
  },
  image: {
    width: getResponsiveSize(200),
    height: getResponsiveSize(200),
    marginVertical: getResponsiveSize(16),
    alignSelf: 'flex-end',
  },
  title: {
    fontSize: getResponsiveSize(24),
    color: Colors.text.dark,
    fontFamily: 'Rubik-Medium',
    marginBottom: getResponsiveSize(12),
    textAlign: 'center',
  },
  description: {
    fontSize: getResponsiveSize(14),
    color: Colors.text.black,
    fontFamily: 'Rubik-Regular',
    textAlign: 'center',
    marginBottom: getResponsiveSize(16),
    lineHeight: getResponsiveSize(20),
  },
  careInfo: {
    fontSize: getResponsiveSize(14),
    color: Colors.text.dark,
    fontFamily: 'Rubik-Regular',
    lineHeight: getResponsiveSize(24),
    backgroundColor: Colors.background.default,
    padding: getResponsiveSize(16),
    borderRadius: getResponsiveSize(12),
    width: '100%',
  },
  dragIndicator: {
    width: getResponsiveSize(40),
    height: getResponsiveSize(4),
    backgroundColor: Colors.text.gray,
    borderRadius: getResponsiveSize(2),
    alignSelf: 'center',
    marginBottom: getResponsiveSize(16),
  },
  swipeHintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getResponsiveSize(16),
    opacity: 0.6,
  },
  swipeHintText: {
    fontSize: getResponsiveSize(12),
    color: Colors.text.gray,
    fontFamily: 'Rubik-Regular',
    marginRight: getResponsiveSize(4),
  },
});

export default PlantDetailModal;

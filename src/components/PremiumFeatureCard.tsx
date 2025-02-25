import React from 'react';
import {
  View as RNView,
  Text as RNText,
  StyleSheet,
  Image as RNImage,
  Dimensions,
} from 'react-native';
import {Colors} from '../theme/Colors';

const {width} = Dimensions.get('window');

const getResponsiveSize = (size: number) => {
  return (width * size) / 375;
};

interface PremiumFeatureCardProps {
  icon: any;
  title: string;
  description: string;
}

const PremiumFeatureCard: React.FC<PremiumFeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <RNView style={styles.container}>
      <RNImage source={icon} style={styles.icon} resizeMode="contain" />
      <RNText style={styles.title}>{title}</RNText>
      <RNText style={styles.description}>{description}</RNText>
    </RNView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: getResponsiveSize(156),
    height: getResponsiveSize(130),
    backgroundColor: Colors.premium.cardBg,
    borderRadius: 14,
    padding: 16,
    marginRight: 8,
  },
  icon: {
    width: getResponsiveSize(32),
    height: getResponsiveSize(32),
    marginBottom: 8,
  },
  title: {
    fontSize: getResponsiveSize(20),
    color: Colors.text.light,
    fontFamily: 'Rubik-Medium',
    marginBottom: 4,
  },
  description: {
    fontSize: getResponsiveSize(13),
    color: Colors.text.light,
    fontFamily: 'Rubik-Regular',
    opacity: 0.7,
  },
});

export default PremiumFeatureCard;

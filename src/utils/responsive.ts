import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const getResponsiveSize = (size: number) => {
  return (width * size) / 375;
};

export const getResponsiveHeight = (size: number) => {
  return (height * size) / 812;
};

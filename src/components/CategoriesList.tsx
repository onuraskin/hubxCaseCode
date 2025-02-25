import React from 'react';
import {
  View as RNView,
  Text as RNText,
  StyleSheet,
  Image as RNImage,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../theme/Colors';
import {getResponsiveSize} from '../utils/responsive';

interface Category {
  id: number;
  title: string;
  name: string;
  rank: number;
  image: {
    url: string;
  };
}

interface CategoriesListProps {
  category: Category;
  onCategoryPress?: (category: Category) => void;
  index: number;
}

const CategoriesList: React.FC<CategoriesListProps> = ({
  category,
  onCategoryPress,
  index,
}) => {
  if (!category.image?.url || !category.title) return null;

  const formatTitle = (title: string) => {
    const words = title.split(' ');
    let lines = [];
    let currentLine = '';

    words.forEach(word => {
      if ((currentLine + word).length <= 9) {
        currentLine += (currentLine ? ' ' : '') + word;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    });
    if (currentLine) lines.push(currentLine);

    return lines.join('\n');
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        index % 2 === 0 ? styles.leftCard : styles.rightCard,
      ]}
      onPress={() => onCategoryPress?.(category)}>
      <RNText style={styles.title}>{formatTitle(category.title)}</RNText>
      <RNImage
        source={{uri: category.image.url}}
        style={styles.image}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '44%',
    height: getResponsiveSize(165),
    backgroundColor: Colors.background.white,
    borderRadius: getResponsiveSize(12),
    marginBottom: getResponsiveSize(16),
    padding: getResponsiveSize(16),
    overflow: 'hidden',
    position: 'relative',
  },
  leftCard: {
    marginLeft: getResponsiveSize(24),
    marginRight: getResponsiveSize(8),
  },
  rightCard: {
    marginLeft: getResponsiveSize(8),
    marginRight: getResponsiveSize(24),
  },
  title: {
    fontSize: getResponsiveSize(16),
    color: Colors.text.dark,
    fontFamily: 'Rubik-Medium',
    marginBottom: getResponsiveSize(8),
    lineHeight: getResponsiveSize(20),
    width: '70%', // Resmin altına taşmaması için genişliği sınırla
  },
  image: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: getResponsiveSize(140),
    height: getResponsiveSize(140),
  },
});

export default CategoriesList;

import React from 'react';
import {
  View as RNView,
  Text as RNText,
  StyleSheet,
  ScrollView,
  Image as RNImage,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../theme/Colors';
import {getResponsiveSize} from '../utils/responsive';

interface Question {
  id: number;
  title: string;
  subtitle: string;
  image_uri: string;
  uri: string;
  order: number;
}

interface QuestionsListProps {
  questions: Question[];
  onQuestionPress?: (question: Question) => void;
}

const QuestionsList: React.FC<QuestionsListProps> = ({
  questions,
  onQuestionPress,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {questions.map(
        question =>
          question.image_uri && (
            <TouchableOpacity
              key={question.id}
              style={styles.card}
              onPress={() => onQuestionPress?.(question)}>
              <RNImage
                source={{uri: question.image_uri}}
                style={styles.image}
                resizeMode="cover"
              />
              <RNView style={styles.textContainer}>
                <RNText style={styles.subtitle}>{question.subtitle}</RNText>
                <RNText style={styles.title}>{question.title}</RNText>
              </RNView>
            </TouchableOpacity>
          ),
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getResponsiveSize(24),
    paddingVertical: getResponsiveSize(16),
  },
  card: {
    width: getResponsiveSize(240),
    height: getResponsiveSize(164),
    marginRight: getResponsiveSize(10),
    borderRadius: getResponsiveSize(12),
    overflow: 'hidden',
    backgroundColor: Colors.background.dark,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: getResponsiveSize(16),
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  subtitle: {
    fontSize: getResponsiveSize(12),
    color: Colors.text.light,
    fontFamily: 'Rubik-Regular',
    opacity: 0.8,
  },
  title: {
    fontSize: getResponsiveSize(15),
    color: Colors.text.light,
    fontFamily: 'Rubik-Medium',
    marginTop: getResponsiveSize(4),
  },
});

export default QuestionsList;

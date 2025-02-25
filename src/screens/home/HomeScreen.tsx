import React, {useEffect, useMemo, useState} from 'react';
import {
  View as RNView,
  Text as RNText,
  StyleSheet,
  SafeAreaView,
  Image as RNImage,
  TouchableOpacity as RNTouchableOpacity,
  TextInput,
  ActivityIndicator,
  Modal,
  FlatList,
  BackHandler,
  RefreshControl,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Images} from '../../assets/png';
import {Colors} from '../../theme/Colors';
import {getResponsiveSize} from '../../utils/responsive';
import {useAppDispatch, useAppSelector} from '../../hooks/redux';
import {getQuestions, getCategories} from '../../services';
import {QuestionsList, CategoriesList} from '../../components';
import {
  setCategories,
  setLoading as setCategoriesLoading,
} from '../../store/slices/categoriesSlice';
import {
  setQuestions,
  setLoading as setQuestionsLoading,
} from '../../store/slices/questionsSlice';
import {useFocusEffect} from '@react-navigation/native';
import PlantDetailModal from '../../Modals/PlantDetailModal';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const {questions, loading: questionsLoading} = useAppSelector(
    state => state.questions,
  );
  const {categories, loading: categoriesLoading} = useAppSelector(
    state => state.categories,
  );
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<{
    title: string;
    image: {url: string};
  } | null>(null);

  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good Morning!' : 'Good Afternoon!';

  const fetchData = async () => {
    try {
      dispatch(setQuestionsLoading(true));
      dispatch(setCategoriesLoading(true));

      try {
        const questionsResponse = await getQuestions();
        dispatch(setQuestions(questionsResponse || []));
      } catch (error) {
        console.error('Questions fetch error:', error);
        dispatch(setQuestions([]));
      }

      try {
        const categoriesResponse = await getCategories();
        dispatch(setCategories(categoriesResponse || []));
      } catch (error) {
        console.error('Categories fetch error:', error);
        dispatch(setCategories([]));
      }
    } finally {
      dispatch(setQuestionsLoading(false));
      dispatch(setCategoriesLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    /*     console.log('Questions from store:', questions); */
  }, [questions]);

  const handleQuestionPress = (question: any) => {
    /*  console.log('Question pressed:', question); */
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      // Cleanup
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  // Filtrelenmiş veriler
  const filteredData = useMemo(() => {
    const searchLower = searchText.toLowerCase().trim();

    return {
      questions: searchLower
        ? questions.filter(
            q =>
              q.title.toLowerCase().includes(searchLower) ||
              q.subtitle.toLowerCase().includes(searchLower),
          )
        : questions,

      categories: searchLower
        ? categories.filter(c => c.title.toLowerCase().includes(searchLower))
        : categories,
    };
  }, [categories, questions, searchText]);

  const renderHeader = useMemo(() => {
    return (
      <>
        <RNView style={styles.header}>
          <RNText style={styles.welcomeText}>Hi, plant lover!</RNText>
          <RNText style={styles.greetingText}>{greeting} ⛅</RNText>
        </RNView>

        <RNView style={styles.searchSection}>
          <RNImage
            source={Images.leaf}
            style={styles.leafBackground}
            resizeMode="stretch"
          />
          <RNView style={styles.searchContainer}>
            <RNView style={styles.searchInputContainer}>
              <Icon
                name="search"
                size={20}
                color={Colors.input.placeholder}
                style={styles.searchIcon}
              />
              <TextInput
                placeholder="Search for plants"
                placeholderTextColor={Colors.input.placeholder}
                style={styles.searchInput}
                value={searchText}
                onChangeText={setSearchText}
              />
            </RNView>
          </RNView>
        </RNView>

        <RNTouchableOpacity
          style={styles.premiumButton}
          onPress={() => {
            /*   console.log('Premium button pressed'); */
          }}>
          <RNView style={styles.premiumContent}>
            <RNImage source={Images.messagebox} style={styles.messageIcon} />
            <RNView style={styles.premiumTexts}>
              <RNText style={styles.premiumText}>FREE Premium Available</RNText>
              <RNText style={styles.tapText}>
                Tap to upgrade your account!
              </RNText>
            </RNView>
            <Icon
              name="chevron-forward"
              size={24}
              color={Colors.premium.arrowIcon}
              style={styles.arrowIcon}
            />
          </RNView>
        </RNTouchableOpacity>

        <RNText style={styles.sectionTitle}>Get Started</RNText>
        <QuestionsList
          questions={filteredData.questions}
          onQuestionPress={handleQuestionPress}
        />
      </>
    );
  }, [greeting, filteredData.questions, searchText]);

  return (
    <SafeAreaView style={styles.container}>
      <RNView style={styles.content}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={questionsLoading || categoriesLoading}
              onRefresh={fetchData}
              tintColor={Colors.primary}
              colors={[Colors.primary]}
              progressBackgroundColor={Colors.background.white}
            />
          }
          ListHeaderComponent={renderHeader}
          data={filteredData.categories}
          numColumns={2}
          renderItem={({item, index}) => (
            <CategoriesList
              category={item}
              index={index}
              onCategoryPress={category => {
                setSelectedCategory(category);
              }}
            />
          )}
          keyExtractor={item => `category-${item.id}`}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        />
      </RNView>

      <PlantDetailModal
        visible={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
        title={selectedCategory?.title || ''}
        imageUrl={selectedCategory?.image?.url || ''}
      />

      <Modal visible={questionsLoading || categoriesLoading} transparent>
        <RNView
          style={[
            styles.blurContainer,
            {backgroundColor: 'rgba(255,255,255,0.8)'},
          ]}>
          <ActivityIndicator size="large" color={Colors.background.dark} />
        </RNView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.default,
  },
  content: {
    flex: 1,
  },
  header: {
    marginTop: getResponsiveSize(16),
    paddingHorizontal: getResponsiveSize(24),
  },
  welcomeText: {
    fontSize: getResponsiveSize(16),
    color: Colors.text.black,
    fontFamily: 'Rubik-Regular',
  },
  greetingText: {
    fontSize: getResponsiveSize(24),
    color: Colors.text.dark,
    fontFamily: 'Rubik-Medium',
    marginTop: getResponsiveSize(4),
  },
  searchSection: {
    marginTop: getResponsiveSize(5),
    height: getResponsiveSize(60),
    width: '100%',
    position: 'relative',
  },
  leafBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    right: 0,
    resizeMode: 'cover',
  },
  searchContainer: {
    position: 'absolute',
    top: getResponsiveSize(8),
    marginHorizontal: getResponsiveSize(24),
    height: getResponsiveSize(44),
    left: 0,
    right: 0,
    backgroundColor: Colors.background.default,
    borderRadius: getResponsiveSize(8),
    borderWidth: 0.2,
    borderColor: Colors.input.border,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getResponsiveSize(16),
  },
  searchIcon: {
    marginRight: getResponsiveSize(8),
  },
  searchInput: {
    flex: 1,
    fontSize: getResponsiveSize(15),
    color: Colors.text.black,
    fontFamily: 'Rubik-Regular',
    padding: 0,
  },
  premiumButton: {
    backgroundColor: Colors.background.dark,
    marginTop: getResponsiveSize(15),
    marginHorizontal: getResponsiveSize(24),
    padding: getResponsiveSize(10),
    borderRadius: getResponsiveSize(12),
  },
  premiumContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  messageIcon: {
    width: getResponsiveSize(45),
    height: getResponsiveSize(45),
    marginRight: getResponsiveSize(12),
  },
  premiumTexts: {
    flex: 1,
  },
  premiumText: {
    color: Colors.premium.highlight,
    fontSize: getResponsiveSize(16),
    fontFamily: 'Rubik-Medium',
  },
  tapText: {
    color: Colors.premium.tapText,
    fontSize: getResponsiveSize(13),
    fontFamily: 'Rubik-Regular',
  },
  arrowIcon: {
    marginLeft: getResponsiveSize(8),
  },
  sectionTitle: {
    fontSize: getResponsiveSize(15),
    color: Colors.text.dark,
    fontFamily: 'Rubik-Medium',
    marginTop: getResponsiveSize(24),
    paddingHorizontal: getResponsiveSize(24),
  },
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesContainer: {
    paddingBottom: getResponsiveSize(24),
  },
});

export default HomeScreen;

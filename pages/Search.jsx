import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Modal,
  Animated,
  Platform,
  ActivityIndicator,
  PanResponder,
  StatusBar,
  NativeEventEmitter,
  Vibration,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import { Camera } from 'react-native-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { LineChart } from 'react-native-chart-kit';
import Svg, { Circle, Path, G } from 'react-native-svg';
import * as Animatable from 'react-native-animatable';
import { BlurView } from '@react-native-community/blur';

const { width, height } = Dimensions.get('window');

const WINE_ATTRIBUTES = {
  body: ['Light', 'Medium', 'Full'],
  acidity: ['Low', 'Medium', 'High'],
  tannin: ['Smooth', 'Balanced', 'Firm'],
  sweetness: ['Dry', 'Off-Dry', 'Sweet'],
  alcohol: ['Low', 'Medium', 'High'],
};

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [showCamera, setShowCamera] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [sommelierView, setSommelierView] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [favoriteWines, setFavoriteWines] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const navigation = useNavigation();
  const searchInputRef = useRef(null);
  const scrollViewRef = useRef(null);
  const cameraRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    initializeVoice();
    loadSavedData();
    return () => cleanupVoice();
  }, []);

  const initializeVoice = async () => {
    if (Platform.OS === 'android') {
      const instance = await Voice.getInstance();
      setupVoiceListeners(instance);
    } else {
      setupVoiceListeners(Voice);
    }
  };

  const setupVoiceListeners = (voiceInstance) => {
    voiceInstance.onSpeechStart = () => setIsListening(true);
    voiceInstance.onSpeechEnd = () => setIsListening(false);
    voiceInstance.onSpeechResults = (e) => {
      const spokenText = e.value[0];
      setQuery(spokenText);
      handleSearch(spokenText);
    };
  };

  const cleanupVoice = () => {
    Voice.destroy().then(Voice.removeAllListeners);
  };

  const loadSavedData = async () => {
    try {
      const [savedSearches, savedFavorites] = await Promise.all([
        AsyncStorage.getItem('recentSearches'),
        AsyncStorage.getItem('favoriteWines'),
      ]);

      if (savedSearches) setRecentSearches(JSON.parse(savedSearches));
      if (savedFavorites) setFavoriteWines(JSON.parse(savedFavorites));
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  };

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    Vibration.vibrate(50);

    try {
      await new Promise(r => setTimeout(r, 1000)); // Simulated API delay
      const searchResults = await mockSearchAPI(searchQuery, selectedFilters);

      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();

      setResults(searchResults);
      updateRecentSearches(searchQuery);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const mockSearchAPI = async (query, filters) => {
    // Simulated AI-powered wine search results
    return [
      {
        id: '1',
        name: 'Château Margaux 2015',
        type: 'Red Wine',
        region: 'Bordeaux, France',
        price: 1299,
        rating: 98,
        image: 'https://example.com/wine1.jpg',
        attributes: {
          body: 'Full',
          acidity: 'Medium',
          tannin: 'Firm',
          sweetness: 'Dry',
          alcohol: 'High',
        },
        pairings: ['Beef', 'Game', 'Truffle'],
        notes: 'Exceptional balance with dark fruit and tobacco notes',
        available: true,
        inStock: 24,
      },
      // Add more mock results
    ];
  };

  const updateRecentSearches = async (searchQuery) => {
    const updatedSearches = [
      searchQuery,
      ...recentSearches.filter(s => s !== searchQuery),
    ].slice(0, 5);

    setRecentSearches(updatedSearches);
    await AsyncStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };

  const startVoiceSearch = async () => {
    try {
      await Voice.start('en-US');
      Vibration.vibrate([0, 50, 0, 0]);
    } catch (error) {
      console.error('Voice error:', error);
    }
  };

  const handleCameraSearch = async () => {
    setShowCamera(true);
  };

  const onBarCodeScanned = ({ data }) => {
    setShowCamera(false);
    handleSearch(data);
  };

  const toggleFavorite = async (wineId) => {
    const newFavorites = favoriteWines.includes(wineId)
      ? favoriteWines.filter(id => id !== wineId)
      : [...favoriteWines, wineId];

    setFavoriteWines(newFavorites);
    await AsyncStorage.setItem('favoriteWines', JSON.stringify(newFavorites));
    Vibration.vibrate(50);
  };

  const renderSearchBar = () => (
    <Animatable.View
      animation="slideInDown"
      duration={800}
      style={styles.searchBarContainer}
    >
      <View style={styles.searchInputWrapper}>
        <Icon name="magnify" size={24} color="#073152" style={styles.searchIcon} />
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Search wines or ask sommelier..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={() => handleSearch()}
          placeholderTextColor="#666"
        />
        {query.length > 0 && (
          <TouchableOpacity
            onPress={() => setQuery('')}
            style={styles.clearButton}
          >
            <Icon name="close-circle" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.searchActions}>
        <TouchableOpacity
          onPress={startVoiceSearch}
          style={[styles.actionButton, isListening && styles.activeActionButton]}
        >
          <Icon name={isListening ? 'microphone' : 'microphone-outline'}
                size={24}
                color={isListening ? '#FFF' : '#D52247'} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleCameraSearch}
          style={styles.actionButton}
        >
          <Icon name="camera-outline" size={24} color="#D52247" />
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );

  const renderResults = () => (
    <Animated.View
      style={[
        styles.resultsContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      {results.map((wine, index) => (
        <Animatable.View
          key={wine.id}
          animation="fadeInUp"
          delay={index * 100}
          duration={500}
        >
          <TouchableOpacity
            style={styles.wineCard}
            onPress={() => navigation.navigate('WineDetail', { wine })}
          >
            <Image source={{ uri: wine.image }} style={styles.wineImage} />

            <View style={styles.wineInfo}>
              <View style={styles.wineHeader}>
                <Text style={styles.wineName}>{wine.name}</Text>
                <TouchableOpacity
                  onPress={() => toggleFavorite(wine.id)}
                  style={styles.favoriteButton}
                >
                  <Icon
                    name={favoriteWines.includes(wine.id) ? 'heart' : 'heart-outline'}
                    size={24}
                    color="#D52247"
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.wineRegion}>{wine.region}</Text>

              <View style={styles.wineStats}>
                <Text style={styles.winePrice}>${wine.price}</Text>
                <View style={styles.ratingContainer}>
                  <View
                    style={[
                      styles.ratingBar,
                      { width: `${wine.rating}%` }
                    ]}
                  />
                  <Text style={styles.ratingText}>{wine.rating}/100</Text>
                </View>
              </View>

              <View style={styles.wineAttributes}>
                {Object.entries(wine.attributes).map(([key, value]) => (
                  <View key={key} style={styles.attributeTag}>
                    <Text style={styles.attributeText}>
                      {key}: {value}
                    </Text>
                  </View>
                ))}
              </View>

              {wine.available ? (
                <TouchableOpacity style={styles.buyButton}>
                  <Text style={styles.buyButtonText}>Add to Cart</Text>
                  <Icon name="cart-plus" size={20} color="#FFF" />
                </TouchableOpacity>
              ) : (
                <Text style={styles.unavailableText}>Currently Unavailable</Text>
              )}
            </View>
          </TouchableOpacity>
        </Animatable.View>
      ))}
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {renderSearchBar()}

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#D52247" style={styles.loader} />
        ) : (
          renderResults()
        )}
      </ScrollView>

      {/* Camera Modal */}
      <Modal
        visible={showCamera}
        animationType="slide"
        onRequestClose={() => setShowCamera(false)}
      >
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFill}
          onBarCodeRead={onBarCodeScanned}
          barCodeTypes={['qr', 'ean-13']}
        >
          <TouchableOpacity
            style={styles.closeCamera}
            onPress={() => setShowCamera(false)}
          >
            <Icon name="close" size={30} color="#FFF" />
          </TouchableOpacity>
        </Camera>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  searchBarContainer: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    zIndex: 10,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#0D1B2A',
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  clearButton: {
    padding: 5,
  },
  searchActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 10,
  },
  actionButton: {
    padding: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeActionButton: {
    backgroundColor: '#D52247',
  },
  resultsContainer: {
    padding: 15,
  },
  wineCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  wineImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  wineInfo: {
    padding: 15,
  },
  wineHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  wineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0D1B2A',
    flex: 1,
  },
  wineRegion: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 10,
  },
  wineStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  winePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#073152',
  },
  ratingContainer: {
    flex: 1,
    height: 4,
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
    marginLeft: 15,
  },
  ratingBar: {
    height: '100%',
    backgroundColor: '#D52247',
    borderRadius: 2,
  },
  ratingText: {
    position: 'absolute',
    right: 0,
    top: -18,
    fontSize: 12,
    color: '#666',
  },
  wineAttributes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 15,
  },
  attributeTag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  attributeText: {
    fontSize: 12,
    color: '#073152',
  },
  buyButton: {
    backgroundColor: '#D52247',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  buyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  unavailableText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 10,
  },
  loader: {
    marginTop: 50,
  },
  closeCamera: {
    position: 'absolute',
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
  },
  favoriteButton: {
    padding: 5,
  },
});

export default Search;

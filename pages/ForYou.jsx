import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  Platform,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const allWines = [
  {
    id: 1,
    name: 'Malbec Reserva',
    year: 2019,
    imageUrl: 'https://media.nicks.com.au/products/86cd57ba/terrazas-reserva-malbec.jpg',
    description: 'Elegant Malbec with notes of black fruits and vanilla. It features a robust body and smooth tannins, perfect with red meats and spiced dishes. Oak barrel aging adds complexity with a long, persistent finish.',
    type: 'Red',
    country: 'Argentina',
    grape: 'Malbec',
    region: 'Mendoza',
  },
  {
    id: 2,
    name: 'Chardonnay Gran Reserva',
    year: 2020,
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.lJGLM4mQWIjYGggHC7dznwHaJ4%26pid%3DApi&f=1&ipt=6fb16f0604e766e7ebbf85dcf5935e7fa54567cfdfa30792e71c23703283b209&ipo=images',
    description: 'Full-bodied Chardonnay with tropical fruit aromas. Notes of pineapple, mango, and a hint of butter from barrel aging. Its balanced acidity and creamy texture make it perfect for pairing with rich sauces and fatty fish.',
    type: 'White',
    country: 'Chile',
    grape: 'Chardonnay',
    region: 'Central Valley',
  },
  {
    id: 3,
    name: 'Syrah Reserva',
    year: 2018,
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatics.angeloni.com.br%2Fsuper%2Ffiles%2Fprodutos%2F3782590%2F3782590_1_zoom.jpg&f=1&nofb=1&ipt=fd08cca0a9f8be55ad8bfc2b616a41939accda225b8e8b6bde79700d3c11faa4&ipo=images',
    description: 'Intense Syrah with dark fruit and spice aromas. Offers a robust structure with well-integrated tannins and a persistent finish. Ideal with grilled meats and aged cheeses.',
    type: 'Red',
    country: 'South Africa',
    grape: 'Syrah',
    region: 'Western Cape',
  },
  {
    id: 4,
    name: 'Sauvignon Blanc',
    year: 2021,
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.asherbws.com%2Fwp-content%2Fuploads%2F2013%2F12%2FBrancott-Estate-Marlborough-Sauvignon-Blanc13900403159901.jpg&f=1&nofb=1&ipt=56b99d75382ed7548190d6945414248c588ce726821251297138059b492d9d83&ipo=images',
    description: 'Fresh and vibrant Sauvignon Blanc with citrus and herbal notes. Its lively acidity and fruity profile make it perfect with salads and seafood.',
    type: 'White',
    country: 'New Zealand',
    grape: 'Sauvignon Blanc',
    region: 'Marlborough',
  },
];

const WineCard = ({ wine, onPress, index }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.cardContainer,
        {
          transform: [{ scale }]
        }
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        <FastImage
          source={{ uri: wine.imageUrl }}
          style={styles.backgroundImage}
          resizeMode={FastImage.resizeMode.cover}
        />

        <View style={styles.overlay}>
          <LinearGradient
            colors={['transparent', '#0D1B2A']}
            style={styles.gradient}
          >
            <View style={styles.contentContainer}>
              <View style={styles.headerContainer}>
                <Text style={styles.wineName}>{wine.name}</Text>
                <Text style={styles.wineYear}>{wine.year}</Text>
              </View>

              <View style={styles.details}>
                <View style={styles.locationContainer}>
                  <Text style={styles.location}>
                    {wine.region}, {wine.country}
                  </Text>
                  <Text style={styles.grape}>{wine.grape}</Text>
                </View>

                <View style={styles.typeBadge}>
                  <Text style={styles.typeText}>{wine.type}</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={onPress}
                style={styles.viewDetailsButton}
              >
                <LinearGradient
                  colors={['#D52247', '#073152']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.detailsGradient}
                >
                  <Text style={styles.viewDetailsText}>Explore Wine →</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const ForYou = ({ navigation, filters = {} }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredWines = allWines.filter((wine) => {
    return (
      (!filters.type || wine.type === filters.type) &&
      (!filters.country || wine.country === filters.country) &&
      (!filters.grape || wine.grape === filters.grape) &&
      (!filters.region || wine.region === filters.region)
    );
  });

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
    {
      useNativeDriver: true,
      listener: ({ nativeEvent }) => {
        setCurrentIndex(Math.round(nativeEvent.contentOffset.x / SCREEN_WIDTH));
      },
    }
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.FlatList
        data={filteredWines}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        renderItem={({ item, index }) => (
          <WineCard
            wine={item}
            index={index}
            onPress={() => navigation.navigate('WineDetail', { wine: item })}
          />
        )}
        snapToInterval={SCREEN_WIDTH}
        decelerationRate="fast"
      />

      <View style={styles.pagination}>
        {filteredWines.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              currentIndex === index && styles.paginationDotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  cardContainer: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  touchable: {
    flex: 1,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  headerContainer: {
    marginBottom: 20,
  },
  wineName: {
    fontSize: 42,
    fontWeight: '700',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  wineYear: {
    fontSize: 24,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 5,
  },
  details: {
    marginBottom: 30,
  },
  locationContainer: {
    marginBottom: 15,
  },
  location: {
    fontSize: 20,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  grape: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.7,
    marginTop: 5,
  },
  typeBadge: {
    backgroundColor: '#D52247',
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 25,
  },
  typeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  viewDetailsButton: {
    marginTop: 20,
  },
  detailsGradient: {
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 4,
  },
  paginationDotActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
});

export default ForYou;

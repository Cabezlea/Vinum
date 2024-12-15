import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Animated,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window');

const CollectionsPage = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [shuffledCollections, setShuffledCollections] = useState([]);

  const collections = [
    {
      id: '1',
      region: 'Bordeaux, France',
      title: "Château Margaux Collection",
      description: "Experience the epitome of French wine-making tradition",
      image: 'https://media.giphy.com/media/3o7bugwhhJE9WhxkYw/giphy.gif',
      stats: { vintage: '2015', rating: '96/100', price: '$890' }
    },
    {
      id: '2',
      region: 'Tuscany, Italy',
      title: "Super Tuscan Excellence",
      description: "Bold, modern interpretations of Italian classics",
      image: 'https://media.giphy.com/media/3o7bugwhhJE9WhxkYw/giphy.gif',
      stats: { vintage: '2018', rating: '94/100', price: '$450' }
    },
    {
      id: '3',
      region: 'Napa Valley, USA',
      title: "Opus One Reserve",
      description: "California's finest Bordeaux-style blend",
      image: 'https://media.giphy.com/media/3o7bugwhhJE9WhxkYw/giphy.gif',
      stats: { vintage: '2019', rating: '98/100', price: '$699' }
    },
    {
      id: '4',
      region: 'Champagne, France',
      title: "Dom Pérignon Vintage",
      description: "Prestigious champagne from exceptional years",
      image: 'https://media.giphy.com/media/3o7bugwhhJE9WhxkYw/giphy.gif',
      stats: { vintage: '2012', rating: '97/100', price: '$299' }
    },
    {
      id: '5',
      region: 'Rioja, Spain',
      title: "Vega Sicilia Único",
      description: "Spain's most prestigious wine collection",
      image: 'https://media.giphy.com/media/3o7bugwhhJE9WhxkYw/giphy.gif',
      stats: { vintage: '2011', rating: '99/100', price: '$569' }
    },
  ];

  useEffect(() => {
    shuffleCollections();
  }, []);

  const shuffleCollections = () => {
    const shuffled = [...collections].sort(() => Math.random() - 0.5);
    setShuffledCollections(shuffled);
  };

  const renderItem = ({ item, index }) => {
    const inputRange = [
      (index - 1) * height,
      index * height,
      (index + 1) * height
    ];

    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [0.9, 1, 0.9],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View
        style={[styles.collectionCard, { transform: [{ scale }] }]}
      >
        <LinearGradient
          colors={['#073152', '#0D1B2A']}
          style={styles.gradientBackground}
        >
          <FastImage
            source={{ uri: item.image }}
            style={styles.backgroundImage}
            resizeMode={FastImage.resizeMode.cover}
          />

          <View style={styles.contentContainer}>
            <View style={styles.mainContent}>
              <Text style={styles.region}>{item.region}</Text>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>

            <View style={styles.bottomContent}>
              <View style={styles.statsContainer}>
                <StatsItem label="Vintage" value={item.stats.vintage} />
                <StatsItem label="Rating" value={item.stats.rating} />
                <StatsItem label="Price" value={item.stats.price} />
              </View>

              <TouchableOpacity
                style={styles.exploreButton}
                onPress={() => {/* Navigate to detail view */}}
              >
                <LinearGradient
                  colors={['#D52247', '#073152']}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Explore Collection</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    );
  };

  const StatsItem = ({ label, value }) => (
    <View style={styles.statsItem}>
      <Text style={styles.statsLabel}>{label}</Text>
      <Text style={styles.statsValue}>{value}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={shuffledCollections}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        vertical
        snapToInterval={height}
        decelerationRate="fast"
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        onMomentumScrollEnd={(event) => {
          const newIndex = Math.round(event.nativeEvent.contentOffset.y / height);
          setActiveIndex(newIndex);
        }}
        contentContainerStyle={{ backgroundColor: '#0D1B2A' }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  collectionCard: {
    height: height,
    width: width,
    backgroundColor: '#0D1B2A',
  },
  gradientBackground: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 40,
    paddingBottom: 50,
  },
  mainContent: {
    flex: 0,
    marginTop: 20,
  },
  bottomContent: {
    paddingBottom: 20,
  },
  region: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 18,
    opacity: 0.9,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statsItem: {
    alignItems: 'center',
  },
  statsLabel: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 14,
    marginBottom: 4,
  },
  statsValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  exploreButton: {
    overflow: 'hidden',
    borderRadius: 25,
  },
  buttonGradient: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CollectionsPage;

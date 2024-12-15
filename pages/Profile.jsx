import React, { useRef } from 'react';
import { Animated, View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
const { width } = Dimensions.get('window');

// Custom animated button component
const AnimatedButton = ({ onPress, style, children }) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const animateScale = (newScale) => {
    Animated.spring(scaleValue, {
      toValue: newScale,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPressIn={() => animateScale(0.95)}
      onPressOut={() => animateScale(1)}
      onPress={onPress}
    >
      <Animated.View style={[style, { transform: [{ scale: scaleValue }] }]}>
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

const ProfilePage = ({ onSignOut }) => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  const handleSignOut = () => {
    if (onSignOut) {
      onSignOut();
    }
  };

  return (
    <View style={styles.container}>
      {/* Dynamic Header */}
      <Animated.View
        style={[
          styles.header,
          {
            opacity: scrollY.interpolate({
              inputRange: [0, 100],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <TouchableOpacity style={styles.cartButton}>
          <Animated.Image
            source={require('../images/cart.png')}
            style={[
              styles.cartIcon,
              {
                transform: [
                  {
                    translateX: scrollY.interpolate({
                      inputRange: [0, 100],
                      outputRange: [0, 100],
                      extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={styles.scrollContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Decorative Top Banner */}
        <LinearGradient
          colors={['#0D1B2A', '#073152']}
          style={styles.topBanner}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
        >
          <View style={styles.bannerOverlay} />
        </LinearGradient>

        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../images/profilepic.jpg')}
              style={styles.profileImage}
            />
            <View style={styles.badgeContainer}>
              <Text style={styles.badgeText}>Wine Enthusiast</Text>
            </View>
          </View>
          <Text style={styles.profileName}>El Doggy</Text>
          <Text style={styles.profileEmail}>Eldoggy@gmail.com</Text>
          <AnimatedButton style={styles.proButton}>
            <Text style={styles.proButtonText}>Upgrade to Sommelier</Text>
          </AnimatedButton>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Collections</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Wines Tasted</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>6</Text>
            <Text style={styles.statLabel}>Reviews</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <AnimatedButton style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Image
                source={require('../images/profile.png')}
                style={[styles.menuIcon, { tintColor: '#FFFFFF' }]}
              />
              <Text style={styles.menuText}>Privacy</Text>
            </View>
            <Image
              source={require('../images/foward.png')}
              style={[styles.forwardIcon, { tintColor: '#FFFFFF' }]}
            />
          </AnimatedButton>

          <AnimatedButton style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Image
                source={require('../images/cart.png')}
                style={[styles.menuIcon, { tintColor: '#FFFFFF' }]}
              />
              <Text style={styles.menuText}>Purchase History</Text>
            </View>
            <Image
              source={require('../images/foward.png')}
              style={[styles.forwardIcon, { tintColor: '#FFFFFF' }]}
            />
          </AnimatedButton>

          <AnimatedButton style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Image
                source={require('../images/profile.png')}
                style={[styles.menuIcon, { tintColor: '#FFFFFF' }]}
              />
              <Text style={styles.menuText}>Help & Support</Text>
            </View>
            <Image
              source={require('../images/foward.png')}
              style={[styles.forwardIcon, { tintColor: '#FFFFFF' }]}
            />
          </AnimatedButton>

          <AnimatedButton style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Image
                source={require('../images/profile.png')}
                style={[styles.menuIcon, { tintColor: '#FFFFFF' }]}
              />
              <Text style={styles.menuText}>Settings</Text>
            </View>
            <Image
              source={require('../images/foward.png')}
              style={[styles.forwardIcon, { tintColor: '#FFFFFF' }]}
            />
          </AnimatedButton>

          <AnimatedButton style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Image
                source={require('../images/profile.png')}
                style={[styles.menuIcon, { tintColor: '#FFFFFF' }]}
              />
              <Text style={styles.menuText}>Invite a Friend</Text>
            </View>
            <Image
              source={require('../images/foward.png')}
              style={[styles.forwardIcon, { tintColor: '#FFFFFF' }]}
            />
          </AnimatedButton>
        </View>

        <AnimatedButton style={styles.logoutButton} onPress={handleSignOut}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </AnimatedButton>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 100,
    paddingHorizontal: 20,
  },
  cartButton: {
    padding: 10,
  },
  cartIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  topBanner: {
    height: 150,
    position: 'absolute',
    width: '100%',
    top: 0,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(213, 34, 71, 0.05)',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  imageContainer: {
    marginBottom: 15,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#D52247',
    shadowColor: '#D52247',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  badgeContainer: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#073152',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#D52247',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
  },
  profileEmail: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D52247',
  },
  statLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    marginTop: 5,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#073152',
  },
  proButton: {
    marginTop: 20,
    backgroundColor: '#D52247',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#D52247',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  proButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    backgroundColor: 'rgba(7, 49, 82, 0.9)',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(213, 34, 71, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  forwardIcon: {
    width: 20,
    height: 20,
  },
  logoutButton: {
    marginTop: 30,
    marginHorizontal: 20,
    backgroundColor: '#D52247',
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#D52247',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProfilePage;

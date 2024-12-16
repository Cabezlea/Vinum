import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StatusBar,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CartItem = ({ item, onUpdateQuantity }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [quantity, setQuantity] = useState(item.quantity);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const updateQuantity = (newQuantity) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <Animated.View style={[styles.cartItem, { transform: [{ scale: scaleAnim }] }]}>
      <FastImage
        source={{ uri: item.imageUrl }}
        style={styles.wineImage}
        resizeMode={FastImage.resizeMode.cover}
      />

      <View style={styles.itemDetails}>
        <View style={styles.itemHeader}>
          <Text style={styles.wineName}>{item.name}</Text>
          <Text style={styles.wineYear}>{item.year}</Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>${item.price}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(quantity - 1)}
            >
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantity}>{quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(quantity + 1)}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

const Cart = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Malbec Reserva',
      year: 2019,
      price: 89.99,
      quantity: 1,
      imageUrl: 'https://media.nicks.com.au/products/86cd57ba/terrazas-reserva-malbec.jpg',
    },
    // Add more items as needed
  ]);

  const updateItemQuantity = (itemId, newQuantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <Animated.View style={[styles.header, {
        opacity: scrollY.interpolate({
          inputRange: [0, 100],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }),
      }]}>
        <Text style={styles.headerTitle}>Your Collection</Text>
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        {cartItems.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onUpdateQuantity={updateItemQuantity}
          />
        ))}

        <View style={styles.summaryContainer}>
          <LinearGradient
            colors={['rgba(7, 49, 82, 0.6)', 'rgba(13, 27, 42, 0.8)']}
            style={styles.summaryGradient}
          >
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${getTotalPrice().toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>$15.00</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${(getTotalPrice() + 15).toFixed(2)}</Text>
            </View>
          </LinearGradient>
        </View>
      </Animated.ScrollView>

      <View style={styles.checkoutContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Orders')}
          style={styles.checkoutButton}
        >
          <LinearGradient
            colors={['#D52247', '#073152']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.checkoutGradient}
          >
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1B2A',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: 'rgba(7, 49, 82, 0.6)',
    borderRadius: 15,
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: 'rgba(213, 34, 71, 0.2)',
  },
  wineImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'space-between',
  },
  itemHeader: {
    marginBottom: 10,
  },
  wineName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  wineYear: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#D52247',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(213, 34, 71, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  quantityButton: {
    padding: 8,
  },
  quantityButtonText: {
    fontSize: 20,
    color: '#D52247',
    fontWeight: '600',
  },
  quantity: {
    fontSize: 18,
    color: '#FFFFFF',
    marginHorizontal: 15,
  },
  summaryContainer: {
    marginTop: 20,
    marginBottom: 100,
  },
  summaryGradient: {
    padding: 20,
    borderRadius: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  summaryValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  totalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#D52247',
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#0D1B2A',
  },
  checkoutButton: {
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#D52247',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  checkoutGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Cart;

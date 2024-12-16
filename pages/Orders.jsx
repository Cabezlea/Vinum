import React, { useRef } from 'react';
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

const OrderCard = ({ order }) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'processing': return '#FFB800';
      case 'shipped': return '#00B8FF';
      case 'delivered': return '#00FF9D';
      default: return '#FFFFFF';
    }
  };

  return (
    <TouchableOpacity
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.9}
    >
      <Animated.View style={[
        styles.orderCard,
        { transform: [{ scale: scaleAnim }] }
      ]}>
        <LinearGradient
          colors={['rgba(7, 49, 82, 0.9)', 'rgba(13, 27, 42, 0.95)']}
          style={styles.cardGradient}
        >
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.orderId}>Order #{order.id}</Text>
              <Text style={styles.orderDate}>{order.date}</Text>
            </View>
            <View style={[
              styles.statusBadge,
              { borderColor: getStatusColor(order.status) }
            ]}>
              <Text style={[
                styles.statusText,
                { color: getStatusColor(order.status) }
              ]}>
                {order.status}
              </Text>
            </View>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.wineList}
          >
            {order.items.map((item, index) => (
              <View key={index} style={styles.wineItem}>
                <FastImage
                  source={{ uri: item.imageUrl }}
                  style={styles.wineImage}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <Text style={styles.wineName}>{item.name}</Text>
                <Text style={styles.wineQuantity}>Qty: {item.quantity}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.orderFooter}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const Orders = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Sample order data
  const orders = [
    {
      id: "WO-2024-001",
      date: "March 15, 2024",
      status: "Processing",
      total: 267.98,
      items: [
        {
          name: "Malbec Reserva",
          quantity: 2,
          imageUrl: "https://media.nicks.com.au/products/86cd57ba/terrazas-reserva-malbec.jpg"
        },
        {
          name: "Chardonnay Gran Reserva",
          quantity: 1,
          imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.lJGLM4mQWIjYGggHC7dznwHaJ4%26pid%3DApi&f=1&ipt=6fb16f0604e766e7ebbf85dcf5935e7fa54567cfdfa30792e71c23703283b209&ipo=images"
        }
      ]
    },
    // Add more orders as needed
  ];

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
        <Text style={styles.headerTitle}>Your Orders</Text>
      </Animated.View>

      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
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
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
  orderCard: {
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardGradient: {
    padding: 15,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  orderId: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  orderDate: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.7,
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  wineList: {
    marginVertical: 15,
  },
  wineItem: {
    marginRight: 15,
    alignItems: 'center',
    width: 100,
  },
  wineImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  wineName: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  wineQuantity: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.7,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  totalLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: '700',
    color: '#D52247',
  },
});

export default Orders;

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Vinum</Text>
        <TouchableOpacity style={styles.cartIconContainer}>
          <Image source={require('../images/cart.png')} style={styles.cartIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.profileContainer}>
        <Image
          source={require('../images/profilepic.jpg')} // Replace with your actual image source
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Montu Yadav</Text>
        <Text style={styles.profileEmail}>mmontuyadav.331@gmail.com</Text>
      </View>
      <View style={styles.tabContainer}>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>My Orders</Text>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Wishlist</Text>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>3</Text>
          </View>
        </View>
        <View style={styles.tabItem}>
          <Text style={styles.tabText}>Notifications</Text>
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationText}>5</Text>
          </View>
        </View>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>My Clues Bucks</Text>
          <Text style={styles.menuBadge}>30</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Location (Gautam Buddha Nagar)</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>My Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuText}>Rate Your Purchase</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#8C001A',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartIconContainer: {
    justifyContent: 'center',
  },
  cartIcon: {
    width: 25,
    height: 25,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#8C001A',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8C001A',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: '#555555',
    marginTop: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    color: '#8C001A',
  },
  notificationBadge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#D52247',
    borderRadius: 10,
    padding: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  notificationText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  menuText: {
    fontSize: 16,
    color: '#333333',
  },
  menuBadge: {
    fontSize: 16,
    color: '#D52247',
  },
});

export default ProfilePage;

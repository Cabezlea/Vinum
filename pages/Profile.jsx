import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../images/profilepic.jpg')}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>El Doggy</Text>
          <Text style={styles.profileEmail}>Eldoggy@gmail.com</Text>
          <TouchableOpacity style={styles.proButton}>
            <Text style={styles.proButtonText}>Upgrade To Pro</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Privacy</Text>
            <Image
              source={require('../images/foward.png')}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Purchase History</Text>
            <Image
              source={require('../images/foward.png')}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Help & Support</Text>
            <Image
              source={require('../images/foward.png')}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Settings</Text>
            <Image
              source={require('../images/foward.png')}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Invite a Friend</Text>
            <Image
              source={require('../images/foward.png')}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Logout</Text>
            <Image
              source={require('../images/foward.png')}
              style={styles.forwardIcon}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingBottom: 20,
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
    borderColor: '#D52247',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#D52247',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: '#D52247',
    marginTop: 5,
  },
  proButton: {
    marginTop: 10,
    backgroundColor: '#D52247',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  proButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginTop: 31,
    paddingHorizontal: 20,
  },
  menuItem: {
    backgroundColor: '#F5F5F5', // Light gray background for menu items
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  menuText: {
    fontSize: 16,
    color: '#000000',
  },
  forwardIcon: {
    width: 20,
    height: 20,
    tintColor: '#000000', // Change this color as needed
  },
});

export default ProfilePage;

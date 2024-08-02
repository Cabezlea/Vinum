import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const ProfilePage = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
        </View>
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
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Purchase History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Help & Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Invite a Friend</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // Vinum's blue theme color
  },
  scrollContainer: {
    paddingBottom: 20, // Additional padding at the bottom
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  headerText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
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
    color: '#FFFFFF',
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
    marginTop: 30,
    paddingHorizontal: 20,
  },
  menuItem: {
    backgroundColor: '#FFFFFF',
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
    color: '#001f3f',
  },
});

export default ProfilePage;

import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, FontAwesome5  } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from './styles';


export default function BottomNav() {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('start')}>
        <Feather name="home" size={24} color="#000" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.mainNavButton} onPress={() => navigation.navigate('interventions')}>
      <FontAwesome5 name="lightbulb" size={24} color="#fff" />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('profile')}>
        <Feather name="user" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navButton: {
    padding: 10,
  },
  mainNavButton: {
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 30,
    width: 60,  // Set a specific width
    height: 60, // Same as width to make it circular
    justifyContent: 'center',
    alignItems: 'center',
  }
});
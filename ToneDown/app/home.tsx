import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Switch, Modal } from 'react-native';
import { Link, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from './BottomNav';
import { styles, COLORS } from './styles';

export default function HomeScreen() {
  const [userName, setUserName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Load user data
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUserName(parsedData.name);
          
          // Load privacy setting if it exists
          if (parsedData.isPrivate !== undefined) {
            setIsPrivate(parsedData.isPrivate);
          }
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    loadUserData();
  }, []);

  const togglePrivacy = async (value) => {
    setIsPrivate(value);
    try {
      // Get existing user data
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedData = JSON.parse(userData);
        
        // Update with new privacy setting
        const updatedData = {
          ...parsedData,
          isPrivate: value
        };
        
        // Save back to AsyncStorage
        await AsyncStorage.setItem('userData', JSON.stringify(updatedData));
        console.log('Privacy setting updated:', value);
      }
    } catch (error) {
      console.error('Error saving privacy setting:', error);
    }
  };

  const handleResetData = async () => {
    console.log("Reset button pressed");
    try {
      // Directly clear AsyncStorage items
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('questionResponses');
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.removeItem('setupComplete');
      
      console.log("User data reset successfully");
      // Navigate back to start screen
      router.replace('/start');
    } catch (error) {
      console.error('Failed to reset user data:', error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* Logo image in circular container */}
        <View style={localStyles.logoContainer}>
          <Image 
            source={require('../assets/images/tone-down.png')} 
            style={localStyles.logoImage}
            resizeMode="contain"
          />
        </View>
        
        <Text style={styles.title}>Hello <b>{userName || 'User'}</b>!</Text>
        <Text style={styles.text}>Welcome to ToneDown!</Text>
        
        {/* Privacy Toggle with Hover Tooltip */}
        <View style={localStyles.privacyContainer}>
          <Text style={localStyles.privacyLabel}>Privacy Mode:</Text>
          <Switch
            trackColor={{ false: "#767577", true: COLORS.green }}
            thumbColor={isPrivate ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={togglePrivacy}
            value={isPrivate}
          />
          <TouchableOpacity 
            onPress={() => setShowTooltip(true)}
            style={localStyles.infoButton}
          >
            <Text style={localStyles.infoButtonText}>?</Text>
          </TouchableOpacity>
        </View>
        
        {/* Tooltip Modal */}
        <Modal
          transparent={true}
          visible={showTooltip}
          animationType="fade"
          onRequestClose={() => setShowTooltip(false)}
        >
          <TouchableOpacity 
            style={localStyles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowTooltip(false)}
          >
            <View style={localStyles.tooltipModal}>
              <Text style={localStyles.tooltipTitle}>Privacy Mode</Text>
              <Text style={localStyles.tooltipText}>
                When Privacy Mode is enabled, your data remains private and won't be used for group analysis. While this enhances your privacy, it means the app can't learn from others' experiences to provide you with faster personalized recommendations. The choice is yours!
              </Text>
              <TouchableOpacity 
                style={localStyles.closeButton}
                onPress={() => setShowTooltip(false)}
              >
                <Text style={localStyles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        
        <Link href="/tinnitus_question">
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Intervention</Text>
          </TouchableOpacity>
        </Link>
        
        <Link href="/interventions">
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Learn about interventions</Text>
          </TouchableOpacity>
        </Link>
        
        {/* Reset Data button */}
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: COLORS.red }]} 
          onPress={handleResetData}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Reset Data</Text>
        </TouchableOpacity>
      </View>
      <BottomNav />
    </View>
  );
}

const localStyles = StyleSheet.create({
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.offwhite,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  privacyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
    padding: 10,
    backgroundColor: COLORS.lightgray,
    borderRadius: 10,
  },
  privacyLabel: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  infoButton: {
    marginLeft: 10,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  tooltipModal: {
    width: '80%',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tooltipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.black,
  },
  tooltipText: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.black,
    marginBottom: 15,
  },
  closeButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.beige,
    borderRadius: 5,
  },
  closeButtonText: {
    color: COLORS.black,
    fontWeight: '500',
  }
});

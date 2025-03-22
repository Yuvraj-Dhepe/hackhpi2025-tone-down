import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

// User data
export const saveUserData = async (userData: any) => {
  try {
    // Generate a hash-based ID from user name
    if (!userData.id && userData.name) {
      // Create a deterministic ID based on user name
      const userString = `${userData.name}-${Date.now()}`;
      userData.id = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        userString
      );
    }
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    return userData;
  } catch (error) {
    console.error('Error saving user data:', error);
    return userData;
  }
};

export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

// Question responses
export const saveQuestionResponse = async (questionId: string, value: any) => {
  try {
    const responses = await getQuestionResponses();
    const updatedResponses = { ...responses, [questionId]: value };
    await AsyncStorage.setItem('questionResponses', JSON.stringify(updatedResponses));
  } catch (error) {
    console.error('Error saving question response:', error);
  }
};

export const getQuestionResponses = async () => {
  try {
    const responses = await AsyncStorage.getItem('questionResponses');
    return responses ? JSON.parse(responses) : {};
  } catch (error) {
    console.error('Error retrieving question responses:', error);
    return {};
  }
};

// Selected intervention
export const saveSelectedIntervention = async (intervention: string) => {
  try {
    await AsyncStorage.setItem('selectedIntervention', intervention);
  } catch (error) {
    console.error('Error saving selected intervention:', error);
  }
};

export const getSelectedIntervention = async () => {
  try {
    const intervention = await AsyncStorage.getItem('selectedIntervention');
    return intervention;
  } catch (error) {
    console.error('Error retrieving selected intervention:', error);
    return null;
  }
};

// Clear all data
export const clearAllData = async () => {
  try {
    // Get all keys from AsyncStorage
    const allKeys = await AsyncStorage.getAllKeys();
    
    // Remove all data
    await AsyncStorage.multiRemove(allKeys);
    
    console.log('All user data cleared successfully');
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error; // Re-throw to allow handling in the calling function
  }
};

// Reset user data and navigate to start
export const resetUserData = async () => {
  try {
    // Remove specific keys related to user data
    await AsyncStorage.removeItem('userData');
    await AsyncStorage.removeItem('questionResponses');
    await AsyncStorage.removeItem('userInfo');
    await AsyncStorage.removeItem('setupComplete');
    
    console.log('User data reset successfully');
    return true;
  } catch (error) {
    console.error('Failed to reset user data:', error);
    throw error; // Re-throw to allow handling in the calling function
  }
};

import { useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { styles, COLORS } from './styles';
import { Image } from 'react-native';
import BottomNav from './BottomNav';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Start() {
  const router = useRouter();

  useEffect(() => {
    // Check if user data exists on component mount
    const checkUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          // User data exists, go to home page
          router.replace('/home');
        }
      } catch (error) {
        console.error('Error checking user data:', error);
      }
    };
    
    checkUserData();
  }, []);

  const handleContinue = async () => {
    console.log("Continue button pressed");
    try {
      // Check if user data exists
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        // User data exists, go to home page
        router.replace('/home');
      } else {
        // No user data, go to user information page
        router.push('/user_information');
      }
    } catch (error) {
      console.error('Error checking user data:', error);
      // Default to user information page if there's an error
      router.push('/user_information');
    }
  };

  return (
    <View style={{height: '100%'}}>
      <ThemedView style={localstyle.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
              Welcome to
          </ThemedText>
          <ThemedText type="title" style={styles.titleBold}>
              ToneDown
          </ThemedText>
        </ThemedView>
        <ThemedText type="default" style={styles.text} >
            ToneDown proposes personalized tinnitus interventions based on your needs. 
            Open the app when experiencing difficulties, and it will learn to help you better over time. 
            Customize available interventions below.
        </ThemedText>
        
        <TouchableOpacity 
          style={[styles.button, localstyle.continueButton]} 
          onPress={handleContinue}
          activeOpacity={0.7}
        >
          <ThemedText style={styles.buttonText}>Continue</ThemedText>
        </TouchableOpacity>
        
        <Image 
          source={require('../assets/images/Mindfulness-cuate.svg')} 
          style={{ width: 250, height: 250, alignSelf: 'center', marginTop: -5 }} 
        />
      </ThemedView>
      <BottomNav />
    </View>
  );
}

const localstyle = StyleSheet.create({
  container: {
    marginTop: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
  },
  continueButton: {
    marginTop: 0,
    marginBottom: 10,
    width: '80%',
    alignSelf: 'center'
  }
});

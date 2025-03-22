import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { styles, COLORS } from './styles';
import BottomNav from './BottomNav';
import Question from './utility';
import { saveUserData } from './storage';

export default function UserInformation() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');

  const handleSaveUserData = async () => {
    try {
      if (!name || !age || !sex) {
        // Basic validation
        alert('Please fill in all fields');
        return;
      }
      
      const userData = {
        name,
        age,
        sex
      };
      // Use the updated saveUserData function that generates a hash ID
      const updatedUserData = await saveUserData(userData);
      console.log('User data saved with ID:', updatedUserData.id);
      router.replace('/home');
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <View style={{height: '100%'}}>
      <ThemedView style={localStyle.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.title}>
              Please Enter your
          </ThemedText>
          <ThemedText type="title" style={styles.titleBold}>
              Information
          </ThemedText>
        </ThemedView>
        
        <Question title="What is your name?" value={name} setValue={setName} inputType="text" options={[]}/>
        <Question title="How old are you?" value={age} setValue={setAge} inputType="number" options={[]}/>
        <Question title="What is your sex?" value={sex} setValue={setSex} inputType="buttonsSmall" options={["m","f","d"]}/>

        <View style={{ flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress={handleSaveUserData}>
            <ThemedText style={styles.buttonText}>Submit</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
      <BottomNav />
    </View>
  );
}

const localStyle = StyleSheet.create({
  container: {
    marginTop: 100,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 20,
    height: '76%',
  }
});

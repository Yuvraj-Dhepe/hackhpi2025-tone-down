import { StyleSheet, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { styles as globalStyles, COLORS } from './styles';
import Question from './utility';
import BottomNav from './BottomNav';
import { saveQuestionResponse } from './storage';

export default function IntoxicationQuestion() {
  const intoxicationOptions = ["Alcohol", "Drugs", "Smoke", "Am Clean"];
  const [selectedIntoxication, setSelectedIntoxication] = useState(intoxicationOptions[2]);

  const handleContinue = async () => {
    if (selectedIntoxication) {
      await saveQuestionResponse('intoxication', selectedIntoxication);
      router.push('/location_question');
    }
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.cardContainer}>
            <View style={styles.circleIconContainer}>
              <ThemedText style={styles.icon}>🍷</ThemedText>
            </View>
          
            <View style={styles.cardContent}>
              <ThemedText type="title" style={styles.title}>
                Substance Use
              </ThemedText>
            
              <ThemedText style={styles.question}>
                Are you intoxicated?
              </ThemedText>
            
              <Question 
                title="" 
                value={selectedIntoxication} 
                setValue={setSelectedIntoxication} 
                inputType="buttons" 
                options={intoxicationOptions}
                containerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[globalStyles.button, styles.button, !selectedIntoxication && styles.buttonDisabled]}
              disabled={!selectedIntoxication}
              onPress={handleContinue}
            >
              <ThemedText style={globalStyles.buttonText}>Continue</ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <BottomNav />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: COLORS.background,
  },
  cardContainer: {
    backgroundColor: COLORS.offwhite,
    borderRadius: 16,
    width: '90%',
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    marginTop: 40,
  },
  circleIconContainer: {
    position: 'absolute',
    top: -40,
    alignSelf: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.beige,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  icon: {
    fontSize: 40,
  },
  cardContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    minWidth: 200,
    backgroundColor: COLORS.beige,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
});

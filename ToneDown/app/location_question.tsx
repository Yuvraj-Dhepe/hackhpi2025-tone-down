import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { styles as globalStyles, COLORS } from './styles';
import Question from './utility';
import BottomNav from './BottomNav';
import { saveQuestionResponse, getQuestionResponses, getUserData } from './storage';

interface UserData {
  id?: string;
  name?: string;
  age?: string | number;
  sex?: string;
  [key: string]: any; // Allow for additional properties
}

interface QuestionResponses {
  tinnitus?: number | string;
  stress?: number | string;
  sleep?: number | string;
  noise?: number | string;
  intoxication?: string;
  location?: string;
  [key: string]: any; // Allow for additional responses
}

export default function LocationQuestion() {
  const locations = ["Home", "Work", "Other"];
  // Select the middle option by default (index 1 in a 3-item array)
  const [selectedLocation, setSelectedLocation] = useState(locations[1]);
  const [isLoading, setIsLoading] = useState(false);

  // Remove or modify the useEffect that loads previous responses
  // useEffect(() => {
  //   const loadPreviousResponse = async () => {
  //     const responses = await getQuestionResponses();
  //     if (responses.location) {
  //       setSelectedLocation(responses.location);
  //     }
  //   };
  //   
  //   loadPreviousResponse();
  // }, []);

  const convertToCSV = (userData: { id?: string, isPrivate?: boolean }, responses: Record<string, any>) => {
    // Create headers - now including is_private field
    const headers = ['uid', 'tinnitus-initial', 'stress', 'sleep', 'noise', 'intoxication', 'location', 'is_private', 'timestamp'];
    
    // Create data row
    const timestamp = new Date().toISOString();
    const userId = userData?.id || 'anonymous';
    const isPrivate = userData?.isPrivate || false;
    
    const data = [
      userId,
      responses.tinnitus || '',
      responses.stress || '',
      responses.sleep || '',
      responses.noise || '',
      responses.intoxication || '',
      responses.location || '',
      isPrivate.toString(),
      timestamp
    ];
    
    // Combine headers and data
    const csvContent = [
      headers.join(','),
      data.join(',')
    ].join('\n');
    
    return csvContent;
  };

  const sendDataToBackend = async (csvData: string, userId: string) => {
    try {
      const response = await fetch('http://localhost:5000/api/upload-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          csv_data: csvData,
          user_id: userId,
          with_feedback: false
        }),
      });
      
      const result = await response.json();
      console.log('Backend response:', result);
      return result;
    } catch (error) {
      console.error('Error sending data to backend:', error);
      throw error;
    }
  };

  const handleContinue = async () => {
    if (selectedLocation) {
      setIsLoading(true);
      try {
        // Save the current response
        await saveQuestionResponse('location', selectedLocation);
        
        // Get all responses and user data
        const responses = await getQuestionResponses();
        const userData = await getUserData();
        
        // Convert to CSV
        const csvData = convertToCSV(userData, responses);
        
        // Send to backend
        await sendDataToBackend(csvData, userData?.id || 'anonymous');
        
        // Navigate to results
        router.push('/results');
      } catch (error) {
        console.error('Error in submission process:', error);
        // Still navigate to results even if backend submission fails
        router.push('/results');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <View style={{height: "100%"}}>
      <ThemedView style={[globalStyles.container, styles.centeredContainer]}>
        <View style={styles.cardContainer}>
          <View style={styles.circleIconContainer}>
            <ThemedText style={styles.icon}>📍</ThemedText>
          </View>
          
          <View style={styles.cardContent}>
            <ThemedText type="title" style={styles.title}>
              Current Location
            </ThemedText>
            
            <ThemedText style={styles.question}>
              Where are you at the moment?
            </ThemedText>
            
            <Question 
              title="" 
              value={selectedLocation || ''} 
              setValue={setSelectedLocation} 
              inputType="buttons" 
              options={locations}
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[globalStyles.button, styles.button, 
              (!selectedLocation || isLoading) && styles.buttonDisabled]}
            disabled={!selectedLocation || isLoading}
            onPress={handleContinue}
          >
            <ThemedText style={globalStyles.buttonText}>
              {isLoading ? "Submitting..." : "Finish"}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  }
});

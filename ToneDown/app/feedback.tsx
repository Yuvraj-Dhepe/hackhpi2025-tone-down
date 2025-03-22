import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useState, useEffect } from 'react';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, router } from 'expo-router';
import Slider from '@react-native-community/slider';
import { styles as globalStyles, COLORS } from './styles';
import BottomNav from './BottomNav';
import { saveQuestionResponse, getQuestionResponses, getUserData, getSelectedIntervention } from './storage';

export default function Feedback() {
  // Always start with middle value, ignore previous responses
  const [sliderValue, setSliderValue] = useState(3);
  const [isHovering, setIsHovering] = useState(false);
  const [userData, setUserData] = useState(null);
  const [allResponses, setAllResponses] = useState({});
  const [selectedIntervention, setSelectedIntervention] = useState<string | null>(null);

  // Modify the useEffect to only load user data, not previous feedback
  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await getUserData();
        setUserData(userData);
        
        const responses = await getQuestionResponses();
        setAllResponses(responses);
        
        const intervention = await getSelectedIntervention();
        setSelectedIntervention(intervention);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    
    loadData();
  }, []);

  const handleSubmit = async () => {
    await saveQuestionResponse('feedback', sliderValue);
    
    // Get all responses and user data
    const responses = await getQuestionResponses();
    const userData = await getUserData();
    
    // Convert to CSV with feedback
    const csvData = convertToCSV(userData, responses);
    
    // Send to backend with feedback flag
    try {
      await sendDataToBackend(csvData, userData?.id || 'anonymous', true);
      console.log('Feedback data sent to backend');
    } catch (error) {
      console.error('Error sending feedback data:', error);
    }
    
    // Navigate to home
    router.push('/home');
  };

  const convertToCSV = (userData: { id?: string, isPrivate?: boolean }, responses: Record<string, any>) => {
    // Create headers including feedback and is_private
    const headers = ['uid', 'tinnitus-initial', 'stress', 'sleep', 'noise', 'intoxication', 'location', 'feedback', 'is_private', 'timestamp'];
    
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
      responses.feedback || '',
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

  const sendDataToBackend = async (csvData: string, userId: string, withFeedback: boolean = false) => {
    try {
      const response = await fetch('http://localhost:5000/api/upload-csv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          csv_data: csvData,
          user_id: userId,
          with_feedback: withFeedback
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

  const renderSliderLabels = () => {
    return (
      <View style={styles.sliderLabelsContainer}>
        <ThemedText style={styles.sliderLabel}>Not Helpful</ThemedText>
        <ThemedText style={styles.sliderLabel}>Very Helpful</ThemedText>
      </View>
    );
  };

  return (
    <ThemedView style={localStyle.container}>
      <ThemedView style={[globalStyles.container, styles.centeredContainer]}>
        <View style={styles.cardContainer}>
          <View style={styles.circleIconContainer}>
            <ThemedText style={styles.icon}>📝</ThemedText>
          </View>
          
          <View style={styles.cardContent}>
            <ThemedText type="title" style={styles.title}>
              Feedback
            </ThemedText>
            
            {selectedIntervention && (
              <ThemedText style={styles.selectedIntervention}>
                Selected Intervention: {selectedIntervention}
              </ThemedText>
            )}
            
            <ThemedText style={styles.question}>
              How helpful was the intervention?
            </ThemedText>
            
            <View style={styles.sliderContainer}>
              <View style={styles.sliderWithValueContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={1}
                  maximumValue={5}
                  // Remove the step property to allow continuous values
                  // step={0.1}
                  value={sliderValue}
                  onValueChange={(value) => {
                    setSliderValue(value);
                    setIsHovering(true);
                  }}
                  onSlidingComplete={() => {
                    setTimeout(() => setIsHovering(false), 1500);
                  }}
                  minimumTrackTintColor="#3498db"
                  maximumTrackTintColor="#bdc3c7"
                  thumbTintColor="#2980b9"
                />
                {isHovering && (
                  <View 
                    style={[
                      styles.hoverValueContainer, 
                      { left: `${((sliderValue - 1) / 4) * 100}%` }
                    ]}
                  >
                    <ThemedText style={styles.hoverValue}>{sliderValue.toFixed(1)}</ThemedText>
                  </View>
                )}
              </View>
              {renderSliderLabels()}
              <ThemedText style={{
                fontSize: 24,
                fontWeight: 'bold',
                marginTop: 10,
                color: '#2980b9'
              }}>
                {sliderValue.toFixed(1)}
              </ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[globalStyles.button, styles.button]}
            onPress={handleSubmit}
          >
            <ThemedText style={globalStyles.buttonText}>Submit</ThemedText>
          </TouchableOpacity>
        </View>
      </ThemedView>
      <BottomNav />
    </ThemedView>
  );
}

const localStyle = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.background,
  }
});
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
    marginBottom: 30,
    textAlign: 'center',
  },
  sliderContainer: {
    width: '100%',
    alignItems: 'center',
  },
  sliderWithValueContainer: {
    width: '100%',
    position: 'relative',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  hoverValueContainer: {
    position: 'absolute',
    top: -30,
    backgroundColor: '#2980b9',
    padding: 5,
    borderRadius: 5,
    transform: [{ translateX: -15 }],
  },
  hoverValue: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  sliderLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
    marginTop: -10,
  },
  sliderLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
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
  selectedIntervention: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.green,
    fontWeight: 'bold',
  },
});

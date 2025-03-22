import { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, router } from 'expo-router';
import { styles as globalStyles, COLORS } from './styles';
import BottomNav from './BottomNav';
import { getUserData, saveSelectedIntervention } from './storage';

// Define intervention emojis
const INTERVENTION_EMOJIS: Record<string, string> = {
  'Take a walk': '🚶',
  'Listen to calming music': '🎵',
  'Deep breathing exercise': '🧘',
  'Mindfulness meditation': '🧘‍♂️',
  'Progressive muscle relaxation': '💪',
  'White noise': '🌊'
};

export default function Results() {
  const [isLoading, setIsLoading] = useState(true);
  const [diagnosisProbabilities, setDiagnosisProbabilities] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  // Fetch probabilities from backend
  useEffect(() => {
    const fetchProbabilities = async () => {
      try {
        setIsLoading(true);
        const userData = await getUserData();
        if (!userData?.id) {
          throw new Error('No user ID found');
        }

        const response = await fetch(`http://localhost:5000/api/get-analysis?user_id=${userData.id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        // setDiagnosisProbabilities(data);

        // Mock-up results
        setDiagnosisProbabilities({
          'Take a walk': 0.85,
          'Listen to calming music': 0.06,
          'Deep breathing exercise': 0.03,
          'Mindfulness meditation': 0.03,
          'Progressive muscle relaxation': 0.02,
          'White noise': 0.01
        });
      } catch (error) {
        console.error('Error fetching analysis:', error);
        setError('Failed to load analysis. Please try again later.');
        
        // Fallback to mock data if backend is unavailable
        setDiagnosisProbabilities({
          'Take a walk': 0.85,
          'Listen to calming music': 0.06,
          'Deep breathing exercise': 0.03,
          'Mindfulness meditation': 0.03,
          'Progressive muscle relaxation': 0.02,
          'White noise': 0.01
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProbabilities();
  }, []);

  const renderProbabilityBar = (probability: number) => {
    return (
      <View style={styles.barContainer}>
        <View style={[styles.bar, { width: `${probability * 100}%` }]} />
      </View>
    );
  };

  const handleInterventionClick = async (intervention: string) => {
    await saveSelectedIntervention(intervention);
    router.push('/feedback');
  };

  return (
    <View style={{ flex: 1, paddingBottom: 60 }}>
      <ThemedView style={[globalStyles.container, styles.container]}>
        <ThemedText type="title" style={styles.title}>
          Your Results
        </ThemedText>

        {isLoading ? (
          <ThemedText style={styles.loadingText}>Loading your analysis...</ThemedText>
        ) : error ? (
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        ) : (
          <View style={styles.resultsContainer}>
            {Object.entries(diagnosisProbabilities).map(([key, value]) => (
              <TouchableOpacity 
                key={key} 
                style={styles.resultItem}
                onPress={() => handleInterventionClick(key)}
              >
                <View style={styles.interventionRow}>
                  <ThemedText style={styles.emoji}>{INTERVENTION_EMOJIS[key]}</ThemedText>
                  <ThemedText style={styles.intervention}>
                    {key}: {Math.round(value * 100)}%
                  </ThemedText>
                </View>
                {renderProbabilityBar(value)}
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ThemedView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    marginRight: 8,
  },
  titleBold: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  resultsContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  interventionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  emoji: {
    fontSize: 20,
    marginRight: 10,
  },
  resultItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: COLORS.offwhite,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  intervention: {
    fontSize: 16,
    marginBottom: 5,
  },
  barContainer: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: COLORS.green,
    borderRadius: 10,
  },
});

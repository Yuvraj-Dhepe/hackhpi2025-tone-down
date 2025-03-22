import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import BottomNav from '../BottomNav';
import { styles as globalStyles, COLORS } from '../styles';
import { useState } from 'react';

export default function ExerciseScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('cardio');
  
  const windowWidth = Dimensions.get('window').width;
  
  const exerciseTypes = {
    cardio: {
      title: "Cardio",
      description: "Regular cardiovascular exercise can improve blood circulation, potentially reducing tinnitus symptoms and improving overall health.",
      exercises: [
        {
          name: "Walking",
          duration: "30 min",
          frequency: "Daily",
          benefits: "Low-impact, improves circulation, reduces stress"
        },
        {
          name: "Swimming",
          duration: "20-30 min",
          frequency: "3-4× weekly",
          benefits: "Gentle on joints, full-body workout, relaxing"
        },
        {
          name: "Cycling",
          duration: "20-45 min",
          frequency: "3× weekly",
          benefits: "Improves heart health, low-impact on joints"
        }
      ]
    },
    strength: {
      title: "Strength",
      description: "Moderate strength training can help reduce stress and improve sleep quality, both beneficial for tinnitus management.",
      exercises: [
        {
          name: "Bodyweight Exercises",
          duration: "15-20 min",
          frequency: "3× weekly",
          benefits: "Builds strength without equipment, adaptable"
        },
        {
          name: "Resistance Bands",
          duration: "20 min",
          frequency: "2-3× weekly",
          benefits: "Gentle resistance, good for beginners"
        },
        {
          name: "Light Weights",
          duration: "20-30 min",
          frequency: "2× weekly",
          benefits: "Builds muscle tone, improves metabolism"
        }
      ]
    },
    flexibility: {
      title: "Flexibility",
      description: "Flexibility exercises can help reduce tension, especially in the neck and jaw areas which may influence tinnitus perception.",
      exercises: [
        {
          name: "Gentle Yoga",
          duration: "20-30 min",
          frequency: "3-4× weekly",
          benefits: "Reduces tension, improves breathing, calming"
        },
        {
          name: "Neck & Shoulder Stretches",
          duration: "5-10 min",
          frequency: "Daily",
          benefits: "Targets areas that may affect tinnitus"
        },
        {
          name: "Tai Chi",
          duration: "20 min",
          frequency: "2-3× weekly",
          benefits: "Combines movement and meditation"
        }
      ]
    },
    balance: {
      title: "Balance",
      description: "Balance exercises help the vestibular system, which is connected to hearing and can influence tinnitus in some people.",
      exercises: [
        {
          name: "Single Leg Stands",
          duration: "5 min",
          frequency: "Daily",
          benefits: "Simple, can be done anywhere, improves stability"
        },
        {
          name: "Balance Board",
          duration: "10 min",
          frequency: "3× weekly",
          benefits: "Challenges vestibular system, improves coordination"
        },
        {
          name: "Heel-to-Toe Walk",
          duration: "5 min",
          frequency: "Daily",
          benefits: "Simple balance practice, no equipment needed"
        }
      ]
    }
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background, paddingBottom: 60 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 80 }}>
        <View style={globalStyles.container}>
          <Text style={[globalStyles.title, {marginTop: 20}]}>
            <Text style={globalStyles.titleBold}>Exercise</Text> for Tinnitus Management
          </Text>
          
          <Text style={styles.introText}>
            Regular physical activity can help reduce the impact of tinnitus through 
            improved circulation, stress reduction, and better sleep. Finding the right 
            exercise routine can be an essential part of your tinnitus management plan.
          </Text>
          
          <Image 
            source={require('../../assets/images/Cricket-pana.svg')} 
            style={{ width: 250, height: 250, alignSelf: 'center', marginVertical: 10, marginBottom:-10 }}
          />
          
          {/* Horizontal Tab Navigation */}
          <View style={styles.tabContainer}>
            {Object.keys(exerciseTypes).map(type => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.tabButton,
                  activeTab === type && styles.activeTabButton
                ]}
                onPress={() => setActiveTab(type)}
              >
                <Text 
                  style={[
                    styles.tabText, 
                    activeTab === type && styles.activeTabText
                  ]}
                >
                  {exerciseTypes[type].title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Active Tab Content */}
          <View style={styles.tabContent}>
            <Text style={styles.tabDescription}>
              {exerciseTypes[activeTab].description}
            </Text>
            
            {/* Exercise Cards */}
            {exerciseTypes[activeTab].exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <Text style={styles.exerciseName}>{exercise.name}</Text>
                  <View style={styles.exerciseMetrics}>
                    <View style={styles.metricBadge}>
                      <Text style={styles.metricText}>{exercise.duration}</Text>
                    </View>
                    <View style={[styles.metricBadge, {backgroundColor: COLORS.lightgreen}]}>
                      <Text style={styles.metricText}>{exercise.frequency}</Text>
                    </View>
                  </View>
                </View>
                <Text style={styles.exerciseBenefits}>{exercise.benefits}</Text>
              </View>
            ))}
          </View>
          
          <View style={styles.noteContainer}>
            <Text style={styles.noteTitle}>Important Tips:</Text>
            <Text style={styles.noteText}>
              • Start slowly and gradually increase intensity{'\n'}
              • Listen to your body and avoid overexertion{'\n'}
              • Stay hydrated before, during, and after exercise{'\n'}
              • Consult a healthcare provider before starting a new exercise program
            </Text>
          </View>
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  introText: {
    textAlign: 'center', 
    marginHorizontal: 20, 
    marginBottom: 10, 
    marginTop: 10,
    color: COLORS.textPrimary,
    lineHeight: 22
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: COLORS.offwhite,
    borderRadius: 25,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    width: '90%',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTabButton: {
    backgroundColor: COLORS.yellow,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
  tabContent: {
    marginHorizontal: 20,
    marginTop: 15,
  },
  tabDescription: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
    marginBottom: 15,
    backgroundColor: COLORS.lightblue,
    padding: 15,
    borderRadius: 12,
  },
  exerciseCard: {
    backgroundColor: COLORS.beige,
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  exerciseMetrics: {
    flexDirection: 'row',
    gap: 5,
  },
  metricBadge: {
    backgroundColor: COLORS.lightblue,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  metricText: {
    fontSize: 12,
    color: COLORS.textPrimary,
    fontWeight: '500',
  },
  exerciseBenefits: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontStyle: 'italic',
  },
  noteContainer: {
    marginTop: 25,
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: COLORS.green,
    borderRadius: 12,
    marginBottom: 20,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
  },
  noteText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
  }
});
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Link } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { COLORS } from './styles';
import BottomNav from './BottomNav';

export default function HomeScreen() {
  const categories = [
    { 
      id: 'music', 
      title: 'Listening to Music', 
      backgroundColor: COLORS.lightgreen, 
      route: '/interventions/music'
    },
    { 
      id: 'id2', 
      title: 'Improve Sleep', 
      backgroundColor: COLORS.blue,
      route: '/interventions/sleep',
      hasPlant: true
    },
    { 
      id: 'id3', 
      title: 'Distraction', 
      backgroundColor: COLORS.yellow,
      route: '/interventions/distraction',
      hasPlant: true
    },
    { 
      id: 'id4', 
      title: 'Exercise', 
      backgroundColor: COLORS.darkbeige,
      route: '/interventions/excercise'
    },
    { 
      id: 'id5', 
      title: 'Mindfulness', 
      backgroundColor: COLORS.red,
      route: '/interventions/mindfulness'
    }
  ];

  return (
    <View style={{flex: 1, paddingBottom: 60}}>
    <SafeAreaView style={styles.container}>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Tips</Text>
        <Text style={styles.mainHeading}>
          Interventions <Text style={styles.boldText}>based on your needs</Text>
        </Text>

        <View style={styles.cardsContainer}>
          {categories.map((category, index) => (
            <Link key={category.id} href={category.route} asChild>
              <TouchableOpacity 
               style={{
                ...styles.card, 
                backgroundColor: category.backgroundColor
              }}
              >
                <Text style={styles.cardTitle}>{category.title}</Text>
                
                <View style={styles.arrowContainer}>
                  <Feather name="arrow-up-right" size={18} color="#000" />
                </View>
              </TouchableOpacity>
            </Link>
          ))}
        </View>
      </View>

    </SafeAreaView>
    <BottomNav/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  logoContainer: {
    padding: 8,
  },
  logo: {
    width: 24,
    height: 24,
    backgroundColor: '#000',
    transform: [{ rotate: '45deg' }],
  },
  searchButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  mainHeading: {
    fontSize: 28,
    lineHeight: 36,
    marginBottom: 20,
  },
  boldText: {
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 140,
    borderRadius: 24,
    padding: 20,
    marginBottom: 15,
    position: 'relative',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    maxWidth: '80%',
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
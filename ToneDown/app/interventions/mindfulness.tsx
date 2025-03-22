import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import BottomNav from '../BottomNav'; // Import BottomNav
import { styles, COLORS } from '../styles';

export default function MusicScreen() {
  const router = useRouter();
  
  // Music genres data
  const musicGenres = [
    { id: 1, name: "Meditation (Beginner)", color: COLORS.lightblue },
    { id: 2, name: "Meditation (Novice)", color: COLORS.beige },
    { id: 3, name: "Meditation (Advanced)", color: COLORS.lightgreen },
    { id: 4, name: "Breathing Excercie", color: COLORS.yellow },
    { id: 5, name: "Mental Journey", color: COLORS.blue },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background, paddingBottom: 60 }}>
      {/* ScrollView to make content scrollable */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Practice mindfulness to improve <Text style={{fontWeight: 'bold'}}>resilience</Text></Text>
          <Text style={{textAlign: 'center', marginHorizontal: 20, marginBottom: 10}}>
            Mindfulness can help you deal with stress, emotion control, and change your brain activity! Try different excercises below.
          </Text>
          <Image source={require('../../assets/images/Meditation-pana.svg')} 
            style={{ width: 250, height: 250, alignSelf: 'center', marginTop: -10 }}
          />
          
          {/* Music Genres Section */}
          <View style={genreStyles.genresContainer}>
            {musicGenres.map(genre => (
              <TouchableOpacity 
                key={genre.id}
                style={[genreStyles.genreBar, {backgroundColor: genre.color}]}
                onPress={() => console.log(`Playing ${genre.name}`)}
              >
                <Text style={genreStyles.genreText}>{genre.name}</Text>
                <View style={genreStyles.playButton}>
                  <Text style={genreStyles.playIcon}>▶</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
      <BottomNav />
    </View>
  );
}

const genreStyles = StyleSheet.create({
  genresContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  genreBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  genreText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
  },
  playButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  playIcon: {
    fontSize: 14,
    marginLeft: 2, // Slight adjustment to center the play icon
    color: COLORS.textPrimary,
  }
});
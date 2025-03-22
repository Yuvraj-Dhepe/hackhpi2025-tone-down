import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import BottomNav from '../BottomNav';
import { styles as globalStyles, COLORS } from '../styles';
import { useState } from 'react';

export default function DistractionScreen() {
  const router = useRouter();
  const [expandedTip, setExpandedTip] = useState(null);
  
  const toggleTip = (tipId) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };
  
  const tips = [
    {
      id: 1,
      title: "Engage in Absorbing Activities",
      color: COLORS.beige,
      content: [
        "Choose hobbies that require full attention like painting or puzzles",
        "Learn a new skill that challenges your mind",
        "Try activities that involve multiple senses at once"
      ]
    },
    {
      id: 2,
      title: "Use Background Sounds",
      color: COLORS.lightblue,
      content: [
        "Play nature sounds like rain or ocean waves",
        "Use soft music that you find pleasant but not distracting",
        "Try ambient noise generators designed for tinnitus relief"
      ]
    },
    {
      id: 3,
      title: "Practice Mindful Movement",
      color: COLORS.lightgreen,
      content: [
        "Try yoga, tai chi, or gentle stretching exercises",
        "Focus on the sensations in your body while walking",
        "Use exercise as a way to shift attention away from tinnitus"
      ]
    },
    {
      id: 4,
      title: "Social Engagement",
      color: COLORS.yellow,
      content: [
        "Have meaningful conversations with friends or family",
        "Join community groups or classes related to your interests",
        "Volunteer for causes you care about to stay engaged"
      ]
    },
    {
      id: 5,
      title: "Mental Challenges",
      color: COLORS.red,
      content: [
        "Solve puzzles, crosswords, or Sudoku",
        "Play strategy games that require concentration",
        "Read engaging books that capture your full attention"
      ]
    },
    {
      id: 6,
      title: "Create a 'Tinnitus Toolkit'",
      color: COLORS.green,
      content: [
        "Prepare a list of go-to distractions for difficult moments",
        "Include quick activities for when tinnitus spikes",
        "Have portable options ready when you're away from home"
      ]
    }
  ];
  
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background, paddingBottom: 60 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={globalStyles.container}>
          <Text style={[globalStyles.title, {marginTop: 20}]}>
            <Text style={globalStyles.titleBold}>Positive Distraction</Text> for Tinnitus Relief
          </Text>
          
          <Text style={styles.introText}>
            Using positive distractions can help reduce your awareness of tinnitus. 
            When your mind is engaged elsewhere, the perception of tinnitus often 
            diminishes, giving you relief and improving your quality of life.
          </Text>
          
          <Image 
            source={require('../../assets/images/Sudoku.svg')} 
            style={{ width: 250, height: 250, alignSelf: 'center', marginVertical: 10 }}
          />
          
          <Text style={[globalStyles.subtitle, {marginTop: 10, marginBottom: 15, alignSelf: 'flex-start', paddingLeft: 20}]}>
            Effective Distraction Techniques
          </Text>
          
          <View style={styles.tipsContainer}>
            {tips.map((tip) => (
              <View key={tip.id} style={styles.tipWrapper}>
                <TouchableOpacity 
                  style={[styles.tipCard, {backgroundColor: tip.color}]}
                  onPress={() => toggleTip(tip.id)}
                  activeOpacity={0.7}
                >
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text style={styles.expandIcon}>{expandedTip === tip.id ? '−' : '+'}</Text>
                </TouchableOpacity>
                
                {expandedTip === tip.id && (
                  <View style={styles.tipContent}>
                    {tip.content.map((item, index) => (
                      <View key={index} style={styles.tipItem}>
                        <Text style={styles.tipBullet}>•</Text>
                        <Text style={styles.tipText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
          
          <View style={styles.noteContainer}>
            <Text style={styles.noteText}>
              Remember that distraction works best as part of a comprehensive approach 
              to tinnitus management. Find what works for you and incorporate those 
              techniques into your daily routine.
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
  tipsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  tipWrapper: {
    marginBottom: 10,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: COLORS.offwhite,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderRadius: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
    flex: 1,
  },
  expandIcon: {
    fontSize: 24,
    color: COLORS.textPrimary,
    marginLeft: 10,
  },
  tipContent: {
    padding: 15,
    backgroundColor: COLORS.offwhite,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 10,
  },
  tipBullet: {
    fontSize: 16,
    marginRight: 8,
    color: COLORS.textPrimary,
  },
  tipText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    flex: 1,
    lineHeight: 20,
  },
  noteContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: COLORS.lightblue,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.blue,
  },
  noteText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    lineHeight: 20,
  }
});
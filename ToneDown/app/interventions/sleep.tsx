import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';
import BottomNav from '../BottomNav'; // Import BottomNav
import { styles as globalStyles, COLORS } from '../styles';
import { useState } from 'react';

export default function SleepScreen() {
  const router = useRouter();
  const [expandedTip, setExpandedTip] = useState(null);
  
  const toggleTip = (tipId) => {
    setExpandedTip(expandedTip === tipId ? null : tipId);
  };
  
  const tips = [
    {
      id: 1,
      title: "Create a Calming Environment",
      color: COLORS.beige,
      content: [
        "Keep your bedroom cool, dark, and quiet",
        "Use blackout curtains and consider a white noise machine",
        "Remove digital devices at least 1 hour before bedtime"
      ]
    },
    {
      id: 2,
      title: "Establish a Regular Routine",
      color: COLORS.lightblue,
      content: [
        "Go to bed and wake up at the same time each day",
        "Create a relaxing pre-sleep ritual (reading, gentle stretching)",
        "Avoid naps late in the day"
      ]
    },
    {
      id: 3,
      title: "Watch What You Consume",
      color: COLORS.lightgreen,
      content: [
        "Limit caffeine and alcohol, especially in the evening",
        "Avoid heavy meals close to bedtime",
        "Stay hydrated throughout the day, but reduce fluids before bed"
      ]
    },
    {
      id: 4,
      title: "Use Sound Therapy",
      color: COLORS.yellow,
      content: [
        "Low-level background sounds can mask tinnitus",
        "Try nature sounds, gentle music, or white noise",
        "Experiment with sound pillows or headbands designed for sleep"
      ]
    },
    {
      id: 5,
      title: "Manage Stress and Anxiety",
      color: COLORS.red,
      content: [
        "Practice relaxation techniques like deep breathing",
        "Try progressive muscle relaxation before bed",
        "Consider meditation focused on body awareness"
      ]
    },
    {
      id: 6,
      title: "Create a Comfortable Sleep Environment",
      color: COLORS.green,
      content: [
        "Invest in a comfortable mattress and pillow",
        "Keep the room at a comfortable temperature",
        "Consider sleep-friendly earplugs if needed"
      ]
    }
  ];
  
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background, paddingBottom: 60 }}>
      {/* ScrollView to make content scrollable */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={globalStyles.container}>
          <Text style={[globalStyles.title, {marginTop: 20}]}>
            <Text style={globalStyles.titleBold}>Sleep Better</Text> to Manage Tinnitus
          </Text>
          
          <Text style={styles.introText}>
            Getting quality sleep is essential for managing tinnitus. Proper rest can reduce the perceived intensity of tinnitus and improve your overall well-being.
          </Text>
          
          <Image 
            source={require('../../assets/images/Sleep analysis-rafiki.svg')} 
            style={{ width: 250, height: 250, alignSelf: 'center', marginVertical: 10, marginBottom: -30, marginTop:-20 }}
          />
          
          <Text style={[globalStyles.subtitle, {marginTop: 10, marginBottom: 15, alignSelf: 'flex-start', paddingLeft: 20}]}>
            Tips for Better Sleep with Tinnitus
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
              If sleep problems persist despite these strategies, consider consulting with a healthcare provider who specializes in both sleep and tinnitus management.
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
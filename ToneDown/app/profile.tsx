import { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from './BottomNav';
import { styles } from './styles';

export default function Profile() {
    const [userData, setUserData] = useState({
        name: '',
        age: '',
        sex: ''
    });

    useEffect(() => {
        const getUserData = async () => {
            try {
                const storedData = await AsyncStorage.getItem('userData');
                if (storedData) {
                    setUserData(JSON.parse(storedData));
                }
            } catch (error) {
                console.error('Error retrieving user data:', error);
            }
        };

        getUserData();
    }, []);

    return (
        <View style={{flex: 1, paddingBottom: 60}}>
            <ThemedView style={styles.container}>
                <ThemedText type="title" style={styles.title}><b>Profile</b></ThemedText>
                <ThemedText style={styles.text}>Welcome to your profile page</ThemedText>
                <View>
                <Image
                    style={{ width: 250, height: 250, alignSelf: 'center', marginTop:-10, marginBottom: 20 }} 
                    source={require('../assets/images/Powerful-amico.svg')} 
                />
                <View style={styles.profileDetails}>
                    <ThemedText style={styles.text}><b>Name:</b> {userData.name || 'Not set'}</ThemedText>
                    <ThemedText style={styles.text}><b>Age:</b> {userData.age || 'Not set'}</ThemedText>
                    <ThemedText style={styles.text}><b>Sex:</b> {userData.sex || 'Not set'}</ThemedText>
                </View>
                </View>
            </ThemedView>
            <BottomNav />
        </View>
    );
}

import React from 'react';
import { View, Text, Button } from 'react-native';
import { auth } from './firebaseConfig';
import { signOut } from 'firebase/auth';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ยินดีต้อนรับสู่หน้า Home!</Text>
      <Button title="ออกจากระบบ" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;

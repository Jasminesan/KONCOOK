import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, SafeAreaView } from 'react-native';
import { auth } from './firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert('⚠️ ข้อผิดพลาด', 'กรุณากรอกอีเมล');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('✅ สำเร็จ', 'กรุณาตรวจสอบอีเมลของคุณเพื่อรีเซ็ตรหัสผ่าน', [
        { text: 'OK', onPress: () => navigation.replace('Login') },
      ]);
    } catch (error) {
      Alert.alert('⚠️ เกิดข้อผิดพลาด', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <Image
          source={{ uri: 'https://scontent.fbkk5-5.fna.fbcdn.net/v/t1.15752-9/481073960_1329249541533207_6253840061047603136_n.png?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_ohc=Lth9rhwLVKcQ7kNvgGwtwiA&_nc_oc=AdhFcHjHwu7l1jiT22prsuZ9I2s0jOfi7KmqH0ix-Pc8S9jhNfba4PLEwiuprS7UMztqJoHzDaVoXRlI6gpTwTHY&_nc_zt=23&_nc_ht=scontent.fbkk5-5.fna&oh=03_Q7cD1gFCSna6li9ejiqDWpFCy0hG2xAAcfzT4a1LpNXbXpEjvg&oe=67EEAACE' }}
          style={styles.image}
        />
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.label}>กรอกอีเมลเพื่อรีเซ็ตรหัสผ่าน</Text>
        <TextInput 
          style={styles.input} 
          placeholder="กรอกอีเมล" 
          placeholderTextColor="#888" 
          secureTextEntry
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address" 
        />

        <TouchableOpacity style={styles.loginButton} onPress={handleResetPassword}>
          <Text style={styles.loginButtonText}>ส่งคำขอรีเซ็ต</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signUpText}>กลับไปที่หน้าเข้าสู่ระบบ</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomSection: {
    flex: 0.5,
    backgroundColor: '#303030',
    padding: 20,
    justifyContent: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    color: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#F3B872',
    paddingVertical: 15,
    borderRadius: 90,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signUpButton: {
    alignItems: 'center',
  },
  signUpText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;

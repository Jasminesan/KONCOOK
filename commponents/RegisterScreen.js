import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, SafeAreaView } from 'react-native';
import { auth, db } from './firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('⚠️ ข้อผิดพลาด', 'กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        image: 'https://via.placeholder.com/100'
      });

      // ✅ แจ้งเตือนว่าทำรายการเสร็จแล้ว
      Alert.alert('✅ สมัครสำเร็จ', 'ไปที่หน้าเข้าสู่ระบบ', [
        { text: 'OK', onPress: () => navigation.replace('Login') }
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
        <Text style={styles.label}>ชื่อผู้ใช้</Text>
        <TextInput style={styles.input} placeholder="กรอกชื่อผู้ใช้" placeholderTextColor="#888" secureTextEntry value={name} onChangeText={setName} />

        <Text style={styles.label}>อีเมล</Text>
        <TextInput style={styles.input} placeholder="กรอกอีเมล" placeholderTextColor="#888"  value={email} onChangeText={setEmail} keyboardType="email-address" />

        <Text style={styles.label}>รหัสผ่าน</Text>
        <TextInput style={styles.input} placeholder="กรอกรหัสผ่าน" placeholderTextColor="#888" value={password} onChangeText={setPassword} secureTextEntry />

        <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
          <Text style={styles.loginButtonText}>สมัครสมาชิก</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpButton} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signUpText}>เข้าสู่ระบบ</Text>
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
    flex: 1,
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

export default RegisterScreen;

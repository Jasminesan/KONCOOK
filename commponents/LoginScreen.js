import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; // นำเข้า Firebase

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('แจ้งเตือน', 'กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Home'); // เปลี่ยนหน้าไป Home และปิดหน้า Login
    } catch (error) {
      Alert.alert('เข้าสู่ระบบไม่สำเร็จ', error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* ส่วนบน: ภาพ */}
      <View style={styles.topSection}>
        <Image
          source={{ uri: 'https://scontent.fbkk5-5.fna.fbcdn.net/v/t1.15752-9/481073960_1329249541533207_6253840061047603136_n.png?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_ohc=Lth9rhwLVKcQ7kNvgGwtwiA&_nc_oc=AdhFcHjHwu7l1jiT22prsuZ9I2s0jOfi7KmqH0ix-Pc8S9jhNfba4PLEwiuprS7UMztqJoHzDaVoXRlI6gpTwTHY&_nc_zt=23&_nc_ht=scontent.fbkk5-5.fna&oh=03_Q7cD1gFCSna6li9ejiqDWpFCy0hG2xAAcfzT4a1LpNXbXpEjvg&oe=67EEAACE' }}
          style={styles.image}
        />
      </View>

      {/* ส่วนล่าง: พื้นหลังสีดำและฟอร์มล็อกอิน */}
      <View style={styles.bottomSection}>
        <Text style={styles.label}>อีเมล</Text>
        <TextInput
          style={styles.input}
          placeholder="กรอกอีเมล"
          placeholderTextColor="#888"
          secureTextEntry
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>รหัสผ่าน</Text>
        <TextInput
          style={styles.input}
          placeholder="กรอกรหัสผ่าน"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotPasswordText}>ลืมรหัสผ่าน</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>เข้าสู่ระบบ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signUpButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.signUpText}>สร้างบัญชีใหม่</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 0.75,
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
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: 14,
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

export default LoginScreen;

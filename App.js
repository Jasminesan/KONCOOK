import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './commponents/firebaseConfig';  // นำเข้า Firebase

import WelcomeScreen from './commponents/WelcomeScreen';
import LoginScreen from './commponents/LoginScreen';
import RegisterScreen from './commponents/RegisterScreen';
import HomeScreen from './commponents/HomeScreen';  // เพิ่มหน้าหลัก
import ForgotPasswordScreen from './commponents/ForgotPasswordScreen'; // เพิ่มหน้ากู้รหัสผ่าน

const Stack = createStackNavigator();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ตรวจสอบสถานะการล็อกอิน
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return unsubscribe; // Cleanup subscription
  }, []);

  if (loading) return null; // ป้องกันการโหลดหน้าจอเปล่าๆ

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={user ? 'Home' : 'Welcome'}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function SafeWrapper({ children }) {
  return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
}

export default function AppWrapper() {
  return (
    <SafeWrapper>
      <App />
    </SafeWrapper>
  );
}

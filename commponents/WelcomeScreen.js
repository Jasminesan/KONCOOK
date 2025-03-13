import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* ส่วนบน: ภาพ */}
      <View style={styles.topSection}>
        <Image
          source={{ uri: 'https://scontent.fbkk5-5.fna.fbcdn.net/v/t1.15752-9/481073960_1329249541533207_6253840061047603136_n.png?_nc_cat=100&ccb=1-7&_nc_sid=9f807c&_nc_ohc=Lth9rhwLVKcQ7kNvgGwtwiA&_nc_oc=AdhFcHjHwu7l1jiT22prsuZ9I2s0jOfi7KmqH0ix-Pc8S9jhNfba4PLEwiuprS7UMztqJoHzDaVoXRlI6gpTwTHY&_nc_zt=23&_nc_ht=scontent.fbkk5-5.fna&oh=03_Q7cD1gFCSna6li9ejiqDWpFCy0hG2xAAcfzT4a1LpNXbXpEjvg&oe=67EEAACE' }}
          style={styles.image}
        />
      </View>

      {/* ส่วนล่าง: พื้นหลังสีดำและข้อความสีขาว */}
      <View style={styles.bottomSection}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>ยินดีต้อนรับ {'\n'}เชฟมือใหม่</Text>
          <Text style={styles.subtitle}>ขอให้สนุก</Text>
        </View>

        {/* ข้อความ "เริ่มสนุกกันเลย" และปุ่มเขียวอยู่ด้านล่าง */}
        <View style={styles.bottomRow}>
          <Text style={styles.description}>เริ่มสนุกกันเลย</Text>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => navigation.navigate('Login')}
          >
            {/* สามเหลี่ยมสีขาวหันไปทางขวา */}
            <View style={styles.triangle} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    flex: 1, // ส่วนบนใช้พื้นที่ 50%
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    // ปรับขนาดภาพให้ครอบคลุมพื้นที่
  },
  bottomSection: {
    flex: 0.5, // ส่วนล่างใช้พื้นที่ 50%
    backgroundColor: '#303030', // พื้นหลังสีดำ
    padding: 20,
    justifyContent: 'space-between', // จัดเนื้อหาให้อยู่ด้านบนและด้านล่าง
  },
  textContainer: {
    paddingLeft: 10, // ข้อความมี padding 10 จากด้านซ้าย
  },
  title: {
    fontSize: 29,
    fontWeight: 'bold',
    color: '#fff', // ข้อความสีขาว
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 24,
    color: '#fff', // ข้อความสีขาว
    marginBottom: 5,
  },
  bottomRow: {
    flexDirection: 'row', // จัดข้อความและปุ่มในแนวนอน
    justifyContent: 'space-between', // กระจายเนื้อหาให้อยู่ด้านซ้ายและขวา
    alignItems: 'center', // จัดให้ข้อความและปุ่มอยู่ตรงกลางแนวตั้ง
    paddingHorizontal: 10, // เพิ่ม padding ด้านซ้ายและขวา
  },
  description: {
    fontSize: 18,
    color: '#fff', // ข้อความสีขาว
  },
  roundButton: {
    width: 60, // ความกว้างของปุ่ม
    height: 60, // ความสูงของปุ่ม
    borderRadius: 30, // ทำให้ปุ่มเป็นวงกลม
    backgroundColor: '#F3B872', // ปุ่มสีเขียว
    justifyContent: 'center',
    alignItems: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15, // ความกว้างของสามเหลี่ยม
    borderRightWidth: 0,
    borderBottomWidth: 10, // ความสูงของสามเหลี่ยม
    borderTopWidth: 10,
    borderLeftColor: '#fff', // สีของสามเหลี่ยม
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    transform: [{ rotate: '0deg' }], // หันสามเหลี่ยมไปทางขวา
  },
});

export default WelcomeScreen;

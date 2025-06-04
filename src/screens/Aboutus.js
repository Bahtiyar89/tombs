import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  Button,
  TouchableOpacity,
} from 'react-native';
import {useTranslation} from 'react-i18next';

const Aboutus = () => {
  const {t, i18n} = useTranslation();
  const [text, onChangeText] = React.useState('');

  const onPressFunction = () => {
    console.log('pressed');
  };
  console.log(t('device_date_and_time'));

  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          width: '80%',
          display: 'flex',
          fontWeight: 'bold',
          textAlign: 'left',
          fontSize: 18,
        }}>
        {t('t:subject')}:
      </Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder="Konu başlıgı"
      />
      <Text
        style={{
          width: '80%',
          display: 'flex',
          paddingTop: 20,
          fontWeight: 'bold',
          textAlign: 'left',
          fontSize: 18,
        }}>
        {t('t:message')}:
      </Text>
      <TextInput
        style={styles.textarea}
        multiline={true}
        numberOfLines={4}
        onChangeText={onChangeText}
        value={text}
        placeholder="Iletim mesacınız"
      />

      <TouchableOpacity
        style={{
          marginTop: 20,
          width: '80%',
          backgroundColor: '#2096f3',
          height: 40,
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onPressFunction}>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
          Gönder
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
  },
  textarea: {
    height: 80,
    width: '80%',
    borderWidth: 1,
    borderRadius: 10,
  },
});

export default Aboutus;

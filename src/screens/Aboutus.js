import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Pressable,
  Button,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import CopySvg from '../svgs/CopySvg';

const LANGUAGES = [
  {code: 'en', label: 'Türkçe'},
  {code: 'ru', label: 'Русский'},
];

const Aboutus = () => {
  const {t, i18n} = useTranslation();
  const [text, onChangeText] = React.useState('');
  const bottomSheet = useRef();
  const [showModal, setShowModal] = useState(false);

  const selectedLanguageCode = i18n.language;
  const onPressFunction = () => {
    console.log('pressed');
  };

  const setLanguage = code => {
    return i18n.changeLanguage(code);
  };

  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <TouchableOpacity
        style={styles.chooseAppLanguage}
        onPress={() => bottomSheet.current.show()}>
        <Text style={styles.text}>{t('t:chooseAppLanguage')}</Text>
      </TouchableOpacity>

      <Text
        style={{
          marginTop: 20,
          color: 'black',
          fontWeight: 'bold',
          fontSize: 16,
        }}>
        Öneri ve istekleriniz için aşagıdaki maile tıklayın
      </Text>

      <View
        style={{
          marginTop: 20,
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          style={{
            padding: 10,
            backgroundColor: '#2096f3',
            height: 40,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => Linking.openURL('mailto:veliler@yaani.com')}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
            veliler@yaani.com
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Alert.alert('mail adresi kopyalandı')}>
          <CopySvg />
        </TouchableOpacity>
      </View>

      <BottomSheet
        dragIconStyle={{width: 98}}
        backgroundColor={'rgba(17, 18, 26, 0.8)'}
        sheetBackgroundColor={'#fff'}
        radius={50}
        hasDraggableIcon
        height={247}
        dragIconColor={'#00ADEF'}
        ref={bottomSheet}>
        <Text style={styles.chooseLanguage}>{t('t:chooseLanguage')}</Text>

        {LANGUAGES.map(language => {
          const selectedLanguage = language.code === selectedLanguageCode;
          return (
            <TouchableOpacity
              key={language.code}
              style={styles.buttonContainer}
              disabled={selectedLanguage}
              onPress={() => setLanguage(language.code)}>
              <Text
                style={[selectedLanguage ? styles.selectedText : styles.text]}>
                {language.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </BottomSheet>
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
  chooseAppLanguage: {
    backgroundColor: '#00ADEF',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'tomato',
    paddingVertical: 4,
    textAlign: 'center',
  },
  text: {
    padding: 10,
    fontSize: 18,
    color: '#000',
    paddingVertical: 4,
    textAlign: 'center',
  },
  chooseAppLanguage: {
    backgroundColor: '#00ADEF',
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
  },
  chooseLanguage: {
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '700',
    fontSize: 16,
    color: '#000',
  },
});

export default Aboutus;

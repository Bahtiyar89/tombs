import React from 'react';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

export default function YandexMap() {
  const {t, i18n} = useTranslation();
  return (
    <View
      style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontWeight: 'bold', fontSize: 18}}>
        {t('t:in_development')}
      </Text>
    </View>
  );
}

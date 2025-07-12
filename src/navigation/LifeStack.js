import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useTranslation} from 'react-i18next';
import LifeScreen from '../screens/LifeScreen';

const LifeStack = createStackNavigator();

const LifeStackScreen = () => {
  const {t, i18n} = useTranslation();
  return (
    <LifeStack.Navigator screenOptions={({route}) => ({headerShown: true})}>
      <LifeStack.Screen
        name="LifeScreen"
        options={{
          title: t('t:life'),
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={LifeScreen}
      />
    </LifeStack.Navigator>
  );
};

export default LifeStackScreen;

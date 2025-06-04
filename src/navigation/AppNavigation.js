import {StatusBar, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import GooglemapsScreen from '../screens/GooglemapsScreen';
import YandexMap from '../screens/YandexMap';
import TabBarIcon from './TabBarIcon';
import {CardsIcon, SalesIcon} from '../svgs/NavigationMenuSvgs';
import LifeStack from './LifeStack';
import Aboutus from '../screens/Aboutus';
import '../constants/DCSLocalize';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <StatusBar
        hidden={false}
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <Tab.Navigator
        initialRouteName="Life"
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {height: 58, paddingTop: 10},
          // tabBarStyle: (() => {
          //   const routeName = getFocusedRouteNameFromRoute(route) ?? '';
          //   console.log(routeName);
          //   if (routeName === 'AddCardScreen') {
          //     return {
          //       display: 'none',
          //       height: 0
          //     };
          //   }
          //   return { height: 88 };
          // })(route),
        })}
        // backBehavior={'order'}
      >
        <Tab.Screen
          name="Life"
          component={LifeStack}
          options={({route}) => ({
            tabBarIcon: ({focused}) => (
              <TabBarIcon focused={focused} text={'Hayatı'} Icon={CardsIcon} />
            ),
          })}
        />
        <Tab.Screen
          name="google"
          component={GooglemapsScreen}
          options={({route}) => ({
            tabBarIcon: ({focused}) => (
              <TabBarIcon focused={focused} text={'Google'} Icon={CardsIcon} />
            ),
          })}
        />
        <Tab.Screen
          name="yandex"
          component={YandexMap}
          options={({route}) => ({
            tabBarIcon: ({focused}) => (
              <TabBarIcon focused={focused} text={'Yandex'} Icon={CardsIcon} />
            ),
          })}
        />
        <Tab.Screen
          name="Aboutus"
          component={Aboutus}
          options={{
            tabBarIcon: ({focused}) => (
              <TabBarIcon
                focused={focused}
                text={'Biz hakda'}
                Icon={SalesIcon}
              />
            ),
          }}
        />
      </Tab.Navigator>

      {/*  <Stack.Navigator
        initialRouteName={'WelcomePage'}
        // initialRouteName={'Menu'}
        screenOptions={({route}) => ({
          tabBarShowLabel: false,
        })}>
        
        <Stack.Screen
          name="LoginScreen"
          component={YandexMap}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>*/}
    </NavigationContainer>
  );
};

export default AppNavigation;

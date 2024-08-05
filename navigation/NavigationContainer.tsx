import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import MyCabScreen from '../screens/MyCabScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const NavigationContainerComponent: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" color={color} size={size} />
            ),
            title: 'Home',
          }}
        />
        <Tab.Screen
          name="My Cab"
          component={MyCabScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="local-taxi" color={color} size={size} />
            ),
            title: 'My Cab',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationContainerComponent;

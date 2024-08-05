import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CabsListScreen from '../screens/CabListScreen';
import CabDetailScreen from '../screens/CabDetailScreen';

const Stack = createStackNavigator();

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Cabs List" component={CabsListScreen} />
      <Stack.Screen name="CabDetail" component={CabDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;

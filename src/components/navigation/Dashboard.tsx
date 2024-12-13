import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Dashboard} from 'src/components/screens/dashboard/Dashboard';
import {ItemDetail} from 'src/components/screens/list/ItemDetail';
import {DETAILS, HOME} from 'shared';

const Stack = createStackNavigator();

export const DashboardTab = () => {
  const homeTab = HOME + ' Tab';
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={homeTab}
        component={Dashboard}
        options={{headerShown: false}}
      />
      <Stack.Screen name={DETAILS} component={ItemDetail} />
    </Stack.Navigator>
  );
};

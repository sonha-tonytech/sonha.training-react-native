import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ItemDetail} from '../screens/list/ItemDetail';
import {DETAILS, LIST} from 'shared';
import {List} from 'src/components/screens/list/List';

const Stack = createStackNavigator();

export const ListTab = () => {
  const listTab = LIST + ' Tab';
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={listTab}
        component={List}
        options={{headerShown: false}}
      />
      <Stack.Screen name={DETAILS} component={ItemDetail} />
    </Stack.Navigator>
  );
};

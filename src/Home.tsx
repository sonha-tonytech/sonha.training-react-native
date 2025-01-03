import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Login} from './components/screens/login/Login';
import Icon from 'react-native-vector-icons/Ionicons';
import {Profile} from './components/screens/profile/Profile';
import {getData, HOME, LIST, PROFILE, USER_KEY, USER_TOKEN} from '../shared';
import {LOGIN, TOKEN, USER} from '../sclice/crudSclice';
import {DashboardTab} from './components/navigation/Dashboard';
import {ListTab} from './components/navigation/List';

const renderTabBarIcon = (
  route: RouteProp<ParamListBase, string>,
  focused: boolean,
  color: string,
  size: number,
) => {
  let iconName = '';
  if (route.name === HOME) {
    iconName = focused ? 'home' : 'home-outline';
  }
  if (route.name === LIST) {
    iconName = focused ? 'list' : 'list-outline';
  }
  if (route.name === PROFILE) {
    iconName = focused ? 'person-circle' : 'person-circle-outline';
  }

  return <Icon name={iconName} color={color} size={size} />;
};

export const Home = () => {
  const dispatch = useDispatch();
  const Tab = createBottomTabNavigator();
  const isLogin = useSelector(state => (state as any).quotes.isLogin);

  useEffect(() => {
    if (!isLogin) {
      getData(USER_TOKEN).then(value => {
        if (value) {
          const token = JSON.parse(value);
          dispatch(TOKEN(token));

          getData(USER_KEY).then(user => {
            if (user) {
              const userLogin = JSON.parse(user);
              dispatch(USER(userLogin));
              dispatch(LOGIN(true));
            }
          });
        } else {
          dispatch(USER(null));
          dispatch(LOGIN(false));
        }
      });
    }
  }, [dispatch, isLogin]);

  return (
    <SafeAreaProvider>
      {isLogin ? (
        <SafeAreaProvider>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName={HOME}
              screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) =>
                  renderTabBarIcon(route, focused, color, size),
              })}>
              <Tab.Screen name={HOME} component={DashboardTab} />
              <Tab.Screen name={LIST} component={ListTab} />
              <Tab.Screen name={PROFILE} component={Profile} />
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      ) : (
        <Login />
      )}
    </SafeAreaProvider>
  );
};

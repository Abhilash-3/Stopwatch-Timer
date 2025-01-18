import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TimerScreen from '../../screens/TimerScreen';
import StopwatchScreen from '../../screens/StopwatchScreen';
import { Text, Pressable, StyleSheet } from 'react-native';
import { color, size, font } from '../common/typography';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Stopwatch"
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarButton: (props) => (
          <Pressable 
            {...props} 
            android_ripple={{ color: 'transparent' }}
            style={props.style}
          />
        ),
      }}
    >
        <Tab.Screen 
          name="Stopwatch" 
          component={StopwatchScreen}
          options={{
            tabBarIcon: () => null,
            tabBarLabel: ({ focused }) => (
              <Text style={[
                styles.tabText,
                focused && styles.tabTextActive
              ]}>
                Stopwatch
              </Text>
            ),
          }}
        />
        <Tab.Screen 
          name="Timer" 
          component={TimerScreen}
          options={{
            tabBarIcon: () => null,
            tabBarLabel: ({ focused }) => (
              <Text style={[
                styles.tabText,
                focused && styles.tabTextActive
              ]}>
                Timer
              </Text>
            ),
          }}
        />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    height: '9%',
    backgroundColor: '#fff',
    elevation: 0,
    borderTopWidth: 0,
  },
  tabText: {
    fontSize: size.large,
    fontFamily: font.bold,
    color: '#666',
    paddingBottom: '2%',
    marginBottom: '-2%'
  },
  tabTextActive: {
    color: color.black,
    borderBottomWidth: 3,
    borderBottomColor: color.black,
  }
});

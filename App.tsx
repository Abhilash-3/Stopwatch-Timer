import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/components/navigation/AppNavigator';

function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default App;

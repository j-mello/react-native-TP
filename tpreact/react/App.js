import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import ReadyComponent from './components/ReadyComponent';

export default function App() {
  return (
    <NavigationContainer>
      <ReadyComponent />
    </NavigationContainer>
  );
}

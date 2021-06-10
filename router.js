import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';
import Splash from './App/Screens/SplashScreen';
import SignUp from './App/Screens/SignUpScreen';
import Login from './App/Screens/LoginScreen';
import DashboardScreen from './App/Screens/DashboardScreen';
import ChatScreen from './App/Screens/ChatScreen';




const AuthStack = createStackNavigator({
    Splash:Splash,
    Login: Login,
    SignUp: SignUp,
}, {
    headerMode: 'none', initialRouteName: 'Login'
});

const DashStack = createStackNavigator({
    DashboardScreen: DashboardScreen,
    ChatScreen: ChatScreen,
 
}, {
    headerMode: 'none', initialRouteName: 'DashboardScreen'
});
const App = createSwitchNavigator({
    Auth: AuthStack,
    Dashboard: DashStack
}, {
    initialRouteName: 'Auth'
});

export default createAppContainer(App);
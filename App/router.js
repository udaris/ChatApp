import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import Signup from './Screens/SignUpScreen';
import Login from './Screens/LoginScreen';
import Dashboard from './Screens/DashboardScreen';
import Home from './Screens/Home';
import Chat from './Screens/ChatScreen';

const AuthStack=createStackNavigator({
    Dashboard:Dashboard,
    Login:Login,
    Signup:Signup,
},{ navigationOptions:{header:null},
    headerMode:'none', initialRouteName:'Dashboard'
});

const HomeStack=createStackNavigator({
    Home:Home,
    Chat:Chat
},{navigationOptions:{header:null},
    headerMode:'none',  initialRouteName:"Home"
});

const App=createStackNavigator({
    Auth:AuthStack,
    Home:HomeStack
},{initialRouteName:"Auth", });

export default createAppContainer(App);
 
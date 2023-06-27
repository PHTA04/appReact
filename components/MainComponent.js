import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './MenuComponent';
import Dishdetail from './DishdetailComponent';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import Home from './HomeComponent';
import { Icon, Image } from 'react-native-elements';
import { View, Text, Linking } from 'react-native';
import { baseUrl } from '../shared/baseUrl';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './LoginComponent';
import Register from './RegisterComponent';
import { connect } from 'react-redux';
import { fetchLeaders, fetchDishes, fetchComments, fetchPromos, logoutUser, fetchDoctors, fetchServices  } from '../redux/ActionCreators';
import Doctor from './DoctorComponent';
import Service from './ServiceComponent';
import Doctordetail from './DoctordetailComponent';

function DoctorNavigatorScreen() {
  const MenuNavigator = createStackNavigator();
  
  return (
    <MenuNavigator.Navigator
    screenOptions={{ headerStyle: { backgroundColor: '#transparent',elevation: 0},
    headerTintColor: 'grey',
    headerTitleAlign: 'center',
    title: 'BÁC SĨ TIÊU BIỂU',
    headerTitleStyle: { color: 'grey' }}}
      initialRouteName='Doctor'>
      <MenuNavigator.Screen name='Doctor' component={Doctor}/>
      <MenuNavigator.Screen name='Docdetail' component={Doctordetail} />
    </MenuNavigator.Navigator>
  );
}

function TabNavigatorHome() {
  const TabNavigator = createBottomTabNavigator();
  return (
    <TabNavigator.Navigator initialRouteName='Home'>
      <TabNavigator.Screen name='DoctorTab' component={DoctorNavigatorScreen}
        options={{
          tabBarActiveTintColor: '#00d9a5',
          tabBarInactiveTintColor: '#ccc',
          title:'Bác sĩ',
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (<Icon name='user' type='font-awesome' size={size} color={focused ? '#00d9a5' : '#ccc'} />)
        }} />
      <TabNavigator.Screen name='Home' component={Home}
        options={{
          tabBarActiveTintColor: '#00d9a5',
          tabBarInactiveTintColor: '#ccc',
          title:'Trang chủ',
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (<Icon name='home' type='font-awesome' size={size} color={focused ? '#00d9a5' : '#ccc'} />)
        }} />
      <TabNavigator.Screen name='Service' component={Service}
        options={{
          tabBarActiveTintColor: '#00d9a5',
          tabBarInactiveTintColor: '#ccc',
          title:'Dịch vụ',
          headerShown: false,
          tabBarIcon: ({ focused, size }) => (<Icon name='bars' type='font-awesome' size={size} color={focused ? '#00d9a5' : '#ccc'} />)
        }} />
    </TabNavigator.Navigator>
  );
}

function TabNavigatorScreen() {
  const TabNavigator = createBottomTabNavigator();
  return (
    <TabNavigator.Navigator initialRouteName='Login'>
      <TabNavigator.Screen name='Login' component={Login}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<Icon name='sign-in' type='font-awesome' size={size} color={color} />)
        }} />
      <TabNavigator.Screen name='Register' component={Register}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (<Icon name='user-plus' type='font-awesome' size={size} color={color} />)
        }} />
    </TabNavigator.Navigator>
  );
}

function LoginNavigatorScreen() {
  const LoginNavigator = createStackNavigator();
  return (
    <LoginNavigator.Navigator initialRouteName='Login'
      screenOptions={{
        headerStyle: { backgroundColor: '#transparent', elevation: 0 },
        headerTintColor: 'grey',
        headerTitleAlign: 'center',
        headerTitleStyle: { color: 'grey' }
      }}>
      <LoginNavigator.Screen name='LoginRegister' component={TabNavigatorScreen}
        options={({ navigation }) => ({
          headerTitle: 'Đăng nhập',
          headerLeft: () => (<Icon name='menu' style={{ marginLeft: 20 }} size={25} color='#696868' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </LoginNavigator.Navigator>
  );
}

function FavoritesNavigatorScreen() {
  const FavoritesNavigator = createStackNavigator();
  return (
    <FavoritesNavigator.Navigator initialRouteName='Favorites'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
      <FavoritesNavigator.Screen name='Favorites' component={Favorites}
        options={({ navigation }) => ({
          headerTitle: 'My Favorites',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <FavoritesNavigator.Screen name='Dishdetail' component={Dishdetail}
        options={{ headerTitle: 'Dish Detail' }} />
    </FavoritesNavigator.Navigator>
  );
}

function ReservationNavigatorScreen() {
  const ReservationNavigator = createStackNavigator();
  return (
    <ReservationNavigator.Navigator initialRouteName='Reservation'
      screenOptions={{
        headerStyle: { backgroundColor: '#transparent', elevation: 0 },
        headerTintColor: 'grey',
        headerTitleAlign: 'center',
        headerTitleStyle: { color: 'grey' }
      }}>
      <ReservationNavigator.Screen name='Reservation' component={Reservation}
        options={({ navigation }) => ({
          headerTitle: 'Đặt lịch khám bệnh',
          headerLeft: () => (<Icon name='menu' style={{ marginLeft: 20 }} size={25} color='#696868' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </ReservationNavigator.Navigator>
  );
}

// redux
const mapStateToProps = (state) => {
  return {
    users: state.users
  }
};
const mapDispatchToProps = (dispatch) => ({
  // fetchLeaders: () => dispatch(fetchLeaders()),
  // fetchDishes: () => dispatch(fetchDishes()),
  // fetchComments: () => dispatch(fetchComments()),
  // fetchPromos: () => dispatch(fetchPromos()),

  logoutUser: () => dispatch(logoutUser()),
  fetchServices: () => dispatch(fetchServices()),
  fetchDoctors:()=>dispatch(fetchDoctors()),
});

function HomeNavigatorScreen() {
  const HomeNavigator = createStackNavigator();
  return (
    <HomeNavigator.Navigator
      initialRouteName='HomeTab'
      screenOptions={{
        headerStyle: { backgroundColor: 'transparent' ,elevation: 0},
        headerTintColor: '#696868',
        headerTitleStyle: { color: '#696868' }
      }}>
      <HomeNavigator.Screen name='HomeTab' component={TabNavigatorHome} options={({ navigation }) => ({
          headerTitle: '',
          headerLeft: () => (<Icon name='menu' style={{ marginLeft: 20 }} size={25} color='#696868' onPress={() => navigation.toggleDrawer()} />)
        })}/>
    </HomeNavigator.Navigator>
  );
}

function MenuNavigatorScreen() {
  const MenuNavigator = createStackNavigator();
  return (
    <MenuNavigator.Navigator
      initialRouteName='Menu'
      screenOptions={{
        headerStyle: { backgroundColor: '#7cc' },
        headerTintColor: '#fff',
        headerTitleStyle: { color: '#fff' }
      }}>
       <MenuNavigator.Screen name='Menu' component={Menu}
        options={({ navigation }) => ({
          headerTitle: 'Menu',
          headerLeft: () => (<Icon name='menu' size={36} color='#fff' onPress={() => navigation.toggleDrawer()} />)
        })} />
      <MenuNavigator.Screen name='Dishdetail' component={Dishdetail} options={{ headerTitle: 'Dish Detail' }} />
    </MenuNavigator.Navigator>
  );
}

function MainNavigatorScreen(props) {
  const users = props.users;
  const logoutUser = props.logoutUser;
  const MainNavigator = createDrawerNavigator();
  return (
    <MainNavigator.Navigator initialRouteName='ReservationScreen' drawerContent={(props) => <CustomDrawerContent {...props} users={users} logoutUser={logoutUser} />}>
      <MainNavigator.Screen name='HomeScreen' component={HomeNavigatorScreen}
        options={{
          drawerActiveTintColor:'#00d9a5',
          drawerInactiveTintColor:'grey',
          title: 'Trang chủ', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='home' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='AboutScreen' component={AboutNavigatorScreen}
        options={{
          title: 'About Us', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='info' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='MenuScreen' component={MenuNavigatorScreen}
        options={{
          title: 'Menu', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='menu' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      <MainNavigator.Screen name='ContactScreen' component={ContactNavigatorScreen}
        options={{
          title: 'Contact Us', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='contacts' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
        <MainNavigator.Screen name='FavoritesScreen' component={FavoritesNavigatorScreen}
        options={{
          title: 'My Favorites', headerShown: false,
          drawerIcon: ({ focused, size }) => (<Icon name='heart' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />)
        }} />
      {
        users.logged === false
          ? (<MainNavigator.Screen name='LoginScreen' component={LoginNavigatorScreen} options={{ title: 'Đăng nhập', headerShown: false, drawerIcon: ({ focused, size }) => (<Icon name='sign-in' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />) }} />)
          : null
      }
      {
        users.logged === true
          ? (<MainNavigator.Screen name='ReservationScreen' component={ReservationNavigatorScreen} options={{ title: 'Đặt lịch khám', headerShown: false, drawerIcon: ({ focused, size }) => (<Icon name='calendar' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />) }} />)
          : null
      }
    </MainNavigator.Navigator>
  );
}

import Contact from './ContactComponent';
function ContactNavigatorScreen() {
  const ContactNavigator = createStackNavigator();
  return (
    <ContactNavigator.Navigator initialRouteName='Contact'
      screenOptions={{
        headerStyle: { backgroundColor: '#transparent', elevation: 0 },
        headerTintColor: 'grey',
        headerTitleAlign: 'center',
        headerTitleStyle: { color: 'grey' }
      }}>
      <ContactNavigator.Screen name='Contact' component={Contact}
        options={({ navigation }) => ({
          headerTitle: 'Liên hệ',
          headerLeft: () => (<Icon name='menu' style={{ marginLeft: 20 }} size={25} color='#696868' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </ContactNavigator.Navigator>
  );
}

import About from './AboutComponent';
function AboutNavigatorScreen() {
  const AboutNavigator = createStackNavigator();
  return (
    <AboutNavigator.Navigator initialRouteName='About'
      screenOptions={{
        headerStyle: { backgroundColor: '#transparent', elevation: 0 },
        headerTintColor: 'grey',
        headerTitleAlign: 'center',
        headerTitleStyle: { color: 'grey' }
      }}>
      <AboutNavigator.Screen name='About' component={About}
        options={({ navigation }) => ({
          headerTitle: 'About',
          headerLeft: () => (<Icon name='menu' style={{ marginLeft: 20 }} size={25} color='#696868' onPress={() => navigation.toggleDrawer()} />)
        })} />
    </AboutNavigator.Navigator>
  );
}

function CustomDrawerContent(props) {
  const users = props.users;
  const logoutUser = props.logoutUser;
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ backgroundColor: '#7cc', height: 80, alignItems: 'center', flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Image source={{ uri: baseUrl + 'images/logo.png' }} style={{ margin: 10, width: 80, height: 60 }} />
        </View>
        <View style={{ flex: 2 }}>
          <Text style={{ color: '#fff', fontSize: 22, fontWeight: 'bold' }}>Phạm Hoàng Tuấn Anh</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
      {
        users.logged === false
          ? (<DrawerItem label='Trợ giúp' icon={({ focused, size }) => <Icon name='help' size={size} color={focused ? '#7cc' : '#ccc'} />} onPress={() => Linking.openURL('https://reactnavigation.org/docs/getting-started')} />)
          : (<DrawerItem label={'[' + users.userinfo.username + '] Đăng xuất'} icon={({ focused, size }) => <Icon name='sign-out' type='font-awesome' size={size} color={focused ? '#7cc' : '#ccc'} />} onPress={() => { logoutUser(); props.navigation.navigate('HomeScreen'); }} />)
      }
    </DrawerContentScrollView>
  );
}

class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <MainNavigatorScreen users={this.props.users} logoutUser={this.props.logoutUser} />
      </NavigationContainer>
    );
  }
  
  componentDidMount() {
    // redux

    // this.props.fetchLeaders();
    // this.props.fetchDishes();
    // this.props.fetchComments();
    // this.props.fetchPromos();

    this.props.fetchDoctors();
    this.props.fetchServices();
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
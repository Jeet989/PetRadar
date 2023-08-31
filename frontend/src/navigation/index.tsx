import React, { useEffect } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Onboarding from '../screens/onboarding/Onboarding';
import Signup from '../screens/auth/signup/Signup';
import Login from '../screens/auth/login/Login';
import petProfile from '../screens/petProfile/petProfile';
import UserProfile from '../screens/userProfile';
import Feed from '../screens/feed';
import CreatePost from '../screens/createPost/Cpost';
import Profile from '../screens/profile';
import Colors from '../utils/Colors/Colors';
import Background from '../components/Background';
import PetMedicalHistory from '../screens/addMedicalHistory';
import AddMedicalHistory from '../screens/addMedicalHistory';
import Notification from '../screens/notification/Notification';
import PetDetails from '../screens/petDetails/PetDetails';
import { navigationRef } from '../utils/customNav/customNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EditPost from '../screens/editPost/Epost';
import MyPosts from '../screens/myPosts';
import RNBootSplash from "react-native-bootsplash";



import { store } from '../redux/store';
import PersonalDetails from '../screens/personalDetails';
import UpdatePetProfile from '../screens/updatePetProfile/updatePetProfile';
import ShowMedicalHistory from '../screens/showMedicalHistory';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarStyle: { borderTopWidth: 0 },
      tabBarBackground: () => <Background startColor='rgba(194, 234, 232, 1)' endColor='#FFFFFF' />
    }}>
      <Tab.Screen name='feed' component={Feed} options={{
        tabBarIcon: ({ focused }: { focused: boolean }) => <Entypo name='home' size={30} color={focused ? Colors.primary : Colors.lightGrey} />
      }} />
      <Tab.Screen name='createPost' component={CreatePost} options={{
        tabBarIcon: ({ focused }: { focused: boolean }) => <MaterialCommunityIcons name='camera-plus' size={30} color={focused ? Colors.primary : Colors.lightGrey} />
      }} />
      <Tab.Screen name='profile' component={Profile} options={{
        tabBarIcon: ({ focused }: { focused: boolean }) => <FontAwesome5 name='user-circle' size={30} color={focused ? Colors.primary : Colors.lightGrey} />
      }} />
    </Tab.Navigator>
  )
}


const RootNavigation: React.FC = () => {

  useEffect(() => {
    if (navigationRef?.isReady()) {
      RNBootSplash.hide({ fade: true });
      if (store.getState().auth.token) {
        navigationRef.navigate('home')
      }
    }
  }, [])

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name='onboarding' component={Onboarding} />
        <Stack.Screen name='signup' component={Signup} />
        <Stack.Screen name='login' component={Login} />
        <Stack.Screen name='addUserProfile' component={UserProfile} />
        <Stack.Screen name="petProfile" component={petProfile} />
        <Stack.Screen name='home' component={TabNavigation} />
        <Stack.Screen name='notification' component={Notification} />
        <Stack.Screen name='petDetails' component={PetDetails} />
        <Stack.Screen name='personalDetails' component={PersonalDetails} />
        <Stack.Screen name='updatePetProfile' component={UpdatePetProfile} />
        <Stack.Screen name='addMedlHis' component={AddMedicalHistory} />
        <Stack.Screen name='showMedHis' component={ShowMedicalHistory} />
        <Stack.Screen name='create' component={CreatePost} />
        <Stack.Screen name='edit' component={EditPost} />
        <Stack.Screen name='myPosts' component={MyPosts} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default RootNavigation;

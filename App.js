import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthProvider, AuthContext } from './AuthContext';
import LoginScreen from './screens/LoginScreeen';
import AdminDashboard from './screens/AdminDashboard';
import AdminStudents from './screens/AdminStudents';
import AdminHODs from './screens/AdminHODs';
import AdminCompanies from './screens/AdminCompanies';
import AdminOpenings from './screens/AdminOpenings';
import AdminSelectedStudents from './screens/AdminSelectedStudents';
import AdminCollegeInfo from './screens/AdminCollegeInfo';
import HODHome from './screens/HODHome';
import HODStudents from './screens/HODStudents';
import HODPlacementDrive from './screens/HODPlacementDrive';
import StudentHome from './screens/StudentHome';
import StudentUploadInfo from './screens/StudentUploadInfo ';
import StudentOpenings from './screens/StudentOpenings ';
import StudentAppliedJobs from './screens/StudentAppliedJobs ';
import CompanyHome from './screens/CompanyHome';
import CompanyJobs from './screens/CompanyJobs';
import CompanyApplications from './screens/CompanyApplications';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const AdminStack = () => (
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Dashboard" component={AdminDashboard} />
    <Stack.Screen name="Students" component={AdminStudents} />
    <Stack.Screen name="HODs" component={AdminHODs} />
    <Stack.Screen name="Companies" component={AdminCompanies} />
    <Stack.Screen name="SelectedStudents" component={AdminSelectedStudents} />
  </Stack.Navigator>
);

const AdminTabs = () => (
  <Tab.Navigator
    initialRouteName="Dashboard"
    activeColor="black"
    shifting={true}
    barStyle={{ backgroundColor: '#fff' }}
  >
    <Tab.Screen
      name="Dashboard"
      component={AdminStack}
      options={{
        tabBarLabel: 'Dashboard',
        tabBarIcon: ({ color }) => (
          <Ionicons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Students"
      component={AdminStudents}
      options={{
        tabBarLabel: 'Students',
        tabBarIcon: ({ color }) => (
          <Ionicons name="people" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="HODs"
      component={AdminHODs}
      options={{
        tabBarLabel: "HOD's",
        tabBarIcon: ({ color }) => (
          <Ionicons name="school" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Companies"
      component={AdminCompanies}
      options={{
        tabBarLabel: 'Companies',
        tabBarIcon: ({ color }) => (
          <Ionicons name="business" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Openings"
      component={AdminOpenings}
      options={{
        tabBarLabel: 'Openings',
        tabBarIcon: ({ color }) => (
          <Ionicons name="briefcase" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Selected Students"
      component={AdminSelectedStudents}
      options={{
        tabBarLabel: 'Selected Students',
        tabBarIcon: ({ color }) => (
          <Ionicons name="checkmark-done" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="College Info"
      component={AdminCollegeInfo}
      options={{
        tabBarLabel: 'College Info',
        tabBarIcon: ({ color }) => (
          <Ionicons name="information-circle" color={color} size={26} />
        ),
      }}
    />
    {/* <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <Ionicons name="person" color={color} size={26} />
        ),
      }}
    /> */}
  </Tab.Navigator>
);

const HODTabs = () => (
  <Tab.Navigator
    initialRouteName="HODHome"
    activeColor="black"
    shifting={true}
    barStyle={{ backgroundColor: '#fff' }}
  >
    <Tab.Screen
      name="HODHome"
      component={HODHome}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <Ionicons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="HODStudents"
      component={HODStudents}
      options={{
        tabBarLabel: 'Students',
        tabBarIcon: ({ color }) => (
          <Ionicons name="people" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="HODPlacementDrive"
      component={HODPlacementDrive}
      options={{
        tabBarLabel: 'Placement Drive',
        tabBarIcon: ({ color }) => (
          <Ionicons name="briefcase" color={color} size={26} />
        ),
      }}
    />
    {/* <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <Ionicons name="person" color={color} size={26} />
        ),
      }}
    /> */}
  </Tab.Navigator>
);

const StudentTabs = () => (
  <Tab.Navigator
    initialRouteName="StudentHome"
    activeColor="black"
    shifting={true}
    barStyle={{ backgroundColor: '#fff' }}
  >
    <Tab.Screen
      name="StudentHome"
      component={StudentHome}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <Ionicons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="StudentUploadInfo"
      component={StudentUploadInfo}
      options={{
        tabBarLabel: 'Upload Info',
        tabBarIcon: ({ color }) => (
          <Ionicons name="cloud-upload" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="StudentOpenings"
      component={StudentOpenings}
      options={{
        tabBarLabel: 'Openings',
        tabBarIcon: ({ color }) => (
          <Ionicons name="briefcase" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="StudentAppliedJobs"
      component={StudentAppliedJobs}
      options={{
        tabBarLabel: 'Applied Jobs',
        tabBarIcon: ({ color }) => (
          <Ionicons name="document-text" color={color} size={26} />
        ),
      }}
    />
    {/* <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <Ionicons name="person" color={color} size={26} />
        ),
      }}
    /> */}
  </Tab.Navigator>
);

const CompanyTabs = () => (
  <Tab.Navigator
    initialRouteName="CompanyHome"
    activeColor="black"
    shifting={true}
    barStyle={{ backgroundColor: '#fff' }}
  >
    <Tab.Screen
      name="CompanyHome"
      component={CompanyHome}
      options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <Ionicons name="home" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="CompanyJobs"
      component={CompanyJobs}
      options={{
        tabBarLabel: 'Jobs',
        tabBarIcon: ({ color }) => (
          <Ionicons name="briefcase" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="CompanyApplications"
      component={CompanyApplications}
      options={{
        tabBarLabel: 'Applications',
        tabBarIcon: ({ color }) => (
          <Ionicons name="document-text" color={color} size={26} />
        ),
      }}
    />
    {/* <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: 'Profile',
        tabBarIcon: ({ color }) => (
          <Ionicons name="person" color={color} size={26} />
        ),
      }}
    /> */}
  </Tab.Navigator>
);

const App = () => {
  return (
    <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <AuthContext.Consumer>
            {({ userRole }) =>
              userRole ? (
                userRole === 'admin' ? (
                  <AdminTabs />
                ) : userRole === 'hod' ? (
                  <HODTabs />
                ) : userRole === 'student' ? (
                  <StudentTabs />
                ) : userRole === 'company' ? (
                  <CompanyTabs />
                ) : (
                  <Tab.Navigator>
                    <Tab.Screen name="Login" component={LoginScreen} />
                  </Tab.Navigator>
                )
              ) : (
                <LoginScreen />
              )
            }
          </AuthContext.Consumer>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
};

export default App;

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CourseListScreen from "./screens/CourseListScreen";
import ClassListScreen from "./screens/ClassListScreen";
import { RootStackParamList } from "./type";
import { CartProvider } from "./context/CartContext";
import CartScreen from "./screens/CartScreen";
import MyBookingsScreen from "./screens/MyBookingsScreen";
import { Ionicons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function CourseStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CourseList"
        component={CourseListScreen}
        options={{ title: "Yoga Courses" }}
      />
      <Stack.Screen
        name="ClassList"
        component={ClassListScreen}
        options={{ title: "Available Classes" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Courses') {
                iconName = focused ? 'list-circle' : 'list-circle-outline';
              } else if (route.name === 'Cart') {
                iconName = focused ? 'cart' : 'cart-outline';
              } else if (route.name === 'MyBookings') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              }

              return <Ionicons name={iconName as any} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6366f1',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen 
            name="Courses" 
            component={CourseStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="Cart" 
            component={CartScreen}
            options={{ title: "Shopping Cart" }}
          />
          <Tab.Screen 
            name="MyBookings" 
            component={MyBookingsScreen}
            options={{ title: "My Bookings" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
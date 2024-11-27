import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { api } from "../api/client";
import { useCart } from "../context/CartContext";
import { Course } from "../type";

export default function CartScreen({ navigation }: any) {
  const { items, removeFromCart, total, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const data = await api.getAllCourses();
      setCourses(data);
      setError(null);
    } catch (error) {
      console.log('error: ', error);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const handleCheckout = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    try {
      for (const item of items) {
        for (const course of courses) {
          if (item.courseId === course.id) {
            await api.createBooking(
              email,
              item.classId,
              item.courseId,
              item.className,
              course.courseName
            );
          }
        }
      }
      clearCart();
      Alert.alert("Success", "Your classes have been booked!", [
        {
          text: "View My Bookings",
          onPress: () => navigation.navigate("MyBookings"),
        },
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to complete booking. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.classId}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Text style={styles.className}>{item.className}</Text>
            <Text>Date: {item.date}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity
              onPress={() => removeFromCart(item.classId)}
              style={styles.removeButton}
            >
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={
          items.length > 0 ? (
            <View style={styles.checkoutSection}>
              <Text style={styles.total}>Total: ${total}</Text>
              <TextInput
                style={styles.emailInput}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.checkoutButton}
                onPress={handleCheckout}
              >
                <Text style={styles.checkoutButtonText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.emptyCart}>Your cart is empty</Text>
          )
        }
      />
    </View>
  );
}
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    padding: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  cartItem: {
    backgroundColor: "white",
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  className: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  price: {
    fontSize: 16,
    color: "#2e7d32",
    fontWeight: "bold",
    marginVertical: 5,
  },
  removeButton: {
    backgroundColor: "#ff1744",
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
    alignSelf: "flex-start",
  },
  removeButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  checkoutSection: {
    padding: 15,
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  emailInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    borderRadius: 4,
    marginBottom: 15,
    fontSize: 16,
  },
  checkoutButton: {
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 4,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyCart: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "#666",
    fontStyle: "italic",
  },
});

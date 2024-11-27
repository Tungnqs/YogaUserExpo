import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Class, Course } from "../type";
import { useCart } from "../context/CartContext";

type Props = {
  class: Class;
  course: Course;
};

export default function ClassCard({ class: classItem, course }: Props) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      classId: classItem.classId,
      courseId: classItem.courseId,
      className: classItem.className,
      date: classItem.date,
      price: course.price,
    });
    Alert.alert("Success", "Class added to cart!");
  };
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{classItem.className}</Text>
      <Text style={styles.details}>
        <Text style={styles.textBold}>Date:</Text> {classItem.date}
      </Text>
      <Text style={styles.details}>
        <Text style={styles.textBold}>Teacher: </Text>
        {classItem.teacher}
      </Text>
      {classItem.comments && (
        <Text style={styles.comments}>
          <Text style={styles.textBold}>Comment: </Text>
          {classItem.comments}
        </Text>
      )}
      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: "#666",
    marginBottom: 3,
  },
  spots: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1976d2",
    marginTop: 5,
  },
  comments: {
    fontSize: 14,
    color: "#444",
    marginTop: 5,
    fontStyle: "italic",
  },
  textBold: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black",
  },
  addButton: {
    backgroundColor: "#1976d2",
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

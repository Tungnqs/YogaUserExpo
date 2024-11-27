import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Course } from '../type';

type Props = {
  course: Course;
  onPress: () => void;
};

export default function CourseCard({ course, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.title}>{course.courseName}</Text>
        <Text style={styles.details}>
          <Text style={styles.textBold}>{course.dayOfWeek}</Text> at {course.time}
        </Text>
        <Text style={styles.details}>
          <Text style={styles.textBold}>Duration:</Text> {course.duration} minutes
        </Text>
        <Text style={styles.details}><Text style={styles.textBold}>Capacity:</Text> {course.capacity} members</Text>
        <Text style={styles.details}><Text style={styles.textBold}>Yoga type: </Text><Text style={{textTransform : "uppercase", color: "red", fontWeight: "bold"}}>{course.type}</Text></Text>
        <Text style={styles.price}>
          <Text style={{color: "black"}}>Price:</Text> ${course.price}
        </Text>
        <Text style={styles.description}>
          <Text style={styles.textBold}>Description:</Text> {course.description ? course.description : <Text style={{color: "#b30000"}}>There is no description for this course</Text>} 
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
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
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    color: 'black',
    marginBottom: 3,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
  },
  textBold: {
    fontWeight: "bold",
    fontSize: 15,
    color: "black"
  }
});
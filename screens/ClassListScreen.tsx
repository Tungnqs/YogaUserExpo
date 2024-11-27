import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import ClassCard from "../components/ClassCard";
import { Class, Course, RootStackParamList } from "../type";
import { api } from "../api/client";

type Props = {
  route: RouteProp<RootStackParamList, "ClassList">;
};

export default function ClassListScreen({ route }: Props) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { courseId } = route.params;

  useEffect(() => {
    fetchClasses();
    getCurrentCourse();
  }, [courseId]);

  const fetchClasses = async () => {
    try {
      const data = await api.getClassesByCourse(courseId);
      setClasses(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching classes:", error);
      setError("Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentCourse = async () => {
    try {
      const data = await api.getCourseById(courseId);
      setCurrentCourse(data);
      setError(null);
    } catch (error) {
      console.error("Error fetching current course:", error);
      setError("Failed to load classes");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <View style={styles.container}>
      <FlatList
        data={classes}
        keyExtractor={(item) => item.classId}
        renderItem={({ item }) => (
          <ClassCard
            class={item}
            course={currentCourse as Course}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
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
});

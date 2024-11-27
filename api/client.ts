import axios from 'axios';
import { Course, Class } from '../type';
import { Alert } from 'react-native';

//change this to be your network ipv4 address - Tungnqs
const ipv4Address = "192.168.1.45"

export const API_URL = `http://${ipv4Address}:3000`;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: false
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error);
    console.error("Check for the ipv4Address variable in client.ts to make sure it is the same with your ipv4 address 😥");
    Alert.alert("Check for the ipv4Address variable in client.ts to make sure it is the same with your ipv4 address 😥");
    if (error.response) {
      console.error('Data:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      console.error('Request error:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const api = {
  getAllCourses: async () => {
    try {
      const response = await apiClient.get<Course[]>('/courses');
      return response.data;
    } catch (error) {
      console.error('getAllCourses error:', error);
      throw error;
    }
  },

  getClassesByCourse: async (courseId: string) => {
    try {
      const response = await apiClient.get<Class[]>(`/courses/${courseId}/classes`);
      return response.data;
    } catch (error) {
      console.error('getClassesByCourse error:', error);
      throw error;
    }
  },

  createBooking: async (email: string, classId: string, courseId: string, className: string, courseName: string) => {
    try {
      const response = await apiClient.post('/bookings', { email, classId, courseId, className, courseName });
      return response.data;
    } catch (error) {
      console.error('createBooking error:', error);
      throw error;
    }
  },

  getBookingsByEmail: async (email: string) => {
    try {
      const response = await apiClient.get(`/bookings/${email}`);
      return response.data;
    } catch (error) {
      console.error('getBookingsByEmail error:', error);
      throw error;
    }
  },

  getCourseById: async (courseId: string) => {
    try {
      const response = await apiClient.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('getBookingsByEmail error:', error);
      throw error;
    }
  }
};
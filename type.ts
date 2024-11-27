export interface Course {
    id: string;
    courseName: string;
    time: string;
    dayOfWeek: string;
    capacity: number;
    duration: number;
    price: number;
    type: string;
    description: string;
  }
  
  export interface Class {
    classId: string;
    courseId: string;
    className: string;
    date: string;
    teacher: string;
    comments: string;
  }
  
  export interface CartItem {
    classId: string;
    courseId: string;
    className: string;
    date: string;
    price: number;
}

export interface Booking {
    id: string;
    email: string;
    classId: string;
    courseId: string;
    bookingDate: string;
    status: 'confirmed' | 'pending' | 'cancelled';
}

export type RootStackParamList = {
    CourseList: undefined;
    ClassList: { courseId: string; courseName: string };
    Cart: undefined;
    MyBookings: undefined;
};
  
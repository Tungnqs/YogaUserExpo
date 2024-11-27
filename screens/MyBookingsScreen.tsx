import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { api } from '../api/client';
import { Ionicons } from '@expo/vector-icons';

type Booking = {
  _id: string;
  classId: string;
  className: string;
  courseName: string;
  status: string;
  bookingDate: string;
  email: string;
};

export default function MyBookingsScreen() {
    const [email, setEmail] = useState('');
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchBookings = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email');
            return;
        }
        setLoading(true);
        try {
            const data = await api.getBookingsByEmail(email);
            setBookings(data);
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'confirmed':
                return '#4CAF50';
            case 'pending':
                return '#FFC107';
            case 'cancelled':
                return '#F44336';
            default:
                return '#757575';
        }
    };

    const renderBookingItem = ({ item }: { item: Booking }) => (
        <View style={styles.bookingItem}>
            <View style={styles.bookingHeader}>
                <Ionicons name="book-outline" size={24} color="#6366f1" />
                <Text style={styles.className}>{item.className || 'Class Name'}</Text>
            </View>
            <View style={styles.bookingDetails}>
            <View style={styles.detailRow}>
                    <Ionicons name="document-text-outline" size={16} color="black" />
                    <Text style={{color: "black", fontWeight: "bold"}}>
                        Course: {item.courseName}
                    </Text>
                </View>
                <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={16} color="#666" />
                    <Text style={styles.detailText}>
                        {formatDate(item.bookingDate)}
                    </Text>
                </View>
                <View style={styles.detailRow}>
                    <Ionicons name="time-outline" size={16} color="#666" />
                    <Text style={styles.detailText}>
                        Booked on: {formatDate(item.bookingDate)}
                    </Text>
                </View>
                <View style={[styles.statusContainer, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                        {item.status.toUpperCase()}
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchSection}>
                <View style={styles.inputContainer}>
                    <Ionicons name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
                    <TextInput
                        style={styles.emailInput}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                </View>
                <TouchableOpacity
                    style={styles.searchButton}
                    onPress={fetchBookings}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={styles.searchButtonText}>Search</Text>
                    )}
                </TouchableOpacity>
            </View>
            
            <FlatList
                data={bookings}
                keyExtractor={item => item._id}
                renderItem={renderBookingItem}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="calendar-outline" size={50} color="#ccc" />
                        <Text style={styles.emptyList}>
                            {email ? 'No bookings found' : 'Enter your email to view bookings'}
                        </Text>
                    </View>
                }
                contentContainerStyle={styles.listContainer}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 16,
    },
    searchSection: {
        flexDirection: 'row',
        marginBottom: 20,
        gap: 10,
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        paddingHorizontal: 12,
    },
    inputIcon: {
        marginRight: 8,
    },
    emailInput: {
        flex: 1,
        height: 45,
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: '#6366f1',
        paddingHorizontal: 20,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    listContainer: {
        flexGrow: 1,
    },
    bookingItem: {
        backgroundColor: 'white',
        padding: 16,
        marginBottom: 12,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    bookingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 8,
    },
    className: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1f2937',
        flex: 1,
    },
    bookingDetails: {
        gap: 8,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    detailText: {
        fontSize: 14,
        color: '#666',
    },
    statusContainer: {
        alignSelf: 'flex-start',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        marginTop: 4,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '600',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    emptyList: {
        textAlign: 'center',
        fontSize: 16,
        color: '#666',
        marginTop: 12,
    },
});
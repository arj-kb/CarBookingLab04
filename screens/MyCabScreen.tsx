import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import { db } from '../services/firebaseConfig';
import { collection, onSnapshot, doc, updateDoc } from 'firebase/firestore';

const MyCabScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [myCabs, setMyCabs] = useState<any[]>([]);

  useEffect(() => {
    const cabsCollection = collection(db, 'cabs');
    const unsubscribe = onSnapshot(cabsCollection, (snapshot) => {
      const bookedCabs = snapshot.docs.map((doc) => {
        const cabData = doc.data();
        return {
          id: doc.id,
          ...cabData,
          booked: cabData.booked || false,
        };
      }).filter((cab) => cab.booked);
      setMyCabs(bookedCabs);
    }, (error) => {
      console.error('Firestore error: ', error);
    });

    return () => unsubscribe();
  }, []);

  const handleCancelBooking = async (cabId: string) => {
    try {
      // Mark cab as unbooked
      const cabDoc = doc(db, 'cabs', cabId);
      await updateDoc(cabDoc, { booked: false });

      Alert.alert('Success', 'Cab booking cancelled successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to cancel booking');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.head}>My Bookings</Text>
      <FlatList
        data={myCabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cabContainer}>
            <Text style={styles.companyName}>{item.model}    <Text style={styles.book}>Booked</Text></Text>
            <Text style={styles.passengerCount}>Passenger capacity is {item.passengerCount}</Text>
            <Text style={styles.cost}>You will be charged ${item.costPerHour} per hour </Text>
            <Button
              title="Cancel Booking"
              onPress={() => handleCancelBooking(item.id)}
              color="red"
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  head:{
    fontSize: 25,
    fontWeight:'bold',
    padding:10
  },
  book: {
    color: '#00EF10'
  },
  cabContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  model: {
    fontSize: 16,
    marginBottom: 4,
  },
  passengerCount: {
    fontSize: 16,
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    marginBottom: 4,
  },
  cost: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default MyCabScreen;

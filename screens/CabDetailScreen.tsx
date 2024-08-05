import React, { useEffect, useState } from 'react';
import { View, Text, Button, Alert, StyleSheet } from 'react-native';
import { db } from '../services/firebaseConfig';
import { doc, onSnapshot, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';

const CabDetailScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
  const { cabId } = route.params;
  const [cab, setCab] = useState<any>(null);
  const [booked, setBooked] = useState<boolean>(false);

  useEffect(() => {
    const cabDocRef = doc(db, 'cabs', cabId);

    const unsubscribe = onSnapshot(cabDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const cabData = docSnap.data();
        setCab(cabData);
        setBooked(cabData.booked || false);
      } else {
        Alert.alert('Error', 'No such cab!');
      }
    }, (error) => {
      Alert.alert('Error', 'Failed to fetch cab details.');
    });

    return () => unsubscribe();
  }, [cabId]);

  const handleBookCab = async () => {
    if (booked) {
      Alert.alert('Error', 'Cab already booked!');
      return;
    }

    try {
      // Check the number of currently booked cabs
      const cabsCollection = collection(db, 'cabs');
      const q = query(cabsCollection, where('booked', '==', true));
      const querySnapshot = await getDocs(q);

      // Check if there are already 2 cabs booked
      if (querySnapshot.size >= 2) {
        Alert.alert('Attention', 'You can only book up to 2 cabs at a time. Cancel a current booking to book a new one.');
        return;
      }

      // Mark cab as booked
      await updateDoc(doc(db, 'cabs', cabId), { booked: true });

      setBooked(true);
      Alert.alert('Success', 'Cab booked successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to book Cab');
    }
  };

  return (
    <View style={styles.container}>
      {cab ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.header}>Cab Details</Text>
          <Text style={styles.label}>Company: <Text style={styles.value}>{cab.companyName}</Text></Text>
          <Text style={styles.label}>Model: <Text style={styles.value}>{cab.model}</Text></Text>
          <Text style={styles.label}>Passenger Count: <Text style={styles.value}>{cab.passengerCount}</Text></Text>
          <Text style={styles.label}>Rating: <Text style={styles.value}>{cab.rating}</Text></Text>
          <Text style={styles.label}>Cost/Hour: <Text style={styles.value}>${cab.costPerHour}</Text></Text>
          <Button 
            title={booked ? "Cab Booked" : "Book Cab"}
            onPress={handleBookCab}
            disabled={booked}
            color={booked ? "#ccc" : "#007bff"}
          />
        </View>
      ) : (
        <Text style={styles.loading}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  detailsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 18,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontWeight: 'normal',
  },
  loading: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#666',
  },
});

export default CabDetailScreen;

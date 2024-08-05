import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { db } from '../services/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';

const CabsListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [cabs, setCabs] = useState<any[]>([]);

  useEffect(() => {
    const cabsCollection = collection(db, 'cabs');
    const unsubscribe = onSnapshot(cabsCollection, (snapshot) => {
      const cabList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCabs(cabList);
    }, (error) => {
      console.error('Firestore error: ', error);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={cabs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('CabDetail', { cabId: item.id })}
          >
            <Text style={styles.companyName}>{item.companyName}</Text>
            <Text style={styles.model}>{item.model}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 10,
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
    marginBottom: 5,
  },
  model: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
});

export default CabsListScreen;

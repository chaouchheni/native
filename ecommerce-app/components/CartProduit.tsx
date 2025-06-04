// src/components/CartProduit.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Product } from '../types/product';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ProduitId: { id: number };
  
};

type Props = {
  product: Product;
};

type ProduitIdNavigationProp = StackNavigationProp<RootStackParamList, 'ProduitId'>;

const CartProduit: React.FC<Props> = ({ product }) => {
  const navigation = useNavigation<ProduitIdNavigationProp>();

  return (
    
    
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProduitId', { id: product.id })}
      activeOpacity={0.8}
    >
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.bottomRow}>
        <Text style={styles.price}>{product.price.toFixed(2)} €</Text>
        <Text style={styles.category}>{product.category}</Text>
      </View>
    </TouchableOpacity>
    
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#28a745',
  },
  category: {
    fontSize: 14,
    color: '#888888',
    fontStyle: 'italic',
  },
});

export default CartProduit;

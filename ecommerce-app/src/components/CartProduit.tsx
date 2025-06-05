import React, { useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { deleteProduct } from '../../services/productService';
import { Product } from '../../types/product';

type RootStackParamList = {
  ProduitId: { id: number };
  UpdateProduct: { product: Product };
};

type Props = {
  product: Product;
  onDelete?: () => void;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const CartProduit: React.FC<Props> = ({ product, onDelete }) => {
  const navigation = useNavigation<NavigationProp>();

  const refreshProducts = useCallback(() => {
    if (onDelete) onDelete();
  }, [onDelete]);

  const handleDelete = (id: number) => {
    Alert.alert(
      'Confirmation',
      'Voulez-vous vraiment supprimer ce produit ?',
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteProduct(id);
              Alert.alert('Succès', 'Produit supprimé avec succès');
              refreshProducts();
            } catch (error) {
              Alert.alert('Erreur', 'Échec de la suppression');
              console.error('Erreur lors de la suppression :', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
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

      <View style={styles.actions}>
        <TouchableOpacity
          onPress={() => navigation.navigate('UpdateProduct', { product })}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="create-outline" size={24} color="#007bff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleDelete(product.id)}>
          <Ionicons name="trash" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 12,
  },
});

export default CartProduit;

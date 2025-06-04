import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { getProductById } from '../services/productService';
import { Product } from '../types/product';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  ProduitId: { id: number };
};

const ProduitId = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ProduitId'>>();
  const navigation = useNavigation();
  const { id } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (error) {
        console.error('Erreur lors de la récupération du produit :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centered}>
        <Text>Produit introuvable.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>

      <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>Prix : {product.price.toFixed(2)} €</Text>
      <Text style={styles.category}>Catégorie : {product.category}</Text>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f8f8f8',
    flexGrow: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#eaeaea',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  price: {
    fontSize: 18,
    color: '#28a745',
    fontWeight: '600',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
  },
});

export default ProduitId;

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, SafeAreaView, ScrollView } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { updateProduct } from '../../services/productService';
import type { Product } from '../../types/product';
import type { StackNavigationProp } from '@react-navigation/stack';

type UpdateProductRouteProp = RouteProp<RootStackParamList, 'UpdateProduct'>;
type UpdateProductNavProp = StackNavigationProp<RootStackParamList, 'UpdateProduct'>;

const UpdateProduct = () => {
  const route = useRoute<UpdateProductRouteProp>();
  const navigation = useNavigation<UpdateProductNavProp>();
  const { product } = route.params;

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price.toString());
  const [category, setCategory] = useState<'vêtements' | 'chaussures' | 'sacs'>(product.category);
  const [image, setImage] = useState(product.image);

  const handleUpdate = async () => {
    if (!name || !description || !price || !category || !image) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    try {
      const productToUpdate: Omit<Product, 'id'> = {
        name,
        description,
        price: parseFloat(price),
        category,
        image,
      };

      await updateProduct(product.id, productToUpdate);
      Alert.alert('Succès', 'Produit mis à jour avec succès.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Erreur de mise à jour :', error);
      Alert.alert('Erreur', 'La mise à jour a échoué.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.form}>
        <Text style={styles.label}>Nom du produit</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} value={description} onChangeText={setDescription} multiline />

        <Text style={styles.label}>Prix</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Catégorie</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={text => {
            if (text === 'vêtements' || text === 'chaussures' || text === 'sacs') {
              setCategory(text);
            }
          }}
          placeholder="vêtements, chaussures ou sacs"
        />

        <Text style={styles.label}>Image (URL ou nom)</Text>
        <TextInput style={styles.input} value={image} onChangeText={setImage} />

        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text style={styles.buttonText}>Mettre à jour</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UpdateProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 20,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginTop: 12,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

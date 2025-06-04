import React, { useState,useRef,useEffect  } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView, Keyboard,
  TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

import { createProduct } from '../services/productService';

const AddProduct = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  
  const [category, setCategory] = useState<'vêtements' | 'chaussures' | 'sacs'>('vêtements');
 const inputRef = useRef<TextInput>(null); // Crée une référence vers le champ TextInput

   useEffect(() => {
    // Met automatiquement le focus sur l'input quand le composant est monté
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async () => {
    if (!name || !description || !price || !category) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      Alert.alert('Erreur', 'Le prix doit être un nombre valide');
      return;
    }

    const newProduct = {
      name,
      description,
      price: parsedPrice,
      category,
      image: '', // Tu peux gérer les images plus tard
    };

    try {
      await createProduct(newProduct);
      Alert.alert('Succès', 'Produit ajouté avec succès');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erreur', "Échec de l'ajout du produit");
      console.error(error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" style={{ marginTop: 26, marginLeft: 20 }} />
        <Text style={styles.backText}>Retour</Text>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text style={styles.label}>Nom</Text>
        <TextInput ref={inputRef} style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} value={description} onChangeText={setDescription} />

        <Text style={styles.label}>Prix</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Catégorie</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            onValueChange={(itemValue: 'vêtements' | 'chaussures' | 'sacs', itemIndex: number) =>
              setCategory(itemValue)
            }>
            <Picker.Item label="Vêtements" value="vêtements" />
            <Picker.Item label="Chaussures" value="chaussures" />
            <Picker.Item label="Sacs" value="sacs" />
          </Picker>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backText: {
    marginLeft: 8,
    marginTop: 25,
    fontSize: 16,
    color: '#333',
  },
});

export default AddProduct;

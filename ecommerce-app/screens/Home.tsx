import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Product } from '../types/product';
import { getAllProducts } from '../services/productService';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type CategoryCardProps = {
  title: string;
  image: any;
  onPress: () => void;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ title, image, onPress }) => (
  <TouchableOpacity style={styles.categoryItem} onPress={onPress}>
    <Image source={image} style={styles.categoryImage} />
    <Text style={styles.categoryLabel}>{title}</Text>
  </TouchableOpacity>
);
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Produits: undefined;
  // add other routes here if needed
};

const Home: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    {
      title: 'Clothing',
      image: require('../assets/vêtement.png'),
    },
    {
      title: 'Shoes',
      image: require('../assets/chaussure.png'),
    },
    {
      title: 'Bags',
      image: require('../assets/sacs.png'),
    },
  ];

  return (
    <SafeAreaView >
    <ScrollView style={styles.container}>
      {/* New Arrivals */}
      <View style={styles.heroSection}>
        
        <Image
          source={require('../assets/vet.png')}
          style={styles.heroImage}
        />
       <TouchableOpacity onPress={() => navigation.navigate('Produits')} style={styles.shopNowButton}>
       <Text style={styles.shopNowText}>Shop Now</Text>
       </TouchableOpacity>

      </View>

      {/* Categories */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
     {categories.map((cat, index) => (
      < CategoryCard
        key={index}
        title={cat.title}
        image={cat.image}
        onPress={() => {
        // Exemple : filtrer les produits selon cat.title.toLowerCase()
        Alert.alert('Catégorie sélectionnée', cat.title);
           }}
         />
         ))}
       </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  
    marginTop: 150,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'left',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  heroImage: {
    width: 180,
    height: 180,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 6,
  },
  shopNowButton: {
    backgroundColor: '#d6c5ad',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    marginTop: 12,
  },
  shopNowText: {
    color: '#000',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  categoryItem: {
    alignItems: 'center',
    width: '30%',
  },
  categoryImage: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 14,
  },
  
});

export default Home;

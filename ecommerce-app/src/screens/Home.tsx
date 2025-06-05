import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { getAllProducts } from '../../services/productService';
import { Product } from '../../types/product';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Produits: undefined;
};

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

const Home: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { t, i18n } = useTranslation();
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
      key: 'clothing',
      image: require('../../assets/vêtement.png'),
    },
    {
      key: 'shoes',
      image: require('../../assets/chaussure.png'),
    },
    {
      key: 'bags',
      image: require('../../assets/sacs.png'),
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Image source={require('../../assets/vet.png')} style={styles.heroImage} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Produits')}
            style={styles.shopNowButton}
          >
            <Text style={styles.shopNowText}>{t('shopNow')}</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap' }}>
          {categories.map((cat, index) => (
            <CategoryCard
              key={index}
              title={t(cat.key)} // traduction dynamique
              image={cat.image}
              onPress={() => {
                Alert.alert(t('selectedCategory'), t(cat.key));
              }}
            />
          ))}
        </View>

        {/* Language Switch */}
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 130, marginTop: 20 }}>
  <Button title="FR" onPress={() => i18n.changeLanguage('fr')} />
  <Button title="EN" onPress={() => i18n.changeLanguage('en')} />
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
  categoryItem: {
    alignItems: 'center',
    width: '30%',
    margin: 10,
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

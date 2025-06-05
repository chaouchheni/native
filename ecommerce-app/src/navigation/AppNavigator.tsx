// src/navigation/AppNavigator.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Produits from '../screens/Produits';
import ProduitId from '../screens/ProduitId';
import AddProduct from '../hooks/AddProduct';
import UpdateProduct from '../hooks/UpdateProduct';
import { Product } from '../../types/product';

export type RootStackParamList = {
  Home: undefined;
  Produits: undefined;
  ProduitId: { id: number};
  AddProduct: undefined;
   UpdateProduct: { product: Product };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Produits" component={Produits} />
        <Stack.Screen name="ProduitId" component={ProduitId} options={{ title: 'Détail Produit' }}  />
        <Stack.Screen name="AddProduct" component={AddProduct} options={{ title: 'Ajouter un produit' }} />
        <Stack.Screen name="UpdateProduct" component={UpdateProduct} options={{ title: 'Modifier Produit' }}/>
        

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

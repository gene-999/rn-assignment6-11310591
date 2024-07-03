import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity} from 'react-native';
//import { items } from './items';
import * as SecureStore from 'expo-secure-store';
import { useState, useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import {
  useFonts,
  ArefRuqaaInk_400Regular,
} from '@expo-google-fonts/aref-ruqaa-ink';
import { useNavigation } from "@react-navigation/native";


export default function Cart() {
  const navigation = useNavigation();

   handleHomePress = () => {
    navigation.navigate('Home');
  }

  const [cartItems, setCartItems] = useState([]);

useEffect(() => {
  const loadCartItems = async () => {
    try {

      const cartItemsString = await SecureStore.getItemAsync('cartItems');
      if (cartItemsString) {
        const parsedCartItems = JSON.parse(cartItemsString);
        setCartItems(parsedCartItems);
        console.log('cartItexxxx:', cartItems);
      }
    } catch (error) {
      console.error('Error loading cart items:', error);
    }
  };

  loadCartItems();
}, []);

async function removeItem(itemName) {
  try {
    console.log('cartItems:', cartItems)
    const cartItemsString = await SecureStore.getItemAsync('cartItems');
    if (cartItemsString) {
      const parsedCartItems = JSON.parse(cartItemsString);
      const newCartItems = parsedCartItems.filter((item) => item.name !== itemName);
      await SecureStore.setItemAsync('cartItems', JSON.stringify(newCartItems));
      setCartItems(newCartItems);
      alert('Item removed successfully!');
    }
  } catch (error) {
    console.error('Error removing item:', error);
  }
}

let [fontsLoaded] = useFonts({
  ArefRuqaaInk_400Regular,
});


if (!fontsLoaded) {
  return <AppLoading />;
} else {

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
       
        <Image style={styles.logo} source={require('./assets/Logo.png')} />
        
        <TouchableOpacity onPress={handleHomePress}>
        <Image style={[styles.icon, {marginRight:15}]} source={require('./assets/Search.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoBar}>
        <Text style={[styles.heading,{fontFamily: 'ArefRuqaaInk_400Regular'}]}>Checkout</Text>
      </View>
     <View style={styles.catalog}>
     <FlatList 
      keyExtractor={(item) => item.id.toString()}
        data={cartItems}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <>
          <View style={[styles.catalog]}>
            <Image style={styles.itemImage} source={item.image} />
            <TouchableOpacity onPressIn={ () =>{removeItem(item.name); console.log("cartItems: ", cartItems)}}>
              <Image style={styles.removeFromCart} source={require('./assets/remove.png')} />
            </TouchableOpacity>
           <View style={styles.itemInfo}>
           <Text style={[styles.itemName,{fontFamily: 'ArefRuqaaInk_400Regular'}]}>{item.name.toUpperCase()}</Text>
            <Text style={[styles.itemDescription,{fontFamily: 'ArefRuqaaInk_400Regular'}]}>{item.additional_info}</Text>
            <Text style={[styles.itemPrice,{fontFamily: 'ArefRuqaaInk_400Regular'}]}>{item.price}</Text>
           </View>
          </View>
          
          </>
        )}
      /> 
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topBar : {
    marginTop: -385,
    backgroundColor: 'white',
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  logo:{
    width: 100,
    height: 40,
    left: 120,
  },
  infoBar:{
    backgroundColor: 'white',
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: -15,
    
  },
  heading :{
    fontSize: 34,
    fontWeight: '300',
    left: 100,
    marginTop:-30,
    //width: 200,
  },
  catalog :{  
    //position: 'relative',
    //marginTop: -5,
    flexDirection: 'row',
    //flexWrap: 'wrap',
    //justifyContent: 'space-between',
    padding: 5,
    //width: '50%',
    marginBottom: -400,
    height: 600,
  },
  itemImage :{
    width: 150,
    height: 180,
    resizeMode: 'contain', 
    paddingBottom: 10,
  },
  itemName :{
    fontSize: 24,
    fontWeight: '400',
  },
  itemPrice :{
    fontSize: 18,
    fontWeight: '300',
    color:"#DD8560"
  },
  itemDescription :{
    fontSize: 18,
    fontWeight: '300',
    color:"#B9B9B9",
    width: 180,
    
  },
  removeFromCart: {
    //position: 'absolute',
    top: 145,
    right: -125,
    width: 25, // Adjust width as needed
    height: 25, // Adjust height as needed
    resizeMode: 'contain',
  },
  itemInfo: {
    padding: 10,
    top: 25,
    right: 30
    //width: 160,
  }

});





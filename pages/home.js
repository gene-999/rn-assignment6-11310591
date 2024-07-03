
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { items } from '../catalog/items';
import * as SecureStore from 'expo-secure-store';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { useFonts, ArefRuqaaInk_400Regular} from '@expo-google-fonts/aref-ruqaa-ink';
import { useNavigation } from "@react-navigation/native";



export default function Home() {
  const navigation = useNavigation();
  let [fontsLoaded] = useFonts({
    ArefRuqaaInk_400Regular,
    
  });
  
  onCartPress = () => {
    navigation.navigate('Cart');
  }

  if (!fontsLoaded) {
    console.log('fontsLoaded:', fontsLoaded); 
    return <AppLoading />;
  } else {
    console.log('fontsLoaded:', fontsLoaded); 
    return (
      <SafeAreaView style={[styles.container]}>
        <View style={styles.container}>
         <View style={styles.topBar}>
           <Image style={styles.icon} source={require('./assets/Menu.png')} />
           <Image style={styles.logo} source={require('./assets/Logo.png')} />
           <Image style={[styles.icon, {marginRight:-35}]} source={require('./assets/Search.png')} />
           <TouchableOpacity onPress={onCartPress}>
           <Image style={styles.icon} source={require('./assets/shoppingBag.png')} />
            </TouchableOpacity>
         </View>
         <View style={styles.infoBar}>
           <Text style={[styles.heading, {fontFamily: 'ArefRuqaaInk_400Regular'}]}>Our Story</Text>
           <MaterialCommunityIcons style={[styles.icon, {marginRight:-100, backgroundColor:'#F9F9F9', borderRadius:100, height:35, width:35}]} name="format-list-checkbox" size={35} color="#868691" />
           <MaterialIcons style={{backgroundColor:'#F9F9F9', borderRadius:100, height:40, width:40, marginRight: 5, padding: 5  }} name="filter-list" size={30} color="#E5A990" />
           
   
         </View>
        <View style={styles.catalog}>
        <FlatList 
         keyExtractor={(item) => item.id.toString()}
           data={items}
           numColumns={2}
           showsVerticalScrollIndicator={false}
           renderItem={({item}) => (
             <>
             <View style={[styles.catalog, { height:300,}]}>
               <Image style={styles.itemImage} source={item.image} />
               <TouchableOpacity onPressIn={() => { save(item)}}>
                 <Image style={styles.addCart} source={require('./assets/add_circle.png')} />
               </TouchableOpacity>
               <Text style={[styles.itemName,{fontFamily: 'ArefRuqaaInk_400Regular'}]}>{item.name}</Text>
               <Text style={[styles.itemDescription,{fontFamily: 'ArefRuqaaInk_400Regular'}]}>{item.description}</Text>
               <Text style={[styles.itemPrice,{fontFamily: 'ArefRuqaaInk_400Regular'}]}>{item.price}</Text>
             </View>
             </>
           )}
         /> 
         </View>
       </View>
       </SafeAreaView>
     );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'ArefRuqaa_400Regular',
  },
  topBar : {
    marginTop: 5,
    backgroundColor: 'white',
    height: 90,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: -55,
    marginLeft:20
  },
  icon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  logo:{
    width: 100,
    height: 40,
    marginLeft: 15,
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
    marginTop: 30,
    marginLeft:20
  },
  heading :{
    fontSize: 30,
    fontWeight: '300',
    marginTop: 0,
  },
  catalog :{  
    //position: 'static',
    marginTop: 5,
   // flexDirection: 'column',
    //flexWrap: 'wrap',
    //justifyContent: 'space-between',
    padding: 5,
    //width: '50%',
    height: 565,
  },
  itemImage :{
    width: 160,
    height: 200,
    resizeMode: 'contain',
  },
  itemName :{
    fontSize: 20,
    fontWeight: '300',
    marginLeft:5
  },
  itemPrice :{
    fontSize: 16,
    fontWeight: '300',
    color:"#DD8560",
    marginLeft:5
  },
  itemDescription :{
    fontSize: 16,
    fontWeight: '300',
    color:"#B9B9B9",
    width: 160,
    marginLeft:5
  },
  addCart: {
    position: 'absolute',
    bottom: 5,
    right: 10,
    width: 30, // Adjust width as needed
    height: 30, // Adjust height as needed
    //resizeMode: 'contain',
    
  },

});


//save data
let cartItems = []

async function save(value) { 
  try {
    cartItems.push(value); 
    const cartItemsString = JSON.stringify(cartItems);
    await SecureStore.setItemAsync('cartItems', cartItemsString);
    alert('Cart items saved successfully!');
  } catch (error) {
    alert('Error saving cart items:', error);
  }
}

//retrieve data



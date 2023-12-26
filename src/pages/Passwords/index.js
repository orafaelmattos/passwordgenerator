import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import useStorage from '../../Hooks/useStorage';
import { PasswordItem } from './components/passwordItem'

export function Passwords() {
  const [listPasswords, setListPasswords] = useState([]);
  const focused = useIsFocused();
  const { getItem, removeItem } = useStorage();

  useEffect(() => {
    async function loadPasswords() {
      try {
        const password = await getItem('@pass');
        setListPasswords(password); 
      } catch (error) {
        console.error('Error loading passwords:', error);
      }
    }

    if (focused) {
      loadPasswords();
    }
  }, [focused, getItem]);

  async function handleDeletePasword(item){
    const passwords = await removeItem('@pass', item)
    setListPasswords(passwords)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.Text}>Minhas Senhas</Text>
      </View>

      <View style={styles.content}>
  <FlatList
    style={{flex: 1, paddingTop: 14}}
    data={listPasswords}
    keyExtractor={(item) => String(item)}
    renderItem={({item}) => <PasswordItem data={item} removePassword={() => handleDeletePasword(item)}/>}
  />
</View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#392de9',
    paddingTop: 58,
    paddingBottom: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  Text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content:{
    flex: 1,
    paddingLeft: 14, 
    paddingRight: 14,
  }
});

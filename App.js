import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TextInput } from 'react-native';

export default function App() {
  const [users, setUsers] = useState([])
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = () => {
    fetch("https://randomuser.me/api/?results=5000")
      .then((response) => response.json())
      .then((data) => setUsers(data.results))
      .catch((error) => console.log('--> Error', error))
  }

  const filterdUsers = users.filter(user =>
    user.name.first.toLowerCase().includes(search.toLowerCase())
    || user.name.last.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <View style={styles.container}>
      {users.length > 0 && (
        <TextInput
          style={styles.searchBar}
          placeholder='Search first or last name'
          value={search}
          onChangeText={(text) => setSearch(text)}
        />)}
      <FlatList data={filterdUsers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.rowContainer} >
            <Image source={{ uri: item.picture.thumbnail }}
              style={styles.image}
            />
            <Text>{`${item.name.first} ${item.name.last}`}</Text>
          </View>
        )} />
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchBar: {
    borderWidth: 1,
    padding: 8,
    margin: 8
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    width: 50,
    height: 50
  },

});

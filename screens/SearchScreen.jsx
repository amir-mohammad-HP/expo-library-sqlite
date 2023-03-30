import { useState, useEffect } from 'react';
import { Button, View, Text, ScrollView, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { useDbContext } from '../context/contextDb';


const SearchScreen = ({ navigation }) => {

  const {database, isLoading, setIsLoading} = useDbContext()
  const [books, setBooks] = useState([]);

  const showNames = () => {
    return books.map((name, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text>{name.title}</Text>
        </View>
      );
    });
  };

  useEffect(() => {

    database.transaction(tx => {
      tx.executeSql('SELECT * FROM Books', null,
        (txObj, resultSet) => setBooks(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);
  }, [database]);

    return (
      <SafeAreaView style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    }}>
        <ScrollView showsVerticalScrollIndicator={ false } >

            {isLoading &&
              <View style={{
                flex: 1,
                margin: SIZES.xLarge,
                }}
                >
                  <Text>دارم فکر می کنم ...</Text>
              </View>
            }
            {!isLoading &&
              <View style={{
                flex: 1,
                margin: SIZES.xLarge,
                }}
                >
                  
              </View>
            }
            

        </ScrollView>
    </SafeAreaView>
    );
  }

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    margin: 8
  }
});
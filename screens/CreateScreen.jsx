import { useState, useRef, useEffect } from 'react';
import { Button, View, Text, ScrollView, SafeAreaView, TextInput, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../constants';
import { useDbContext } from '../context/contextDb';


const CreateScreen = ({ navigation }) => {
    const {database, latestBook, setLatestBook} = useDbContext()
    const bookTitle = useRef(latestBook?.title ? latestBook?.title: "");
    const bookPublication = useRef(latestBook?.publication ? latestBook?.publication: "");
    const bookIsbn = useRef(latestBook?.isbn ? latestBook?.isbn: "");
    const bookReleaseDate = useRef(latestBook?.release_date ? latestBook?.release_date: "");
    const bookExtra = useRef(latestBook?.extra ? latestBook?.extra: "");
    const bookCode = useRef(latestBook?.code ? latestBook?.code: "");

    const [message, setMessage] = useState(null)
    const [error, setError] = useState(null)


    const applyField = () => {
        let _latasetBook = {
            'title': bookTitle.current.nativeEvent?.text,
            'publication': bookPublication.current.nativeEvent?.text,
            'isbn': bookIsbn.current.nativeEvent?.text,
            'release_date': bookReleaseDate.current.nativeEvent?.text,
            'exta': bookExtra.current.nativeEvent?.text,
            'code': bookCode.current.nativeEvent?.text,
        };
        setLatestBook(_latasetBook);
    }

    const addBook = () => {
        if (!latestBook?.title) {
            setError('نام کتاب باید وارد شود');
            return 0;
        }
        if (!latestBook?.specialcode) {
            setError('کد قفسه باید وارد شود');
            return 0;
        }

        let db_values = [
            latestBook?.title,
            latestBook?.publication ? latestBook?.publication : "",
            latestBook?.isbn ? latestBook?.isbn : "",
            latestBook?.release_date ? latestBook?.release_date : "",
            latestBook?.extra ? latestBook?.extra : "",
            latestBook?.specialcode
        ];
        console.log(db_values);
        database.transaction(tx => {
          tx.executeSql(`
            INSERT INTO Books (
                title,
                publication,
                isbn,
                release_date,
                extra,
                specialcode'
                ) values (?)
            `, db_values,
            (txObj, resultSet) => {
              setLatestBook({});
              setMessage(`
                ثبت با موفقیت انجام شد
              `);
            },
            (txObj, error) => {
                // later catch the unique constraint error
                setError(`
                متاسفانه خطایی رخ داده است
                `);
                console.log(error)
            }
          );
        });
        // navigate to search results page but later to book
        navigation.navigate('Search')
      }

    useEffect(() => {
    const interval = setInterval(() => {
        setError(null);
        setMessage(null);
    }, 5000);
    return () => clearInterval(interval);
    }, []);

    return (
    //   <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    //     <Button onPress={() => navigation.navigate('Search')} title="Go back search" />
    //   </View>
    <SafeAreaView style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
    }}>
        <ScrollView showsVerticalScrollIndicator={ false } >
            {message &&
                <View style={{
                    flex: 1,
                    marginTop: SIZES.xLarge,
                    marginLeft: SIZES.large,
                    marginRight: SIZES.large,
                    borderRadius: SIZES.medium,
                    backgroundColor: COLORS.success,
                    }}>
                    <Text style={styles.text}> {message} </Text>
                </View>
            }

            {error &&
                <View style={{
                    flex: 1,
                    marginTop: SIZES.xLarge,
                    marginLeft: SIZES.large,
                    marginRight: SIZES.large,
                    borderRadius: SIZES.medium,
                    backgroundColor: COLORS.tertiary,
                    }}>
                    <Text style={styles.text}> {error} </Text>
                </View>
            }

            <View style={{
                flex: 1,
                margin: SIZES.xLarge,
                }}
                onChange={applyField}
                >
                <TextInput 
                    placeholder='نام کتاب' 
                    onChange={(text) => { bookTitle.current = text}}
                    style={styles.input}
                    />
                <TextInput 
                    placeholder='ناشر' 
                    onChange={(text) => { bookPublication.current = text }}
                    style={styles.input}
                    />
                <TextInput 
                    placeholder='شابک' 
                    onChange={(text) => { bookIsbn.current = text }}
                    style={styles.input}
                    />
                <TextInput 
                    placeholder='تاریخ انتشار' 
                    onChange={(text) => { bookReleaseDate.current = text }}
                    style={styles.input}
                    />
                <TextInput 
                    placeholder='کد قفسه' 
                    onChange={(text) => { bookCode.current = text }}
                    style={styles.input}
                    />
                <TextInput 
                    placeholder='توضیحات' 
                    onChange={(text) => { bookExtra.current = text }}
                    multiline={true}
                    numberOfLines={10}
                    style={styles.inputArea}
                    />
                

            </View>
            <View style={{
                flex: 1,
                margin: SIZES.xLarge,
                }}>
                <Button style={styles.btn} onPress={addBook} title="ثبت کتاب" />
            </View>
        </ScrollView>
    </SafeAreaView>
    );
  }

export default CreateScreen;


const styles = StyleSheet.create({
    input: {
        fontSize: SIZES.xxLarge,
        height: SIZES.xxLarge*1.5,
        backgroundColor: COLORS.white,
        paddingLeft: SIZES.small,
        paddingRight: SIZES.small,
        marginTop: SIZES.small,
        borderRadius: SIZES.small,
        textAlign: 'center'
    },
    inputArea: {
        fontSize: SIZES.xLarge,
        height: SIZES.xxLarge*5,
        backgroundColor: COLORS.white,
        padding: SIZES.small,
        marginTop: SIZES.small,
        borderRadius: SIZES.small,
        textAlign: 'right',
        textAlignVertical: 'top'

    },
    text: {
        fontSize: SIZES.xLarge,
        height: SIZES.xLarge,
        margin: SIZES.large,
        textAlign: 'center',
        color: COLORS.white,
    },
    btn: {
        fontSize: SIZES.xLarge,
        height: SIZES.xLarge,
        margin: SIZES.large,
        textAlign: 'center',
        color: COLORS.white,
    }
  });
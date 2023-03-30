import { createContext, useState, useContext, useEffect } from "react";
import * as SQLite from 'expo-sqlite';

const StateContext = createContext({
    database: 'library.db',
    setDatebase: () => {},
    isLoading: null, 
    setIsLoading: () => {},
    latestBook: {},
    setLatestBook: () => {},

})

export const DatabaseProvider = ({children}) => {
    const [database, setDatebase] = useState(SQLite.openDatabase('library.db'));
    const [isLoading, setIsLoading] = useState(true);
    const [latestBook, setLatestBook] = useState({});

    useEffect(() => {

        database.transaction(tx => {
          tx.executeSql(
            `CREATE TABLE IF NOT EXISTS Books (
                id INTEGER PRIMARY KEY AUTOINCREMENT, 
                title TEXT NOT NULL,
                publication TEXT,
                isbn TEXT,
                release_date TEXT,
                extra TEXT,
                specialcode TEXT UNIQUE NOT NULL
            )`
            );
        });
        console.log(database)

    }, [database]);

    return (
        <StateContext.Provider value={{
            database,
            setDatebase,
            isLoading,
            setIsLoading,
            latestBook,
            setLatestBook
        }} >
            {children}
        </StateContext.Provider >
    )
}

export const useDbContext = () => useContext(StateContext)
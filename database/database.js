import * as SQLite from 'expo-sqlite';

export const Tirhaka = {
  getTirhaka: () => SQLite.openDatabase("tirhaka.db"),
};
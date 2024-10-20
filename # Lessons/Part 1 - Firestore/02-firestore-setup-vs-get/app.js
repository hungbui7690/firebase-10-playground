/*
  Firestore Database
  - https://firebase.google.com/docs/firestore/query-data/get-data
  - create DB -> <Test> Mode 
    -> otherwise, we cannot access our data
  - create collection -> books
  - create documents: {
      id: auto-generated,
      title: 'The Lord of the Rings',
      author: 'J. R. R. Tolkien',
    }


*/

import 'dotenv/config'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore' // 1.

let { API_KEY, APP_ID } = process.env

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'fir-10-tutorial.firebaseapp.com',
  projectId: 'fir-10-tutorial',
  storageBucket: 'fir-10-tutorial.appspot.com',
  messagingSenderId: '548902858061',
  appId: APP_ID,
  measurementId: 'G-QESWE2KQF4',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app) // 2.
const colRef = collection(db, 'books') // 3.

// 4. Method 1
const getBooks = async () => {
  const books = []
  const querySnapshot = await getDocs(colRef)
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} => ${doc.data()}`) // # returns [object Object]
    console.log(doc.id, ' => ', doc.data())

    const book = {
      id: doc.id,
      ...doc.data(),
    }
    books.push(book)
  })
  console.log(books)
}
getBooks()

// 5. Method 2
// getDocs(colRef)
//   .then((querySnapshot) => {
//     const books = []

//     querySnapshot.forEach((doc) => {
//       // console.log(doc.id, ' => ', doc.data())
//       const book = {
//         id: doc.id,
//         ...doc.data(),
//       }
//       books.push(book)
//     })
//     console.log(books)
//   })
//   .catch((error) => {
//     console.log('Error getting documents: ', error)
//   })

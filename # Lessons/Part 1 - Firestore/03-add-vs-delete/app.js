/*
  Add vs Delete Document
  - collection(db, 'books')
    -> 2 params -> collection
  - doc(db, 'books', deleteBookForm.id.value)
    -> 3 params -> doc



*/

import 'dotenv/config'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore'

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
const db = getFirestore(app)
const colRef = collection(db, 'books')

const getBooks = async () => {
  const books = []
  const querySnapshot = await getDocs(colRef)
  querySnapshot.forEach((doc) => {
    const book = {
      id: doc.id,
      ...doc.data(),
    }
    books.push(book)
  })
  console.log(books)
}
getBooks()

// 1. Add Document
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  // Method 1
  try {
    const docRef = await addDoc(colRef, {
      title: addBookForm.title.value,
      author: addBookForm.author.value,
    })
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }

  // Method 2
  // addDoc(colRef, {
  //   title: addBookForm.title.value,
  //   author: addBookForm.author.value,
  // })
  //   .then(() => {
  //     addBookForm.reset()
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
})

// 2. Delete Document
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  // Method 1
  const docRef = doc(db, 'books', deleteBookForm.id.value)
  deleteDoc(docRef)

  // Method 2
  // const docRef = doc(db, 'books', deleteBookForm.id.value) // get the document
  // console.log(docRef)
  // deleteDoc(docRef).then(() => {
  //   deleteBookForm.reset() // delete the document we just got
  // })
})

/*
  Get Real Time Data
  - every time we add a document, we get an update
  - we need to listen to a document with onSnapshot() -> subscription
  - use onSnapshot() instead of getDocs()


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
  onSnapshot,
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

// # Real Time Data
onSnapshot(colRef, (snapshot) => {
  let books = []
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

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
// getBooks()

const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', async (e) => {
  e.preventDefault()

  try {
    const docRef = await addDoc(colRef, {
      title: addBookForm.title.value,
      author: addBookForm.author.value,
    })
    console.log('Document written with ID: ', docRef.id)
  } catch (e) {
    console.error('Error adding document: ', e)
  }
})

const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db, 'books', deleteBookForm.id.value)
  deleteDoc(docRef)
})

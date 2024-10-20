/*
  Firestore Queries
  - we get all documents -> want to filter


\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

  Ordering Data & Timestamps
  - https://firebase.google.com/docs/firestore/query-data/order-limit-data
  - since our collection does not have timestamps -> we need to re-create the collection
    -> createdAt
    
  🌲 we need Firestore Timestamp


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
  query,
  where,
  orderBy,
  serverTimestamp,
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

// 1.
// const q = query(colRef) // full collection
// const q = query(colRef, where('author', '==', 'J.K. Rowling')) // filter
const q = query(colRef, orderBy('createdAt')) // filter
//

// # instead of using colRef, we use q
onSnapshot(q, (snapshot) => {
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
      createdAt: serverTimestamp(),
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

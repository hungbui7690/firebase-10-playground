/*
  Fetching a Single Document
  - doc(db, 'books', 'FWAIP9VRNlGqsny1LAwt')
  - getDoc()



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
  getDoc,
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

const q = query(colRef, orderBy('createdAt'))

onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

const docRef = doc(db, 'books', 'FWAIP9VRNlGqsny1LAwt')
// # fetching a single document (& realtime)

// Method 1: getDoc !== getDocs
getDoc(docRef).then((doc) => {
  console.log(doc.data(), doc.id)
})

// Method 2
// onSnapshot(docRef, (doc) => {
//   console.log(doc.data(), doc.id)
// })

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

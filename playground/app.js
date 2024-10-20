/*
  Subscribing/Unsubscribing to Auth
  - we can setup a real time subscription to auth changes
    -> when user login or logout, we get an update or notification


*/

import 'dotenv/config'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged, // 1.
} from 'firebase/auth'

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
const auth = getAuth()

const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
    .then((credential) => {
      console.log('user created:', credential.user)
      signupForm.reset()
    })
    .catch((err) => {
      console.log(err.message)
    })
})

const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() => {
      console.log('user signed out')
    })
    .catch((err) => {
      console.log(err.message)
    })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value

  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log('user logged in:', cred.user)
      loginForm.reset()
    })
    .catch((err) => {
      console.log(err.message)
    })
})

const db = getFirestore(app)
const colRef = collection(db, 'books')

const q = query(colRef, orderBy('createdAt'))

// 2.
const unsubCol = onSnapshot(q, (snapshot) => {
  let books = []
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id })
  })
  console.log(books)
})

const docRef = doc(db, 'books', 'FWAIP9VRNlGqsny1LAwt')

// 3.
const unsubDoc = onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})

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

const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let docRef = doc(db, 'books', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title',
  }).then(() => {
    updateForm.reset()
  })
})

// 4. subscribing to auth changes
const unsubAuth = onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user)
})

// 5. unsubscribing from changes (auth & db)
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
  console.log('unsubscribing')
  unsubCol()
  unsubDoc()
  unsubAuth() // call step 1
})

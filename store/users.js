import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const usersRef = db.collection('users')
let uid = ''
firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        uid = firebase.auth().currentUser.uid
    }
})

export const state = () => ({
    users: [],
    loginedUsers: [],
    carports: []
})

export const actions = {
    init: firestoreAction(({ bindFirestoreRef }) => {
        bindFirestoreRef('users', usersRef)
    }),
    loginedInit: firestoreAction(({ bindFirestoreRef }) => {
        if(uid) {
            bindFirestoreRef('loginedUsers', usersRef.where('uid', '==', uid))
        }
    }),
    carportsInit: firestoreAction(({ bindFirestoreRef }) => {
        if(uid) {
            bindFirestoreRef('carports', usersRef.doc('XAFLuZi9rCYDmKaQL2G9').collection('carports'))
        }
    }),
    addUser: firestoreAction((context, user) => {
        if(user) {
            usersRef.add({
                name: user,
                uid: uid
            })
        }
    }),
    add: firestoreAction((context, carports) => {
        if(carports.name.trim()) {
            usersRef.add({
                address: carports.address,
                capacity: carports.capacity,
                gmap_url: carports.address,
                lat: carports.lat,
                lng: carports.lng,
                name: carports.name,
                price: carports.price,
                status: carports.status,
                tel: carports.tel,
                uid: carports.uid
            })
        }
    })
}

export const getters = {
	users: (state) => {
		return state.users
    },
    loginedUsers: (state) => {
        return state.loginedUsers
    },
    carports: (state) => {
        return state.carports
    }
}
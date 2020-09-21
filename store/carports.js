import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

const db = firebase.firestore()
const carportsRef = db.collection('carports')
let uid = ''
firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        uid = firebase.auth().currentUser.uid
    }
})

export const state = () => ({
    carports: [],
    myCarports: []
})

export const actions = {
    carportsInit: firestoreAction(({ bindFirestoreRef }) => {
        bindFirestoreRef('carports', carportsRef)
    }),
    myCarportsInit: firestoreAction(({ bindFirestoreRef }) => {
        if(uid) {
            bindFirestoreRef('myCarports', carportsRef.where('uid', '==', uid))
        }
    }),
    carportAdd: firestoreAction((context, carportInfo) => {
        if(carportInfo.name) {
            carportsRef.add({
                uid: uid,
                name: carportInfo.name,
                address: carportInfo.address,
                tel: carportInfo.tel,
                lng: carportInfo.lng,
                lat: carportInfo.lat,
            })
        }
    }),
    carportEdit: firestoreAction((context, carport) => {
        if(carport.name) {
            carportsRef.doc(carport.id).update(carport)
        }
    }),
    carportRemove: firestoreAction((context, id) => {
        carportsRef.doc(id).delete()
    })
}

export const getters = {
	carports: (state) => {
		return state.carports
    },
    myCarports: (state) => {
        return state.myCarports
    }
}
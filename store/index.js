import { auth } from '~/plugins/firebase.js'
import { vuexfireMutations } from 'vuexfire'

export const strict = false

export const state = () => ({
	user: null
})

export const mutations = {
	setUser: (state, payload) => {
		state.user = payload
	},
	...vuexfireMutations
}

export const actions = {
	signUp: ({ commit }, { email, password }) => {
		return auth().createUserWithEmailAndPassword(email, password)
	},
	signInWithEmail: ({ commit }, { email, password }) => {
		return auth().signInWithEmailAndPassword(email, password)
	},
	signInWithGoogle: ({ commit }) => {
		return auth().signInWithPopup(new auth.GoogleAuthProvider())
	},
	signOut: () => {
		return auth().signOut()
	}
}

export const getters = {
	user: (state) => {
		return state.user
	},
	isAuthenticated: (state) => {
		return !!state.user
	}
}
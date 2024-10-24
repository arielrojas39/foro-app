import Vue from 'vue'
import Vuex from 'vuex'
import {auth, db, storage} from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    error: null,
  },
  getters: {
    isAuth: state => !!state.user,
    user: state => state.user,
    error: state => state.error,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setError(state, error) {
      state.error = error
    },
  },
  actions: {
    async login({commit}, {email, pass}) {
      try {
        const userCredential = await auth.signInWithEmailAndPassword(email, pass);
        commit('setUser', userCredential.user)
      } catch (error) {
        commit('setError', error.message)
        throw error;
      }
    },

    async logout({commit}) {
      await auth.signOut();
      commit('setUser', null)
    },

    async register({commit}, {email, pass, profile, file, role = 'user'}) {
        try {
          const userCredential = await auth.createUserWithEmailAndPassword(email, pass)
          const user = userCredential.user;

          const storageRef = storage.ref()
          const fileRef = storageRef.child(`profileImages/${user.uid}`)
          await fileRef.put(file)
          const photoURL = await fileRef.getDownloadURL()

          await db.collection('users').doc(user.uid).set({
            email: user.email,
            photoURL,
            role,
            ...profile
          })

          commit('setUser', user)
        } catch (error) {
          commit('setError', error.message)
        }
    }
  },
})

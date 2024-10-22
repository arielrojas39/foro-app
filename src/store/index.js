import Vue from 'vue'
import Vuex from 'vuex'
import {auth} from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user:null,
    error:null
  },
  getters: {
    isAuth: state => !!state.user,
    user: state => state.user,
    error: state => state.error,
  },
  mutations: {
    setUser(state, user){
      state.user = user;
    },
    setError(state, error){
      state.error = error;
    }
  },
  actions: {
    async login({commit}, {email, pass}){
      try{
        const userCredential = await auth.signInWithEmailAndPassword(email, pass);
        commit('setUser', userCredential.user)
      }catch(error){
        commit('setError', error.mesagge)
        throw error;
      }
    },
    async logout({commit}){
      await auth.signOut();
      commit('setUser', null)
    }
  }

})

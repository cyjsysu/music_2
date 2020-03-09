import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

let store = new Vuex.Store({
    state:{
        song:{},
        songBatch:[],
    },
    mutations:{
        sendSong(state, data){
            state.song = data;
        },
        sendSeveralSongs(state,data){
            state.songBatch = data;
        }
    },




});
export default store;
<template>
    <div class="personHome">
        <div class="personBg">
            <div class="personArea">
                <div class="personInfo">
                    <div class="headshot">
                        <img :src=header alt="">
                    </div>
                    <div class="personName"><strong>{{username}}</strong></div>
                </div>

                <div class="personSrc">
                    <ul>
<!--                        <li class="btn not-select" @click="changeShow(0)">我喜欢</li>-->
<!--                        <li class="btn not-select" @click="changeShow(1)">我的歌单</li>-->
                        <li class="btn not-select"><router-link :to="{name: 'myFavorite'}">我喜欢</router-link></li>
                        <li class="btn not-select"><router-link  :to="{name: 'myList'}">我的歌单</router-link></li>
                    </ul>
                </div>
            </div>
        </div>

<!--        <SongList :src-path="favorSrc" v-if="curIndex === 0"></SongList>-->
<!--        <MySheet v-if="curIndex === 1"></MySheet>-->


    </div>

</template>

<script>
    //个人主页
    import SongList from "../home/SongList";
    import MySheet from "./MySheet";
    export default {
        name: "PersonBG",
        components:{
            SongList,
            MySheet,
        },
        data(){
            return{
                header: '/static/imgs/head_default.jpg',
                username: '',
                curIndex: -1,
                favorSrc: '#',
                listSrc: '#',
            }
        },
        methods:{
            changeShow(index){
                if(this.curIndex !== index){
                    if(index === 0){
                        this.favorSrc = '/db/mylove/';
                    }else if(index === 1){

                    }
                    this.curIndex = index;
                }
            }
        },
        mounted() {
            let param = new URLSearchParams();
            if(!this.$cookies.isKey('user')){
                this.$router.go(0);
            }
            param.append('id', this.$cookies.get('user'));
            param.append('us', this.$cookies.get('username'));
            //console.log(param);
            this.$axios.post('/db/header/', param)
                .then(response => {
                    let res = response.data;
                    if(res['result'] === 'true'){
                        this.header = res['header']
                    }
                })
                .catch(error => {
                    console.log(error);
                });
            this.username = this.$cookies.get('username');

            this.changeShow(0);
        }
    }
</script>

<style scoped>
    a{
        color: white;
    }
    .personBg {
        width: 100vw;
        height: 300px;
        margin: 0 auto;
        background: url("/static/imgs/person_bg_3.jpg") no-repeat;
        background-size: cover;
    }
    .person-collection{
        width: 100%;
    }
    .personArea {
        height: 100%;
        width: 900px;
        position: relative;
        margin: 0 auto;
        box-sizing: border-box;
        padding-top: 30px;

    }

    .personInfo {
        height: 180px;
        width: 300px;
        /*background-color: red;*/
        /*position: absolute;*/
        margin: 0 auto;
        position: relative;
    }

    .personInfo .headshot {
        width: 120px;
        height: 120px;
        margin: 0 auto;

    }

    .personInfo .headshot img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        border: 3px solid white;
    }

    .personInfo .personName {
        width: 100%;
        height: 40px;
        text-align: center;
        /*background-color: blue;*/
        position: absolute;
        bottom: 0;
        left: 0;
        font-size: 24px;
        color: white;
    }

    .personSrc{
        width: 100%;
        height: 30px;
        position: absolute;
        /*background-color: red;*/
        bottom: 0;
        left: 0;
    }
    .personSrc ul{

    }
    .personSrc ul li{
        list-style: none;
        float: left;
        margin-left: 30px;
        line-height: 120%;
        color: white;
    }
    .personSrc ul li:hover{
        color: #42b983;
    }
    .personSrc ul li:active{
        margin-left: 31px;
        margin-right: -1px;
    }
</style>
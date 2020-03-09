<template>
    <div class="aLoginBtn undetermined">
        <div class="userHeader choice btn undetermined-img" v-if="logged" @mouseover="showChoices" @mouseleave="hideChoices">
            <img :src=header alt="">
            <div class="userChoice" v-if="choiceVisible">
<!--                <div @click="userQuit" style="color: white">注销</div>-->
                <ul>
                    <li @click="userQuit" class="btn">注销</li>
                </ul>
            </div>
        </div>
        <div class="loginBtn btn undetermined-text" @click="showWin" @change="change" v-else><slot></slot></div>
        <LoginOrRegister :show="show"/>
    </div>

</template>

<script>
    //登录按钮
    import LoginOrRegister from "./LoginOrRegister";

    export default {
        name: "LoginBtn",
        data() {
            return {
                show: false,
                choiceVisible: false,
                logged: false,
                header: '/static/imgs/head_default.jpg',
            }
        },
        components: {
            LoginOrRegister,
        },
        methods: {
            showWin() {
                this.show = true;
                //console.log(this.show);
            },
            change() {
                this.show = false;
            },
            loggedIn(){
                this.logged = true;
                this.header = this.$cookies.isKey('header') ?
                    this.$cookies.get('header') : '/static/imgs/head_default.jpg';
            },
            showChoices(){
                this.choiceVisible = true;
            },
            hideChoices(){
                this.choiceVisible = false;
            },
            userQuit(){
                this.$cookies.remove('user');
                this.$cookies.remove('username');
                this.$cookies.remove('header');
                //console.log(this.$cookies.isKey('user'));
                this.header = '/static/imgs/head_default.jpg';
                this.logged = false;
                this.$router.go(0);
            },
        },
        mounted() {
            this.logged = this.$cookies.isKey('user');
            this.header = this.$cookies.isKey('header') ?
                this.$cookies.get('header') : '/static/imgs/head_default.jpg';
        },
        computed:{
            // header:{
            //     get(){
            //         if(this.$cookies.isKey('header'))
            //             return this.$cookies.get('header');
            //         return '/static/imgs/head_default.jpg';
            //     },
            //     set(){
            //
            //     }
            // },
            // logged:{
            //     get(){
            //         return this.$cookies.isKey('user');
            //     },
            //     set(){
            //
            //     }
            // },

        }
    }
</script>

<style scoped>
    .userHeader {
        width: 50px;
        height: 50px;
        margin-top: 10px;
        position: relative;
    }
    .userHeader img{
        width: 100%;
        height: 100%;
        border-radius: 50%;


    }
    .userChoice{
        width: 80px;
        height: 30px;
        position: relative;
        left: -15px;
        top: -20px;
        z-index: 110000;
        background-color: black;
        border-radius: 4px;
    }
    .userChoice ul{
        font-size: 16px;
        color: white;
    }
    .userChoice ul li{
        list-style: none;
        width: 80px;
        height: 30px;
        /*background-color: red;*/
        line-height: 28px;
        float: left;
        text-align: center;
    }
</style>
<template>
    <div id="app">
        <div class="headCol">
            <div class="header">
                <div class='left logo btn'></div>
                <div class='left choice btn'><router-link to='/'>发现音乐</router-link></div>
                <div class='left choice btn'><router-link to='/person'>我的音乐</router-link></div>
                <div class='left choice btn'><router-link to='/client'>下载客户端</router-link></div>
<!--                <div class='left choice btn'><router-link :to='{name: "person"}'>VIP中P</router-link></div>-->

                <LoginBtn>登录</LoginBtn>
            </div>
        </div>

        <router-view></router-view>

        <Player></Player>

    </div>
</template>

<script>
    import Player from "./components/home/Player";
    import LoginBtn from "./components/LoginBtn";
    export default {
        name: 'App',
        components:{
            LoginBtn,
            Player,
        },
        mounted() {

        },
    }

</script>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    body::-webkit-scrollbar{
        width:0;
    }
    a{
        text-decoration: none;
    }
    .hide-font{
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        /*color: red;*/
        /*width: 900px;*/
    }
    .headCol{
        width: 100%;
        height: 75px;
        background-color: rgb(50, 50, 50);
        margin: 0 auto;
    }
    .header{
        width: 900px;
        height: 100%;
        /*background-color: aqua;*/
        margin: 0 auto;
    }
    .left {
        float: left;
    }
    .right{
        float: right;
    }
    .headCol .logo {
        height: 46px;
        width: 170px;
        background: url("/static/imgs/qq_logo.png") no-repeat;
        background-size: 100% 100%;
        margin-top: 14px;
    }

    .headCol .choice {
        height: 100%;
        line-height: 72px;
        font-size: 18px;
        color: white;
        margin: 0 20px;
    }

    .headCol a:link {
        font-size: 18px;
        color: rgb(255, 255, 255);
        text-decoration: none;
    }

    .headCol a:visited {
        font-size: 18px;
        color: rgb(255, 255, 255);
        text-decoration: none;
    }

    .headCol a:hover {
        font-size: 18px;
        color: rgb(66,200,131);
        text-decoration: none;
    }

    #loginBtn:hover{
        color: rgb(66,185,131);
    }

    .btn:hover{
        cursor: pointer;
    }

    .not-select{
        -moz-user-select:none;/*火狐*/
        -webkit-user-select:none;/*webkit浏览器*/
        -ms-user-select:none;/*IE10*/
        -khtml-user-select:none;/*早期浏览器*/
        user-select:none;
    }
    .header .undetermined-img{
        float:right;
    }
    .header .undetermined-text{
        float: right;

        height: 100%;
        line-height: 72px;
        font-size: 18px;
        color: white;
        margin: 0 20px;
    }
</style>

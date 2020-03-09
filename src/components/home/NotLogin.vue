<template>
    <div class="desert not-select">
        <div class="person-tips">
            <div class="text-tips">私人音乐空间, 听我想听的歌</div>
<!--            <div class="loginBtnArea">-->
<!--                <LoginBtn>登录ba</LoginBtn>-->
<!--            </div>-->
        </div>
    </div>
</template>

<script>
    //未登录跳转页面
    import LoginBtn from "../LoginBtn";
    export default {
        name: "NotLogin",
        data(){
            return{
                inspector: null,
            }
        },
        components:{
            LoginBtn,
        },
        mounted() {
            // clearInterval(this.inspector);
            // this.inspector = setInterval(function(){
            //     if(this.$cookies.isKey('user')){
            //         this.$router.push({path: '/person'});
            //     }
            // }.bind(this), 1000);
        }
    }
</script>

<style scoped>
    .desert{
        width: 100vw;
        height: 98vh;
        background: url("/static/imgs/bg_profile_unlogin.jpg") no-repeat;
        background-size: cover;
        /*position: relative;*/


    }
    .person-tips{
        width: 700px;
        height: 200px;
        /*position: absolute;*/
        /*background-color: red;*/
        margin: 0 auto;
        transform: translateY(120px);

        animation-name: my-tips;
        animation-duration: 1.5s;
        animation-timing-function: ease-out;
        /*animation-fill-mode: forwards;*/
    }
    .person-tips .text-tips{
        height: 50%;
        width: 100%;
        margin: 0 auto;
        text-align: center;
        font-size: 48px;
        color: white;
    }
    @keyframes my-tips {
        from{transform: translateY(210px);opacity: 0;}
        to{transform: translateY(120px);opacity: 1;}
    }
    /*.person-tips .loginBtnArea{*/
    /*    width: 120px;*/
    /*    height: 40px;*/
    /*    !*background-color: green;*!*/
    /*    border: 1px solid;*/
    /*    margin: 10px auto;*/
    /*}*/
    /*.loginBtnArea .undetermined{*/
    /*    width: 100%;*/
    /*    height: 100%;*/
    /*    background-color: gray;*/
    /*}*/
    /*.loginBtnArea .undetermined-text{*/
    /*    width: 100%;*/
    /*    height: 40px;*/
    /*    background-color: #42b983;*/
    /*    text-align: center;*/


    /*    !*color: red;*!*/
    /*}*/
    /*.loginBtnArea .undetermined-img{*/
    /*    display: none;*/
    /*}*/
</style>
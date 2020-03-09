<template>
    <div class="login" v-if=show>
        <div class="loginBox">
            <div class="quit btn" @click=closeLoginBox()>
                <img src="/static/imgs/quit.png" alt="">
            </div>

            <div class="loginInputBox" v-if="state">
                <div class="title">账号密码登录</div>
                <input type="text" class="username" placeholder="账号名" v-model="username">
                <input type="password" class="password" placeholder="密码" v-model="password">
                <div class="confirm-login btn confirm not-select" @click="nowLogin()">登 录</div>
                <div class="tip-login" v-html="tipsLogin"></div>
            </div>

            <div class="loginInputBox" v-else>
                <div class="title">新用户注册</div>
                <input type="text" class="newUserName" placeholder="账号名" v-model="newUsername">
                <input type="password" class="newPassword" placeholder="密码" v-model="newPassword">
                <input type="password" class="newPasswordOther" placeholder="再次输入密码" v-model="newPasswordOther">
                <div class="confirm-reg btn confirm not-select" @click="nowRegister()">注 册</div>
                <div class="tip-register" v-html="tipsRegister"></div>
            </div>

            <div class="login-or-register btn not-select" @click="loginOrRegister()">{{buttonText}}</div>
        </div>
    </div>
</template>

<!--<script src></script>-->
<script>
    //登录界面
    export default {
        name: "LoginOrRegister",
        data() {
            return {
                //show: false,
                state: true,  //true-登录   false-注册
                username: '',
                password: '',
                newUsername: '',
                newPassword: '',
                newPasswordOther: '',
                tipsLogin: '',
                tipsRegister: '',
                buttonText: '注册账号'
            }
        },
        props: ['show'],
        mounted() {
        },
        methods: {
            closeLoginBox() {
                //this.show = false;

                //console.log('click');
                this.clearTips();
                this.username = '';
                this.password = '';
                this.newUsername = '';
                this.newPassword = '';
                this.newPasswordOther = '';

                this.$parent.change();
            },
            clearTips() {
                this.tipsRegister = '';
                this.tipsLogin = '';
            },
            loginOrRegister() {
                this.state = !this.state;
                if (this.state) {
                    this.buttonText = '注册账号';
                } else {
                    this.buttonText = '直接登录';
                }

                this.clearTips();
            },

            nowLogin() {
                if (this.username.length === 0 || this.password.length === 0) {
                    this.tipsLogin = '<p>*请输入用户名和密码</p>';
                    return;
                }
                let param = new URLSearchParams();
                param.append('us', this.username);
                param.append('pw', this.password);
                this.$axios.post('/db/login/', param)
                    .then(response => {
                        let res = response.data;
                        // let errorInfo = '';
                        if (res['result'] === 'false') {
                            if (res['errorInfo'] === 'WrongPW') {
                                this.tipsLogin = '<p>*密码错误</p>';
                            } else if (res['errorInfo'] === 'NotExist') {
                                this.tipsLogin = '<p>*用户名不存在</p>';
                            }
                        } else {
                            //console.log(res);
                            this.$cookies.remove('user');
                            this.$cookies.remove('username');
                            this.$cookies.remove('header');

                            this.$cookies.set('user', res['id']);
                            this.$cookies.set('username', res['username']);
                            this.$cookies.set('header', res['header']);

                            this.closeLoginBox();
                            this.$parent.loggedIn();
                            this.$router.go(0);
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })

            },
            nowRegister() {
                let errorInfo = '';
                if (this.newUsername.length === 0) {
                    errorInfo += '<p>*用户名不能为空</p>';
                }
                if (this.newUsername.includes(' ')) {
                    errorInfo += '<p>*用户名不能包含空格</p>';
                }
                if (this.newPassword !== this.newPasswordOther) {
                    errorInfo += '<p>*两次输入的密码不相同</p>';
                }
                if (this.newPassword.length < 6) {
                    errorInfo += '<p>*密码长度不能小于6</p>';
                }
                if (this.newPassword.includes(' ')) {
                    errorInfo += '<p>*密码不能包含空格</p>';
                }
                if (errorInfo) {
                    this.tipsRegister = errorInfo;
                }

                if(errorInfo)
                    return;

                let param = new URLSearchParams();
                param.append('name', this.newUsername);
                param.append('password', this.newPassword);
                this.$axios.post('/db/register/', param)
                    .then(response => {
                        let res = response.data;
                        if(res['result']){
                            this.$cookies.set('user', res['id']);
                            this.$cookies.set('username', res['username']);
                            this.$cookies.set('header', res['header']);
                            this.$router.go(0);
                        }else{
                            errorInfo += '<p>*注册失败，请更改用户名</p>';
                            this.tipsRegister = errorInfo;
                        }
                    })
            },

        }
    }


</script>

<style scoped>
    .login {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(50, 120, 50, 0.5);
        z-index: 1000000;
        /*display: none;*/
    }

    .loginBox {
        position: fixed;
        height: 400px;
        width: 600px;

        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto auto;
        background-color: white;

    }

    .quit {
        height: 30px;
        width: 30px;
        background-color: gray;
        position: absolute;
        top: 0;
        right: 0;
    }

    .quit:hover {
        background-color: rgb(200, 50, 50);
    }

    .quit img {
        width: 100%;
        height: 100%;
    }


    .loginInputBox {

        width: 200px;
        height: 300px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: 80px auto;
        background-color: white;
        box-sizing: border-box;
        /*padding: 5px;*/
    }

    .loginInputBox .title {
        font-size: 24px;
        margin-bottom: 20px;
        text-align: center;
    }

    .loginInputBox input {
        width: 178px;
        height: 24px;
        margin: 10px 9px;
    }

    .confirm {
        width: 180px;
        height: 28px;
        margin: 10px 10px;
        text-align: center;
        line-height: 180%;
        background-color: #42b983;
        box-sizing: border-box;


        /*border: 1px outset;*/
    }

    .confirm:active {
        padding-left: 3px;
    }

    .login-or-register {
        width: 80px;
        height: 20px;
        /*background-color: #42b983;*/
        position: absolute;
        right: 30px;
        bottom: 30px;
        font-size: 18px;
    }

    .login-or-register:hover {
        font-size: 20px;
        color: #42b983;

    }

    .login-or-register:active {
        right: 29px;
    }

    .tip-login, .tip-register {
        width: 180px;
        height: 50px;
        margin: 10px 10px;
        color: red;
        font-size: 14px;
    }
</style>
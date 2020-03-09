<template>
    <div class="create-sheet">
        <div class="top-btn btn" @click="show=true">创建歌单</div>
        <div class="control-area" v-if="show">
            <div class="create-sheet-box">
                <div class="box-title">创建新歌单</div>
                <div class="quit btn" @click="quitBox()"></div>
                <input type="text" maxlength="30" v-model="newName">
                <div class="tip-box">{{tip}}</div>
                <div class="quit-btn control-btn btn" @click="quitBox()">取 消</div>
                <div class="create-btn control-btn btn" @click="createNewSheet()">创 建</div>
            </div>
        </div>
    </div>
</template>

<script>
    //创建歌单
    export default {
        name: "CreateSheet",
        data(){
            return{
                show: false,
                newName: '',
                tip: '',
            }
        },
        methods:{
            quitBox(){
                this.show=false;
            },
            createNewSheet(){
                if(this.newName){
                    let param = new URLSearchParams();
                    param.append('userId', this.$cookies.get('user'));
                    param.append('name', this.newName);

                    this.$axios.post('/db/new-list/', param)
                    .then(response=>{
                        let res = response.data;
                        if(res['result']){

                            this.quitBox();
                            this.$router.go(0);
                        }else if(res['errorInfo'] === 'SheetExisted'){
                            this.tip = '*同名歌单已存在';
                        }
                    })
                }else{
                    this.tip = '*歌单名不能为空';
                }
            }
        },
    }
</script>

<style scoped>
    .top-btn{
        height: 32px;
        width: 120px;
        border: 1px solid rgb(230, 230, 230);
        border-radius: 4px;
        text-align: center;
        line-height: 200%;
        box-sizing: border-box;
    }
    .top-btn:active{
        padding-left: 2px;
    }

    .control-area{
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        /*background-color: #42b983;*/
        opacity: 0.92;
    }
    .control-area .create-sheet-box{
        height: 200px;
        width: 400px;
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        background-color: white;
        border-radius: 6px;
        /*opacity: 1;*/
    }
    .create-sheet-box .box-title{
        width: 200px;
        height: 24px;
        margin: 4px auto;
        text-align: center;
    }
    .create-sheet-box .quit{
        height: 30px;
        width: 30px;
        position: absolute;
        right: 0;
        top: 0;
        background: url("/static/imgs/quit_gray.png") no-repeat;
        background-size: cover;
    }
    .create-sheet-box .quit:hover{
        background: url("/static/imgs/quit_red.png") no-repeat;
        background-size: cover;
    }
    .create-sheet-box input{
        width: 220px;
        height: 24px;
        margin: 40px 90px 0;
    }
    .create-sheet-box .tip-box{
        width: 220px;
        height: 24px;
        margin: 10px 100px 0;
        /*text-align: center;*/
        font-size: 14px;
        color: red;
    }
    .create-sheet-box .control-btn{
        height: 30px;
        width: 80px;
        /*background-color: #42b983;*/
        border-radius: 4px;
        text-align: center;
        line-height: 180%;
        position: absolute;
        bottom: 10px;
        box-sizing: border-box;
    }
    .create-sheet-box .quit-btn{
        left: 100px;
        border: 1px solid rgb(180, 180, 180);
    }
    .create-sheet-box .create-btn{
        right: 100px;
        background-color: #42b983;
    }
</style>
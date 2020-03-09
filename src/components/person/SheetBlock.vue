<template>
    <div class="sheet-block">


        <div class="one-sheet" v-for="(item,index) in sheets">
            <div class="cover">
                <a :href="calcLink(item.id)"><img :src="item.cover" alt=""></a>
            </div>
            <div class="name hide-font">
                <a :href="calcLink(item.id)">{{item.name}}</a>
            </div>
        </div>
        <div style="width: 800px;height: 300px; float:left"></div>
    </div>
</template>

<script>
    //显示歌单列表，是歌单本身组成的列表
    export default {
        name: "SheetBlock",
        data(){
            return{
                sheets: [],
            }
        },
        props:['srcPath'],
        methods:{
            calcLink(id){
                return '/#/list/' + id;
            }
        },
        mounted() {

            let userId = this.$cookies.isKey('user') ? this.$cookies.get('user') : 0;
            let param = new URLSearchParams();
            param.append('userId', userId);
            this.$axios.post('/db/brief-list-person/', param)
            .then(response=>{
                let res= response.data;
                if(res['result']){
                    this.sheets = res['list'];
                }
            })

        }
    }
</script>

<style scoped>
    a{
        text-decoration: none;
        color: black
    }
    .sheet-block{
        width: 900px;
        height: auto;
        margin: 20px auto;
    }
    .one-sheet{
        width: 185px;
        height: 220px;
        /*background-color: red;*/
        float: left;
        margin: 10px 20px;
    }
    .one-sheet .cover{
        width: 100%;
        height: 185px;
    }
    .one-sheet .cover img{
        height: 100%;
        width: 100%;
        border-radius: 2px;
    }
    .one-sheet .name{
        height: 35px;
        width: 100%;
        text-align: center;
        font-size: 16px;
        line-height: 220%;
    }
</style>
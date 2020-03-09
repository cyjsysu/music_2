<template>
    <div class="singerDis">
        <div class="title">热门歌手</div>
        <div class="items">
<!--            <div class="item">-->
<!--                <div class="cover">-->

<!--                </div>-->
<!--                <div class="name">-->

<!--                </div>-->
<!--            </div>-->
            <div class="item" v-for="(singer,index) in singerInfo">
                <div class="cover">
                    <a :href="getLink(singer.id)"><img :src=singer.header alt=""></a>
                </div>
                <div class="name">
                    {{singer.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SingerDiscover",
        data(){
            return{
                singerInfo: [

                ]
            }
        },
        mounted() {
            this.$axios.get('/db/get-hot-singers/')
            .then(response=>{
                this.singerInfo = response.data['list']
            })
        },
        methods:{
            getLink(id){
                return '/#/singer/' + id;
            }
        }
    }
</script>

<style scoped>
    .title{
        height: 100px;
        width: 100%;
        /*background-color: #42b983;*/
        font-size: 34px;
        text-align: center;
        line-height: 140px;
        border-bottom: 0.5px solid black;
    }
    .singerDis{
        width: 900px;
        height: 220px;


    }
    .items{
        height: 100%;
        width: 100%;
        margin-top: 20px;
        /*background-color: #42b983;*/
    }
    .items .item{
        height: 220px;
        width: 180px;
        float: left;
        margin: 0 22.5px;
    }
    .items .item .cover{
        height: 180px;
        width: 100%;
    }
    .items .item .cover img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .items .item .name{
        height: 40px;
        width: 100%;
        text-align: center;
        line-height: 240%;
    }
</style>
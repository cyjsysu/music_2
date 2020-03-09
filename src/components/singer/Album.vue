<template>
    <div class="album-page">
        <div class="info">
            <div class="cover">
                <img :src="info.cover" alt="">
            </div>
            <div class="text-info">
                <div class="name">{{info.name}}</div>
                <div class="singer"><span>歌手：</span>{{info.singer}}</div>
                <div class="time"><span>发行时间：</span>{{info.time}}</div>
            </div>
        </div>

        <SongList :src-path='srcPath'></SongList>
    </div>
</template>

<script>
    //专辑页面，包括基本信息和包含歌曲
    import SongList from "../home/SongList";
    export default {
        name: "Album",
        data(){
            return{
                info: {
                    'cover': '/static/imgs/album_cover/0.jpg',
                    'name': '???',
                    'singer': '???',
                    'time': '???',
                },
            }
        },
        components:{
            SongList,
        },
        computed:{
            srcPath:function(){
                // console.log('/db/get-songs-in-an-album/' + this.$route.params.id);
                return '/db/get-songs-in-an-album/' + this.$route.params.id;
            }
        },
        mounted() {
            this.$axios.get('/db/get-an-album-info/' +  this.$route.params.id)
            .then(response=>{
                let res = response.data;
                if(res['result']){
                    this.info = res['info'];
                }
            })
        }
    }
</script>

<style scoped>
    .album-page{
        width: 900px;
        margin: 20px auto;

    }
    .info{
        width: 100%;
        height: 240px;
        /*background-color: red;*/
    }
    .info .cover{
        width: 240px;
        height: 240px;
        float: left;
    }
    .info .cover img{
        width: 100%;
        height: 100%;
        border-radius: 4px;
    }
    .info .text-info{
        width: 660px;
        height: 100%;
        float: left;
        box-sizing: border-box;
        padding: 40px 20px 0 60px;
        /*background-color: blue;*/
    }
    .info .text-info span{
        color:gray;
    }
    .info .text-info .name{
        width: 100%;
        font-size: 30px;
        /*background-color: red;*/
    }
    .info .text-info .singer{
        margin-top: 20px;
        font-size: 18px;
    }
    .info .text-info .time{
        margin-top: 20px;
        font-size: 18px;
    }
</style>
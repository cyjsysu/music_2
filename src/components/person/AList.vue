<template>
    <div class="a-list">

        <div class="info">
            <div class="cover">
                <img :src="info.cover" alt="">
            </div>
            <div class="text-info">
                <div class="name">{{info.name}}</div>
                <div class="creator"><span>创建者: </span>{{info.creator}}</div>
                <div class="public-control"></div>
            </div>
        </div>

        <SongList :src-path="srcPath"></SongList>
    </div>
</template>

<script>
    //歌单详细页，包含歌曲
    import SongList from "../home/SongList";
    export default {
        name: "AList",
        data(){
            return{
                info: [],
            }
        },
        components:{
            SongList,
        },
        mounted() {
            let param = new URLSearchParams();
            param.append('listId', this.$route.params.id);
            this.$axios.post('/db/get-sheet-brief-info/', param)
            .then(response=>{
                this.info = response.data['info']
            })
        },
        computed:{
            srcPath:function () {
                console.log('/db/song-in-list/' + this.$route.params.id);
                return '/db/song-in-list/' + this.$route.params.id;
            }
        }
    }
</script>

<style scoped>
    .a-list{
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

    }
    .info .text-info .name{
        width: 100%;
        /*height: 40px;*/
        /*background-color: #42b983;*/
        font-size: 30px;
    }
    .info .text-info .creator{
        width: 100%;
        margin-top: 20px;
        font-size: 18px;
    }
    .info .text-info .creator span{
        color: gray;
    }
    .info .text-info .public-control{

    }
</style>
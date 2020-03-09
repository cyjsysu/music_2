<template>
    <div class="singer-page">
        <div class="singer-info">
            <div class="cover">
                <img :src=singerInfo.cover alt="">
            </div>
            <div class="introduction">
                <div class="name">{{singerInfo.name}}</div>
                <div class="nationality">{{singerInfo.nationality}}</div>
                <div class="birth-date">{{singerInfo.birth}}</div>
                <div class="brief-info">{{singerInfo.info}}</div>
            </div>
        </div>
        <div class="singer-songs">
            <SongList :src-path="calcSongSrc()"></SongList>
        </div>
    </div>
</template>

<script>
    import SongList from "../home/SongList";

    export default {
        name: "SingerPage",
        data() {
            return {
                singerInfo: {},

            }
        },
        components: {
            SongList,
        },
        methods: {
            calcPath(prefix, id) {
                console.log(prefix + id);
                return prefix + id;
            },
            calcSongSrc(){
                return '/db/singersongs/' + this.$route.params.id;
            }
        },
        mounted() {
            // let param = new URLSearchParams();
            // param.append('singerId', '2');
            console.log('/db/singerinfo/' + this.$route.params.id);
            this.$axios.get('/db/singerinfo/' + this.$route.params.id)
                .then(response => {
                    let res = response.data['result'];
                    //console.log(res);
                    this.singerInfo = res;
                })
        }
    }
</script>

<style scoped>
    .singer-page {
        width: 900px;
        margin: 20px auto;
    }

    .singer-info {
        width: 100%;
        height: 300px;
        /*background-color: red;*/
    }

    .singer-info .cover {
        height: 300px;
        width: 300px;
        float: left;
        /*background-color: #42b983;*/
    }

    .singer-info .cover img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .introduction {
        width: 600px;
        height: 100%;
        float: left;
        /*background-color: red;*/
        box-sizing: border-box;
        padding: 30px 50px;
    }

    .introduction div {
        margin: 20px 0;
    }

    .introduction .name {
        font-size: 24px;
        font-weight: bold;
    }

    .introduction .nationality {
        color: gray;
    }
    .introduction .birth-date{

    }
    .introduction .brief-info {
        font-size: 18px;
    }
</style>
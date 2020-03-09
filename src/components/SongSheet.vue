<template>
    <div id="songSheet">
        <div class="title">为你推荐</div>
        <Banner :coverInfo="coverInfo"></Banner>
    </div>
</template>

<script>
    import Banner from "./Banner";

    export default {
        name: "SongSheet",

        components: {
            Banner,
        },
        data() {
            return {

                coverInfo:[],
            }

        },
        mounted() {
            this.$axios.get('/db/get-recommend-song-list/')
            .then(response=>{
                this.coverInfo = response.data['list'];
            })
        }
    }
</script>

<style scoped>
    #songSheet {
        width: 900px;

    }

    .title {
        height: 100px;
        width: 100%;
        /*background-color: #42b983;*/
        font-size: 34px;
        text-align: center;
        line-height: 140px;
        border-bottom: 0.5px solid black;
    }
</style>
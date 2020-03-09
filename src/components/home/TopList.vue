<template>

<SongList src-path="/db/top/"/>
</template>

<script>
    //排行榜
    import SongList from "./SongList";
    export default {
        name: "TopList",
        components: {SongList},
        templates:{
            SongList,
        },
        mounted() {

        },
        created() {
            this.$on('get_a_song', song=>{
                alert(song);
            });
        }
    }
</script>

<style scoped>


    .topThree {
        color: red;
        font-weight: bold;
    }



</style>
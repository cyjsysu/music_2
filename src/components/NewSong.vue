<template>
    <div class="newSong">
        <div class="title">新歌首发</div>
        <ToggleShow></ToggleShow>

    </div>
</template>

<script>
    import ToggleShow from "./ToggleShow";
    export default {
        name: "NewSong",
        components: {
            ToggleShow,
        },

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
</style>
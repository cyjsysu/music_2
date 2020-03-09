<template>
    <div id="discover">

        <router-view name="carousel"></router-view>
        <router-view name="sheet"/>
        <router-view name="songs"></router-view>
        <router-view name="singers"></router-view>
        <div style="width: 100%;height: 300px"></div>
    </div>

    <!--    <router-view name="singer"/>-->
</template>

<script>
    //发现页
    import Test from "./Test";

    export default {
        name: "Discover",
        data() {
            return {
                abc: "rng",
                cl: "ig"
            }
        },
        components: {
            Test,
        },
        mounted() {

        }
    }


</script>

<style scoped>
    #discover {
        width: 900px;
        margin: 0 auto;
    }
</style>
<template>
    <div id='navigation'>

        <div class='navRow'>
            <div class='navCol'><router-link to="/">推荐</router-link></div>
            <div class='navCol'><router-link to="/toplist">排行榜</router-link></div>
            <div class='navCol'><router-link to="/singers">歌手</router-link></div>
            <div class='navCol'><router-link to='/all-list'>歌单</router-link></div>
        </div>

        <router-view></router-view>

    </div>
</template>

<script>
    //主页导航
    export default {
        name: "HomePage"
    }
</script>

<style scoped>
    #navigation {
        width: 100%;
        height: 40px;
        background-color: rgb(66,185,131);
    }

    .navRow {
        width: 800px;
        height: 100%;
        margin: 0 auto;
    }

    .navCol {
        line-height: 36px;
        float: left;
        font-size: 16px;
        color: white;
        margin-left: 120px;
    }
    .navCol:active{
        margin-left: 121px;
        margin-right: -1px;
    }
    #navigation a:link {
        color: rgb(255, 255, 255);
        text-decoration: none;
    }

    #navigation a:visited {
        color: rgb(255, 255, 255);
        text-decoration: none;
    }

    #navigation a:hover {
        color: rgb(255, 255, 255);
        text-decoration: none;
    }
/*    */

</style>
<template>
    <div class="my-sheet">
        <div class="controlBar not-select">
<!--            <div class="topBtn btn" @click="createSheet">创建歌单</div>-->
            <CreateSheet></CreateSheet>
        </div>
        <SheetBlock src-path="/db/brief-list-person/"></SheetBlock>
    </div>
</template>

<script>
    //我的全部歌单
    import SheetBlock from "./SheetBlock";
    import CreateSheet from "./CreateSheet";
    export default {
        name: "MySheet",
        components:{
            SheetBlock,
            CreateSheet,
        },
        data(){
            return{

            }
        },
        methods:{
            createSheet(){

            }
        }
    }
</script>

<style scoped>
    .my-sheet{
        width: 900px;
        margin: 30px auto;

    }
    .controlBar{
        width: 900px;
        height: 32px;
        /*background-color: red;*/
        box-sizing: border-box;
        margin: 0 auto;
        padding-left: 40px;
    }
    /*.controlBar .topBtn{*/
    /*    height: 100%;*/
    /*    width: 120px;*/
    /*    border: 1px solid rgb(230, 230, 230);*/
    /*    border-radius: 4px;*/
    /*    text-align: center;*/
    /*    line-height: 200%;*/
    /*    box-sizing: border-box;*/
    /*}*/
    /*.controlBar .topBtn:active{*/
    /*    padding-left: 2px;*/
    /*}*/

</style>
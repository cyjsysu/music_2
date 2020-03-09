<template>
<!--    get-all-list/-->
    <div class="all-lists">
        <SheetBlock src-path="/db/get-all-list/"></SheetBlock>
    </div>

</template>

<script>
    //所有歌单
    import SheetBlock from "../person/SheetBlock";
    export default {
        name: "AllSheet",
        components:{
            SheetBlock,
        }
    }
</script>

<style scoped>
    .all-lists{
        width: 900px;
        margin: 30px auto;
    }
</style>
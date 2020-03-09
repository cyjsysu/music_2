<template>
    <div id="personalPage">
        <PersonBG/>
        <router-view :src-path="favorSrc"></router-view>
    </div>
</template>

<script>
    import PersonBG from "./person/PersonBG";
    export default {
        name: "PersonalPage",
        components:{
            PersonBG,
        },
        data(){
            return{
                favorSrc: '/db/mylove/',
                listSrc: '/db/newshhet/',
            }
        },
        methods:{


        },
        mounted() {
            // this.changeShow(0)
        }
    }
</script>

<style scoped>

</style>
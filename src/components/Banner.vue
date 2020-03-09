<template>
    <div class="banner">
        <!--        <div class="items">-->
        <div class="show">
            <ul class="items">
                <li v-for="(item,index) in coverInfo">
                    <div class="cover"><a :href="getLink(item.id)"><img :src=item.cover alt=""></a></div>
                    <div class="name"> {{item.name}}</div>
                </li>
                <li v-for="(item,index) in coverInfo">
                    <div class="cover"><a :href="getLink(item.id)"><img :src=item.cover alt=""></a></div>
                    <div class="name"> {{item.name}}</div>
                </li>

            </ul>
        </div>


        <div class="button atLeft" @click="slideToLeft">
            <img src="/static/imgs/toLeft.png" alt="">
        </div>
        <div class="button atRight" @click="slideToRight">
            <img src="/static/imgs/toRight.png" alt="">
        </div>
    </div>
</template>

<script>
    // import deformation from "../js/aniFun";
    export default {
        name: "Banner",
        data(){
            return{
                timer: null,
            }
        },
        props: ['coverInfo',],
        mounted() {
            this.setTimer();
        },
        created() {

        },
        beforeDestroy() {
            clearInterval(this.timer);
        },
        methods:{
            getLink(id){
                return '/#/list/' + id;
            },
            setTimer(){
                clearInterval(this.timer);
                this.timer = setInterval(function () {
                    this.slideToLeft();

                }.bind(this), 4000);
            },
            slideToLeft(){
                clearInterval(this.timer);

                let oItems = $('.items');
                let offsetX = oItems.css('left');
                // console.log(offsetX);
                let toLeft = 0;
                if(offsetX === '0px'){
                    toLeft = -900;
                }else if(offsetX === '-900px'){
                    toLeft = -1800;
                }else if(offsetX === '-1800px'){
                    toLeft = -900;
                    oItems.css('left', '0');
                }else if(offsetX === '-2700px'){
                    toLeft = -1800;
                    oItems.css('left', '-900px');
                }
                // console.log(toLeft);
                oItems.animate({'left': toLeft+'px'}, "slow");

                this.setTimer();
            },
            slideToRight(){

                clearInterval(this.timer);

                let oItems = $('.items');
                let offsetX = oItems.css('left');
                // console.log(offsetX);
                let toLeft = 0;
                if(offsetX === '0px'){
                    toLeft = -900;
                    oItems.css('left', '-1800px');
                }else if(offsetX === '-900px'){
                    toLeft = 0;
                }else if(offsetX === '-1800px'){
                    toLeft = -900;
                    // oItems.css('left', '0');
                }else if(offsetX === '-2700px'){
                    toLeft = -1800;
                    // oItems.css('left', '-900px');
                }
                // console.log(toLeft);
                oItems.animate({'left': toLeft+'px'}, "slow");

                this.setTimer();
            },
        },
    }


</script>

<style scoped>
    .banner {
        margin-top: 20px;
        width: 900px;
        height: 220px;
        position: relative;
        /*background-color: #42b983;*/
        /**/
    }

    .banner .show {
        width: 900px;
        height: 220px;
        overflow: hidden;
        position: relative
    }

    .banner ul {
        position: absolute;
        left: 0;
        width: 3600px;
        height: 220px;

    }

    .banner ul li {
        width: 180px;
        height: 100%;
        margin: 0 22.5px;
        /*background-color: red;*/
        overflow: hidden;
        float: left;
        /*position: absolute;*/
    }

    .banner .cover {
        width: 180px;
        height: 180px;

    }

    .banner .cover img {
        width: 100%;
        height: 100%;
    }

    .banner .name {
        width: 180px;
        height: 40px;
        /*background-color: blueviolet;*/
        font-size: 15px;
        text-align: center;
        line-height: 220%;
    }

    .banner .button {
        width: 50px;
        height: 80px;
        position: absolute;

        background-color: rgba(180, 180, 180, 0.2);
        border-radius: 6px;
        /*opacity: 0.4;*/
    }

    .banner .button:hover {
        background-color: rgba(180, 180, 180, 0.6);
    }

    .banner .atLeft {
        left: -50px;
        top: 60px;

    }

    .banner .atRight {
        left: 900px;
        top: 60px;

    }

    .banner .button img {
        width: 100%;
        height: 100%;
    }
</style>
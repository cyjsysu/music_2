<template>
    <div class="carousel">
        <div class="slide">
            <div class="item" v-for="(item,index) in objs" v-show="index===curIndex">
                <a :href="item.link">
                    <img :src="item.cover" :alt="item.info">
                </a>
            </div>
        </div>
        <div class="trigger">

            <span v-for="(item,index) in otherList" :class="{on:index===curIndex}" @click="resetIndex(index)"></span>
        </div>
    </div>
</template>

<script>
    // 轮播图
    export default {
        name: "Carousel",
        data(){
            return {
                maxZ: 1,
                timer: null,
                curIndex: 0,
                otherList: [0,1,2,3,4],
                objs: [
                    {
                        'cover': "/static/imgs/eason_1.jpg",
                        'info': '陈奕迅',
                        'link': '/#/singer/1',
                    },
                    {
                        'cover': "/static/imgs/gem_1.jpg",
                        'info': '邓紫棋',
                        'link': '/#/singer/6',
                    },
                    {
                        'cover': "/static/imgs/小黄人.jpg",
                        'info': '小黄人',
                        'link': '/#/list/1',
                    },
                    {
                        'cover': "/static/imgs/jj_1.jpg",
                        'info': '林俊杰',
                        'link': '/#/singer/2',
                    },
                    {
                        'cover': "/static/imgs/zhjian_1.jpg",
                        'info': '周华健',
                        'link': '/#/singer/4',
                    },

                ],
            }
        },
        mounted() {
           // var carouselObj = new Carousel();
            this.resetTimer();
        },
        methods:{
            resetIndex(index){
                clearInterval(this.timer);
                this.curIndex = index;
                this.resetTimer();
            },
            resetTimer(){
                clearInterval(this.timer);
                this.timer = setInterval(function(){
                    this.curIndex = (this.curIndex + 1)%this.objs.length;
                }.bind(this), 3000);
            }
        },
        watch:{
            objs: function (val) {
                this.otherList = new Array(val.length).fill(0);
            }
        }
    }

</script>

<style scoped>
    .carousel {
        width: 900px;
        height: 338px;
        position: relative;
        /*margin: 0 auto;*/
    }

    .slide {
        width: 100%;
        height: 100%;
        position: absolute;
    }
    /*.slide div{*/
    /*    display: none;*/
    /*}*/
    /*.slide .cur-box{*/
    /*    display: block;*/
    /*}*/
    .slide .item {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 0;
    }

    .slide .item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .trigger {
        width: 30%;
        height: 20%;
        /*background-color: red;*/
        left: 75%;
        top: 88%;
        position: absolute;
        z-index: 100;
        /*2147483647*/
    }

    .trigger span {
        width: 8%;
        height:0;
        padding-bottom:8%;

        margin-right: 6%;
        background-color: white;
        border-radius: 50%;
        z-index: 2147483647;
        display: inline-block;
    }

    .trigger .on {
        background-image: url("/static/imgs/吃豆人.png");
        background-repeat: no-repeat;
        background-size: cover;
        background-color: transparent;
        transform: scale(1.8);
        /*background-color: red;*/
    }


</style>
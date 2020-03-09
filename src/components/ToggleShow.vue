<template>
    <div class="toggle">
        <div class="itemsBox">
            <div class="item" v-for="(item,index) in songInfo">
                <div class="cover">
                    <a :href="getLink(item.albumId)"><img :src=item.cover alt=""></a>

                </div>
                <div class="info">
                    <div class="name briefInfo">{{item.name}}</div>
                    <div class="intro briefInfo">{{item.albumName}}</div>
                </div>
            </div>
        </div>


        <div class="button foldBtn not-select btn" @click="changeShow">{{btnText}}</div>
    </div>
</template>

<script>
    //展开，收起
    import deformation from '../js/aniFun'

    export default {
        name: "ToggleShow",
        data() {
            return {
                songInfo: [

                ],
                buttonName: 'toggleBtn',
                show: false,

            }
        },
        mounted() {
            // var controller = new ShowController();
            this.$axios.get('/db/get-new-song-list/')
            .then(response=>{
                this.songInfo = response.data['list']
            })
        },
        computed: {
            btnText: function () {
                return this.show ? '收 起' : '展 开';
            }
        },
        methods: {
            getLink(id){
                return '/#/album/' + id;
            },
            unfold(){
                let toHeight = Math.ceil((this.songInfo.length/3)) * 120 + 'px';
                $('.toggle').animate({'height': toHeight}, 'slow');
            },
            fold(){
                $('.toggle').animate({'height': '120px'}, 'slow');
            },
            changeShow(){
                this.show = !this.show;
            }
        },
        watch:{
            show:function(newVal, oldVal){
                if(newVal){
                    this.unfold();
                }else{
                    this.fold();
                }
            },
        },
    }

    class ShowController {
        constructor() {
            this.init();
            this.show = false;
        }

        init() {
            var oButton = document.getElementsByClassName('foldBtn')[0];
            oButton.onclick = function () {
                if (this.show) {
                    this.fold();
                    oButton.innerHTML = '收 起';
                } else {
                    this.unfold();
                    oButton.innerHTML = '展 开';
                }
                this.show = !this.show;
            }.bind(this)
        }

        unfold() {

            var oToggle = document.getElementsByClassName('toggle')[0];
            var num = oToggle.getElementsByClassName('item').length;
            var toHeight = Math.ceil(num / 3) * 120;
            console.log(num, Math.ceil(num / 3));
            deformation(oToggle, {'height': toHeight});
        }

        fold() {
            var oToggle = document.getElementsByClassName('toggle')[0];
            var num = oToggle.getElementsByClassName('item').length;
            var toHeight = num > 0 ? 120 : 0;
            deformation(oToggle, {'height': toHeight});
        }
    }
</script>

<style scoped>
    .toggle {
        margin-top: 20px;
        width: 900px;
        /*border-bottom: solid 0.5px;*/
        height: 120px;
        /*background-color: #42b983;*/

        position: relative;
    }

    .itemsBox {
        height: 100%;
        width: 100%;
        overflow: hidden;
        position: relative;
    }

    .item {
        width: 300px;
        height: 100px;
        float: left;
        /*background-color: red;*/
        margin: 10px 0;

        /*position: relative;*/

    }

    .item .cover {
        width: 100px;
        height: 100px;
        float: left;
        /*background-color: blueviolet;*/
    }

    .item .cover img {
        width: 100%;
        height: 100%;
    }

    .item .info {
        width: 200px;
        height: 100px;
        float: left;
    }

    .item .info .name {
        width: 90%;
        height: 25%;
        margin-top: 25px;
        margin-left: 10px;
        /*background-color: blue;*/

        font-size: 20px;
    }

    .item .info .intro {
        width: 90%;
        height: 25%;
        margin-top: 10px;
        margin-left: 10px;
        color: rgb(150, 150, 150);
        /*background-color: blue;*/
    }

    .briefInfo {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .button {
        height: 30px;
        width: 90px;
        background-color: rgba(180, 180, 180, 0.2);
        position: absolute;
        left: 810px;
        top: -60px;
        border-radius: 6px;
        text-align: center;
        line-height: 200%;
    }

    .button:hover {
        background-color: rgba(180, 180, 180, 0.6);
    }
</style>
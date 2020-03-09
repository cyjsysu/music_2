<!--假设进入前一定已登录-->
<template>
    <div class="outer-box">
        <transition name="ani">
            <div class="add-song-box not-select" v-if="show">

                <div class="unfold">
                    <div class="unfold-btn btn" @click="$parent.closeWin()"></div>
                </div>
                <div class="control-area ">
                    <div class="song-name hide-font">{{songName}}</div>
                    <div class="lists-box">
                        <!--                歌单名，歌单id，是否已添加-->
                        <div class="list-name hide-font btn" v-for="(item,index) in lists"
                             :class="item.existed?'existedInList' : 'notExistedInList'" @click="chageList(item.listId)">{{item.listName}}
                        </div>
                        <!--                        <div class="list-name hide-font btn">我是超人</div>-->

                    </div>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>
    //添加歌曲到歌单
    export default {
        name: "AddSongToList",
        data() {
            return {
                lists: [],
            }
        },
        props: ['show', 'songName', 'songId'],
        methods: {
            reset() {
                let param = new URLSearchParams();
                param.append('userId', this.$cookies.get('user'));
                param.append('songId', this.songId);
                this.$axios.post('/db/get-lists/', param)
                    .then(response => {
                        let res = response.data;
                        //console.log(res['list']);
                        this.lists = res['list'];
                    })
            },
            chageList(listId) {
                let param = new URLSearchParams();
                param.append('listId', listId);
                param.append('songId', this.songId);
                this.$axios.post('/db/add-or-remove-song-from-list/', param)
                    .then(response => {
                        if (response.data['result']) {
                            console.log(response.data['result']);
                            this.reset();
                        }
                    })

            }
        },
        watch: {
            songId: function (val) {
                if (val > 0) {
                    this.reset();
                }
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .ani-enter, .ani-leave-to {
        transform: translateX(16vw);
    }

    .ani-enter-t0, .ani-leave {
        transform: translateX(0vw);
    }

    .ani-enter-active, .ani-leave-active {
        transition: transform .8s;
    }

    .add-song-box {
        position: fixed;
        width: 16vw;
        top: 0;
        right: 0;
        bottom: 0;
        /*background-color: #42b983;*/
        opacity: 0.9;
    }

    .add-song-box .unfold {
        height: 100%;
        width: 20px;
        /*background-color: blue;*/
        float: left;
        position: relative;
    }

    .add-song-box .unfold .unfold-btn {
        width: 100%;
        height: 80px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto auto;

        background: url("/static/imgs/unfold.png") no-repeat gray;
        background-size: 100% 100%;

        /*background-color: gray;*/
    }

    .add-song-box .control-area {
        height: 100%;
        width: calc(100% - 20px);
        float: left;
        background-color: rgb(200, 200, 200);
        box-sizing: border-box;
        padding-left: 8px;
    }

    .add-song-box .control-area .song-name {
        width: calc(100% - 10px);
        height: 50px;
        /*background-color: #42b983;*/
        margin-top: 50px;
        font-size: 28px;
        border-bottom: 1px solid white;

    }

    .add-song-box .control-area .lists-box {
        width: 100%;
        height: calc(100% - 100px);
        overflow-x: hidden;
        overflow-y: auto;
    }

    .lists-box .list-name {
        width: 100%;
        height: 40px;
        border-bottom: 0.5px solid rgb(180, 180, 180);
        font-size: 18px;
        line-height: 240%;

        box-sizing: border-box;
        transition: padding-left 0.4s ease-out;
    }

    .lists-box .list-name:hover {
        /*color: black;*/
        padding-left: 20px;

        transition: padding-left 0.4s ease-out;
    }

    .existedInList {
        color: black;
    }
    .notExistedInList{
        color: gray;
    }
</style>
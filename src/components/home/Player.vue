<template>
    <div id="player-blank" :style="'bottom:' + (lock?'0':'')" class="not-select">
        <audio id='player' :src="songPath" @timeupdate="updateTime" ref="audio"
               @durationchange="changeDuration" @volumechange="changeVolumeBtn" autoplay @ended="loadNextSong"></audio>
        <div class="songs-box" v-show="showList" :style="'bottom:' + (lock?'50px':'')">
            <div class="song-item" v-for="(item,index) in songs">
                <div class="song-info" @click="changeSong(index)">
                    <div class="song-name btn" :style="'color:' + (index===curIndex?'#42b983': 'white')">{{item.name}}
                    </div>
                    <div class="singer-name btn" :style="'color:' + (index===curIndex?'#42b983': 'white')">
                        {{item.singer}}
                    </div>
                </div>
                <div class="delete btn" @click="deleteSong(index)"><img src="/static/imgs/del.png" alt="移除"></div>
            </div>

        </div>

        <div class="player-area">
            <div class="button-area">
                <div class="player-btn btn" @click="preSong"><img src="/static/imgs/pre1.png" alt=""></div>
                <div class="player-btn btn" @click="playOrStop"><img :src="playBtnImg" alt=""></div>
                <div class="player-btn btn" style="margin-right: 0;" @click="nextSong"><img src="/static/imgs/next1.png"
                                                                                            alt=""></div>
            </div>

            <div class="bar-area">
                <div class="song-cover"><img :src="songCover" alt=""></div>
                <div class="song-name">{{songInfo}}</div>
                <div class="btn" id="outer-bar" @mousedown="setProgress">
                    <!--                    <div class="bg-bar">-->
                    <!--                        -->
                    <!--                    </div>-->
                    <div class="progress-bar">
                        <div class="progress-btn btn"></div>
                    </div>
                </div>
                <div class="progress-time">{{progressTime}}</div>
            </div>
            <div class="other-control-area">
                <div class="control-btn btn" @click="showVolumeControl" @mouseleave="hideVolumeControl">
                    <img src="/static/imgs/v1.png" alt="">
                    <div class="volume-control" v-show="showVolume">
                        <div class="volume-val">{{volumeVal}}</div>
                        <div class="volume-blue" id="volume" @mousedown="setVolume">
                            <div class="volume-btn"></div>
                            <div class="volume-gray"></div>
                        </div>
                    </div>
                </div>
                <div class="control-btn btn" @click="changeMode"><img :src="modeImg" alt=""></div>
                <div class="control-btn btn" @click="changeListState"><img src="static/imgs/list_btn_1.png" alt="">
                </div>
                <div class="control-btn btn" @click="changeLock"><img :src="lockImg" alt=""></div>
            </div>
        </div>
        <!--        </transition>-->
    </div>
</template>

<script>
    //播放器
    export default {
        name: "Player",
        data() {
            return {
                lock: true,
                songs: [],
                curTime: '00:00',
                allTime: '00:00',
                volumeVal: 100,
                showVolume: false,
                showList: false,
                // showAll: false,
                curIndex: 0,
                playMode: 0,
                // pickedItem:{
                //     color: '#42b983',
                // }
                lockImg: 'static/imgs/lock.png',
                playBtnImg: '/static/imgs/on1.png',
                modeImg: '/static/imgs/loop.png',
            }
        },
        mounted() {
            $(window).on('mouseup', function () {
                // console.log('##');
                $('.bar-area').off('mousemove', this.dragProgressBar);
                $('.volume-control').off('mousemove', this.dragVolumeBar);
            });
            $('.bar-area').on('mouseleave', function () {
                // console.log('$$');
                $('.bar-area').off('mousemove', this.dragProgressBar);
            });
            $('.volume-control').on('mouseleave', function () {
                $('.volume-control').off('mousemove', this.dragVolumeBar);
            });

            this.loadInfo();
        },
        watch: {
            '$store.state.song': function (newVal, oldVal) {
                // console.log('$$$', newVal);
                for (let i = 0; i < this.songs.length; i++) {
                    // console.log(this.songs[i].id , newVal['songId'], this.songs.id === newVal['songId']);
                    if (this.songs[i].id === newVal['songId']) {
                        this.curIndex = i;
                        return;
                    }
                }
                let newSong = {
                    'id': newVal['songId'],
                    'path': newVal['path'],
                    'cover': newVal['cover'],
                    'singer': newVal['singer'],
                    'name': newVal['songName'],
                };
                this.songs.push(newSong);
                this.curIndex = this.songs.length - 1;
                // console.log(this.songs, this.curIndex);
                // this.$store.commit('sendSong', {});

                this.playBtnImg = '/static/imgs/pause1.png';

            },
            '$store.state.songBatch': function (newVal, oldVal) {
                let newIndex = this.curIndex;
                for (let i = 0; i < newVal.length; i++) {
                    let flag = true;
                    for (let j = 0; j < this.songs.length; j++) {
                        // console.log(newVal[i]['songName'],newVal[i]['songId'] ,this.songs[i]['id'], newVal[i]['id'] === this.songs[i]['id'])
                        if (newVal[i]['songId'] === this.songs[j]['id']) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        let newSong = {
                            'id': newVal[i]['songId'],
                            'path': newVal[i]['path'],
                            'cover': newVal[i]['cover'],
                            'singer': newVal[i]['singer'],
                            'name': newVal[i]['songName'],
                        };
                        this.songs.push(newSong);
                        newIndex = this.songs.length - 1;
                    }
                }
                this.curIndex = newIndex;


                // this.playBtnImg = '/static/imgs/on1.png';

                this.playBtnImg = '/static/imgs/pause1.png';

                // console.log(this.songs)
            }
        },

        methods: {
            storeInfo(){
                let songsList = [];
                for(let i = 0;i<this.songs.length;i++){
                    songsList.push(JSON.stringify(this.songs[i]));
                }
                let obj = {
                    'list': JSON.stringify(songsList),
                    'index': this.curIndex,
                    // 'mode': this.playMode,
                };
                // console.log('$$', obj);
                obj = JSON.stringify(obj);
                localStorage.setItem("songs", obj);
                // let other = JSON.parse(obj);
                // console.log(other);
            },
            // storeMode()
            loadInfo(){
                // console.log(localStorage.getItem("songs"));
                let obj = JSON.parse(localStorage.getItem("songs"));
                // console.log('###', obj);
                if(obj){
                    let songsList = JSON.parse(obj['list']);
                    this.curIndex = obj['index'];
                    // this.playMode = obj['mode'];

                    for(let i = 0;i<songsList.length;i++){
                        this.songs.push(JSON.parse(songsList[i]));
                    }
                }
            },

            updateTime(e) {
                let curMinute = parseInt(e.target.currentTime / 60) + '';
                let curSecond = parseInt(e.target.currentTime % 60) + '';
                curMinute = curMinute.padStart(2, '0');
                curSecond = curSecond.padStart(2, '0');
                this.curTime = curMinute + ':' + curSecond;

                $('.progress-bar').css('width', parseInt(e.target.currentTime / e.target.duration * 100) + '%');
                $('.progress-btn').css('left', $('.progress-bar').css('width'));
            },
            playOrStop() {
                if (this.$refs.audio.paused) {
                    this.$refs.audio.play();
                    this.playBtnImg = '/static/imgs/pause1.png';
                } else {
                    this.$refs.audio.pause();
                    this.playBtnImg = '/static/imgs/on1.png';
                }
                // this.storeInfo();
            },
            setProgress(e) {
                if (e.button === 0) {
                    // console.log('#', e.pageX, $('#outer-bar').offset().left, $('#outer-bar').width());
                    this.$refs.audio.play();
                    $('.bar-area').on('mousemove', this.dragProgressBar);
                }
            },
            setVolume(e) {
                if (e.button === 0) {
                    $('.volume-control').on('mousemove', this.dragVolumeBar);
                }
            },
            dragProgressBar(e) {
                let curX = e.pageX;
                if (curX < $('#outer-bar').offset().left) {
                    curX = $('#outer-bar').offset().left;
                } else if (curX > $('#outer-bar').offset().left + $('#outer-bar').width()) {
                    curX = $('#outer-bar').offset().left + $('#outer-bar').width();
                }
                this.$refs.audio.currentTime = (curX - $('#outer-bar').offset().left) / $('#outer-bar').width() * this.$refs.audio.duration;
            },
            dragVolumeBar(e) {
                let curY = e.pageY - $('#volume').offset().top;
                // console.log(curY,$('#volume').offset().top, $('#volume').height());
                if (curY > $('#volume').height()) {
                    curY = $('#volume').height();
                } else if (curY < 0) {
                    curY = 0;
                }
                //console.log(this.$refs.audio.volume);
                this.$refs.audio.volume = 1 - (curY / $('#volume').height());
            },
            changeDuration(e) {
                let curMinute = parseInt(e.target.duration / 60) + '';
                let curSecond = parseInt(e.target.duration % 60) + '';
                curMinute = curMinute.padStart(2, '0');
                curSecond = curSecond.padStart(2, '0');
                this.allTime = curMinute + ':' + curSecond;

                this.storeInfo();
            },
            changeVolumeBtn(e) {
                this.volumeVal = parseInt(this.$refs.audio.volume * 100);
                // console.log(this.$refs.audio.volume)
                $('.volume-gray').css('height', 100 - this.volumeVal + '%');
                $('.volume-btn').css('top', $('.volume-gray').height() + 28 + 'px');
            },
            showVolumeControl() {
                this.showVolume = true;
            },
            hideVolumeControl() {
                this.showVolume = false;
            },
            deleteSong(index) {
                if(this.songs.length === 1){
                    this.curIndex = 0;
                }else if (this.curIndex > index) {
                    this.curIndex--;
                }else if(this.curIndex === index && this.curIndex === this.songs.length - 1){
                    this.curIndex = 0;
                }
                this.songs.splice(index, 1);
            },
            changeSong(index) {
                this.curIndex = index;
            },
            changeListState() {
                this.showList = !this.showList;
            },
            changeLock() {
                this.lock = !this.lock;
                if (this.lock) {
                    this.lockImg = 'static/imgs/lock.png';
                } else {
                    this.lockImg = 'static/imgs/unlock.png';
                }
            },
            changeMode() {
                this.playMode = (this.playMode + 1) % 3;
                if (this.playMode === 0) {
                    //列表循环
                    this.modeImg = '/static/imgs/loop.png';
                } else if (this.playMode === 1) {
                    //随机
                    this.modeImg = '/static/imgs/random.png';
                } else {
                    //单曲循环
                    this.modeImg = '/static/imgs/only_one.png';
                }
            },
            loadNextSong() {
                if (this.playMode === 0) {
                    //列表循环
                    this.curIndex = (this.curIndex + 1) % this.songs.length;
                } else if (this.playMode === 1) {
                    //随机
                    let newIndex = Math.floor(Math.random() * this.songs.length);
                    console.log(newIndex);
                    if (newIndex === this.curIndex) {
                        this.loadNextSong();
                    } else {
                        this.curIndex = newIndex;
                    }
                } else {
                    //单曲循环
                    this.$refs.audio.load();
                }
            },
            preSong() {
                if (this.songs.length) {
                    if (this.curIndex === 0) {
                        this.curIndex = this.songs.length - 1;
                    } else {
                        this.curIndex--;
                    }
                }
            },
            nextSong() {
                if (this.songs.length) {
                    this.curIndex = (this.curIndex + 1) % this.songs.length;
                }
            }
        },
        computed: {
            progressTime: function () {
                return this.curTime + ' / ' + this.allTime;
            },
            songPath: function () {
                // console.log('##', this.songs , this.curIndex);
                try {
                    return '/static/music/' + this.songs[this.curIndex]['path'];
                } catch (e) {
                    return '';
                }

            },
            songInfo: function () {
                try {
                    return this.songs[this.curIndex]['name'] + ' -- ' + this.songs[this.curIndex]['singer'];
                } catch (e) {
                    return '';
                }
            },
            songCover: function () {
                try {
                    return this.songs[this.curIndex]['cover'];
                } catch (e) {
                    return '';
                }
            },

        },

    }
</script>

<style scoped>
    #player-blank {
        z-index: 10000;
        width: 100vw;
        height: 50px;
        background-color: rgb(50, 50, 50);
        position: fixed;
        bottom: -46px;
        /*bottom: -48px;*/
        left: 0;
        /*right: 0;*/
        /*margin: auto auto;*/
        transition: bottom 0.4s ease-out;
        /*border-top: 2px ridge rgb(50,50,50);*/
        box-sizing: border-box;
    }

    #player-blank:hover {
        bottom: 0;
        transition: bottom 0.4s ease-out;
    }

    .songs-box {
        position: fixed;
        width: 300px;
        height: 400px;
        right: 0;
        /*bottom: 50px;*/
        bottom: 2px;
        background-color: rgb(50, 50, 50);
        box-sizing: border-box;
        padding: 30px 8px 0 14px;
        border-top-left-radius: 6px;
        overflow-x: hidden;
        overflow-y: auto;

        transition: bottom 0.4s ease-out;
    }

    #player-blank:hover .songs-box {
        bottom: 50px;
        transition: bottom 0.4s ease-out;
    }

    .song-item {
        width: 260px;
        height: 30px;
        background-color: rgb(100, 100, 100);
        margin-bottom: 10px;
        border-radius: 5px;
    }

    .song-item div {
        float: left;
        line-height: 200%;
        box-sizing: border-box;
        color: white;
    }

    .song-item .song-name {
        height: 100%;
        width: 150px;
        /*background-color: red;*/
        padding-left: 10px;
    }

    .song-item .singer-name {
        height: 100%;
        width: 80px;
        padding-left: 10px;
    }

    .song-item .delete {
        height: 100%;
        width: 30px;
        /*background-color: blue;*/
    }

    .song-item .delete img {
        height: 100%;
        width: 100%;
    }

    .player-area {
        width: 900px;
        height: 100%;
        margin: 0 auto;
        /*background-color: green;*/
    }

    /*.activeBox {*/
    /*    bottom: 0;*/
    /*    transition: bottom 0.4s ease-out;*/
    /*}*/


    .player-area > div {
        float: left;
        box-sizing: border-box;
    }

    .button-area {
        height: 100%;
        width: 180px;
        /*background-color: blue;*/
        /*padding-left: 20px;*/
    }

    .button-area .player-btn {
        width: 20px;
        height: 20px;
        margin: 15px 40px 0 0;
        float: left;
    }

    .button-area .player-btn:active {
        margin-left: 1px;
        margin-right: 39px;
    }

    .button-area .player-btn img {
        width: 100%;
        height: 100%;
    }

    .song-cover {
        width: 40px;
        height: 40px;
        margin: 5px 10px 0 0;

    }

    .song-cover img {
        height: 100%;
        width: 100%;
    }

    .bar-area {
        height: 100%;
        width: 480px;
        /*background-color: gray;*/
        position: relative;
    }

    .bar-area > div {
        float: left;
    }

    #outer-bar {
        width: 320px;
        height: 2px;
        margin: 28px auto;
        background-color: rgb(100, 100, 100);
    }

    #outer-bar .progress-bar {
        width: 0;
        height: 100%;
        background-color: cornflowerblue;
        position: relative;
    }

    .bar-area .song-name {
        position: absolute;
        left: 50px;
        color: gray;
        font-size: 12px;
        top: 3px;
    }

    #outer-bar .progress-bar .progress-btn {
        position: absolute;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: white;
        top: -3.5px;
    }

    .bar-area .progress-time {
        height: 100%;
        width: 90px;
        /*background-color: darkred;*/
        box-sizing: border-box;
        padding-left: 10px;
        line-height: 460%;
        color: white;
        font-size: 12px;
    }

    .other-control-area {
        height: 100%;
        width: 240px;
        /*background-color: red;*/
    }

    .other-control-area .control-btn {
        width: 20px;
        height: 20px;
        margin: 15px 40px 0 0;
        float: left;

        position: relative;
    }

    .other-control-area .control-btn img {
        height: 100%;
        width: 100%;
    }

    .other-control-area .control-btn:active {
        margin-left: 1px;
        margin-right: 39px;
    }

    .volume-control {
        position: absolute;
        width: 30px;
        height: 116px;
        left: -5px;
        top: -115px;
        background-color: rgb(50, 50, 50);
    }

    .control-btn:first-child:active .volume-control {
        left: -6px;
    }

    .volume-control:active {
        left: -6px;
    }

    .volume-control .volume-val {
        width: 100%;
        height: 20px;
        color: ghostwhite;
        font-size: 12px;
        line-height: 200%;
        text-align: center;
    }

    .volume-control .volume-blue {
        width: 2px;
        height: 60px;
        background-color: cornflowerblue;
        margin: 10px 14px;
    }

    .volume-control .volume-gray {
        width: 2px;
        height: 0;
        background-color: rgb(100, 100, 100);
    }

    .volume-control .volume-btn {
        width: 8px;
        height: 8px;
        position: absolute;
        left: 10.5px;
        top: 28px;
        background-color: whitesmoke;
        border-radius: 50%;
    }

    /*.pickedItem{*/
    /*    color: #42b983;*/
    /*}*/
</style>
<template>
    <div class="songsBox">
        <div class="controlBar not-select">
            <div class="topBtn play btn" @click="sendMoreSongs">播放</div>
            <div class="topBtn addTo btn" style="color: rgb(200,200,200)">添加到</div>
            <div class="topBtn batch btn" @click="showOrHideBox">批量处理</div>
        </div>
        <div class="songList">
            <ul>
                <li class="listLine">
                    <ul class="blankTitle">
                        <li class="checkBox not-select">
                            <input type="checkbox" id="allChoice" v-if="showCheckBox" v-model="isAllChecked" @change="handleAllChoose">
                            <label for="allChoice" v-if="showCheckBox"></label>
                        </li>
                        <li class="index"></li>
                        <li class="song">歌曲</li>

                        <li class="singerName">歌手</li>
                        <li class="albumName">专辑</li>
                        <li class="duration">时长</li>
                    </ul>
                </li>


                <li class="listLine" v-for="(item, index) in songs">
                    <ul class="songItem" :class="{oddLine: index%2!==0}">
                        <li class="checkBox not-select">
                            <input type="checkbox" :id="index" v-model="chooseItems" :value=item v-if="showCheckBox"
                                   @change="handleLiChoose">
                            <label :for="index" v-if="showCheckBox"></label>
                        </li>
                        <li class="index" :class="{topThree: index<3}">{{index + 1}}</li>
                        <li class="song">
                            <div class="coverBox">
                                <img :src=item.cover alt="">
                            </div>
                            <div class="songName hide-font">
                                <a href="#">{{item.songName}}</a>
                            </div>
                            <div class="hiddenBtn not-select">
                                <div class="loveBtn btn like" v-if="item.state" @click="changeFavorite(index, item.songId)"></div>
                                <div class="loveBtn btn not-like" v-else  @click="changeFavorite(index, item.songId)"></div>
                                <div class="onBtn btn" @click="sendASong(item)"></div>
                                <div class="addBtn btn" @click="pickSong(item.songId, item.songName)" title="歌单操作"></div>
                            </div>
                        </li>
                        <li class="singerName hide-font">
                            <a :href='calcPath("/#/singer/",item.singerId)'>{{item.singer}}</a>
                        </li>
                        <li class="albumName hide-font">
                            <a :href='calcPath("/#/album/",item.albumId)'>{{item.album}}</a>
                        </li>
                        <li class="duration">{{item.duration}}</li>
                    </ul>
                </li>
            </ul>
        </div>
        <AddSongToList :show="showMore" :songName="songPickedName"  :songId="songPickedId"></AddSongToList>
        <div class="blank-block">

        </div>
    </div>
</template>

<script>
    //歌曲列表
    import AddSongToList from "../person/AddSongToList";
    export default {
        name: "SongList",
        data() {
            return {
                songs: [],
                chooseItems: [],
                showCheckBox: false,
                isAllChecked: true,
                songPickedId: 0,
                songPickedName: '',
                showMore: false,
            }
        },
        components:{
            AddSongToList,
        },
        props: ['srcPath'],
        methods: {
            showOrHideBox() {
                this.showCheckBox = !this.showCheckBox;
            },
            handleLiChoose() {
                //console.log(this.chooseItems.length, this.songs.length);
                this.isAllChecked = this.chooseItems.length === this.songs.length;
            },
            handleAllChoose() {
                if (this.isAllChecked === true) {
                    this.chooseItems = this.songs;
                } else {
                    this.chooseItems = [];
                }
            },
            calcPath(prefix, id){
                //console.log(prefix + id);
                return prefix + id;
            },
            changeFavorite(index, id){
                // this.$set(this.songs, index, )
                if(this.$cookies.isKey('user') && this.$cookies.isKey('username')){
                    let param = new URLSearchParams();
                    param.append('songId', id);
                    param.append('username', this.$cookies.get('username'));
                    param.append('userId', this.$cookies.get('user'));
                    this.$axios.post('/db/favorite/', param)
                    .then(response=>{
                        let res = response.data;
                        //console.log(res);
                        if(res['result'] === true){
                            // let newItem = this.songs[index];
                            // newItem['state'] = res['state'];
                            // this.$set(this.songs, index, newItem);
                            this.$set(this.songs[index], 'state', res['state']);
                        }

                    })
                }else{
                    alert('请登录');
                }
            },
            pickSong(songId, songName){
                if(!this.$cookies.isKey('user')){
                    alert('请登录');
                }else if(this.songPickedId !== songId){
                    this.showMore = true;
                    this.songPickedId = songId;
                    this.songPickedName = songName
                }

            },
            closeWin(){
                this.showMore = false;
            },
            sendASong(item){
                // console.log(item);
                // this.$emit('get_a_song', item);
                this.$store.commit('sendSong', item);
            },
            sendMoreSongs(){
                this.$store.commit('sendSeveralSongs', this.chooseItems);
            }
        },
        watch: {
            songs: function (val) {
                this.chooseItems = this.songs;
            }
        },
        created() {

        },
        mounted() {
            //console.log(this.srcPath);
            let param = new URLSearchParams();
            let user = this.$cookies.isKey('user') ? this.$cookies.get('user'): 0;
            let username = this.$cookies.isKey('username') ? this.$cookies.get('username'): '';
            param.append('userId', user);
            param.append('username', username);
            this.$axios.post(this.srcPath, param)
                .then(response =>{
                    let res= response.data;
                    //console.log(res);
                    this.songs = res['top'];
                })
        }
    }
</script>

<style scoped>
    a{
        text-decoration: none;
        color: black;
    }
    .blank-block{
        width: 900px;
        height: 80px;
        
    }
    .songsBox{
        width: 900px;
        height: auto;
        margin: 40px auto;
    }
    .songList {
        width: 100%;
        margin-top: 20px;
        /*background-color: #42b983;*/
    }

    li {
        list-style: none;

    }

    ul {

    }

    .listLine {
        width: 100%;
        height: 60px;
        /*background-color: red;*/
        line-height: 360%;
        /*border-bottom: 0.5px solid;*/
        padding: 5px 0;
    }

    .listLine ul {
        height: 100%;
        width: 100%;
    }

    .listLine li {
        float: left;

    }

    .listLine .index {
        width: 60px;
        height: 100%;
        /*background-color: blueviolet;*/
        text-align: center;
    }

    .listLine .checkBox {
        width: 20px;
        height: 100%;
        /*background-color: red;*/
        text-align: center;
        position: relative;
    }

    .listLine .song {
        width: 400px;
        height: 100%;
        padding-right: 10px;
        box-sizing: border-box;
        /*background-color: #42b983;*/
    }

    .listLine .song .songName {
        width: 300px;
        height: 100%;
        float: left;
        padding-left: 20px;
        /*background-color: blue;*/

        transition-property: width;
        transition-duration: 600ms;
        transition-timing-function: ease-out;
    }

    .listLine .song .hiddenBtn{
        width: 0;
        height: 100%;
        /*background-color: blue;*/
        float: right;
        position: relative;
        overflow: hidden;

        transition-property: width;
        transition-duration: 600ms;
        transition-timing-function: ease-out;
        /*width: 120px;*/
        /*background-color: red;*/
    }
    .hiddenBtn div{
        width: 40px;
        height: 40px;
        position: absolute;
        top: 10px;

    }
    .hiddenBtn .like{
        background: url("/static/imgs/love2.png") no-repeat;
        background-size: cover;
        left: 10px;
    }
    .hiddenBtn .not-like{
        background: url("/static/imgs/love1.png") no-repeat;
        background-size: cover;
        left: 10px;
    }
    .hiddenBtn .onBtn{
        background: url("/static/imgs/on.png") no-repeat;
        background-size: cover;
        left: 70px;
    }
    .hiddenBtn .addBtn{
        background: url("/static/imgs/add.png") no-repeat;
        background-size: cover;
        left: 130px;
    }
    .listLine .song .coverBox {
        width: 60px;
        height: 60px;
        float: left;
        /*background-color: #42b983;*/
    }

    .listLine .song .coverBox img {
        width: 100%;
        height: 100%;
    }

    .listLine .singerName {
        width: 160px;
        height: 100%;
        box-sizing: border-box;
        padding-right: 10px;
        /*background-color: blue;*/
    }
    .listLine .albumName{
        width: 160px;
        height: 100%;
        float: left;
        box-sizing: border-box;
        padding-right: 10px;
    }
    .listLine .duration {
        width: 100px;
        height: 100%;
        float: right;
    }

    .blankTitle {
        font-size: 18px;
        font-weight: bold;
        background-color: rgb(240, 240, 240);
    }

    /*.topThree {*/
    /*    color: red;*/
    /*    font-weight: bold;*/
    /*}*/

    .oddLine {
        background-color: rgb(250, 250, 250);
    }

    .controlBar {
        width: 100%;
        height: 40px;
        /*background-color: red;*/
        margin: 4px 0;
    }

    .controlBar .topBtn {
        width: 120px;
        height: 100%;
        margin-right: 20px;
        border-radius: 4px;
        /*background-color: #42b983;*/
        float: left;
        text-align: center;
        line-height: 240%;
        box-sizing: border-box;

        border: 1px solid rgb(230, 230, 230);
    }

    .controlBar .topBtn:active {
        padding-left: 2px;
    }
    .songItem:hover .songName{
        transition-property: width;
        transition-duration: 600ms;
        transition-timing-function: ease-out;
        width: 120px;
    }
    .songItem:hover .hiddenBtn{
        transition-property: width;
        transition-duration: 600ms;
        transition-timing-function: ease-out;
        width: 180px;
    }

    .hiddenBtn div:active{
        margin-left: 1px;
        margin-right: -1px;
    }

    .checkBox input{
        position: absolute;
        top: 22px;
        opacity: 0;
    }
    .checkBox label{
        position: absolute;
        left: 20px;
        top: 20px;

    }
    .checkBox label::before{
        position: absolute;
        content: '';
        height: 16px;
        width: 16px;
        border-radius: 2px;
        border:1px solid #42b983;
        left: -12px;
        top: -1px;
        transition: all 0.2s ease;
    }
    .checkBox label::after{
        position: absolute;
        content: '';
        width: 6px;
        height: 12px;
        /*background-color: red;*/
        border-right: 2px solid transparent;
        border-bottom: 2px solid transparent;
        transform: rotate(45deg);
        left: -7px;
        top: -1px;
        transition: all 0.2s ease;
    }
    .checkBox input:checked + label::before{
        background-color: #42b983;
        transition: all 0.2s ease;
    }
    .checkBox input:checked + label::after{
        background-color: #42b983;
        border-right: 2px solid white;
        border-bottom: 2px solid white;
        transition: all 0.2s ease;
    }
</style>
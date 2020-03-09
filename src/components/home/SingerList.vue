<template>
    <div class="singList">
        <div class="choices not-select">
            <div class="choiceBtn btn" :class="{current: curChoice===0}" @click="changChoice(0)">全部</div>
            <div class="choiceBtn btn" :class="{current: curChoice===1}" @click="changChoice(1)">男</div>
            <div class="choiceBtn btn" :class="{current: curChoice===2}" @click="changChoice(2)">女</div>
        </div>
        <div class="showArea">
            <ul>
                <li v-for="(item,index) in singers" class="aSinger">
                    <div class="cover">
                        <a :href=computeLink(item.id)>
                            <img :src=item.cover :alt=item.name>
                        </a>
                    </div>
                    <div class="name">
                        <a :href=computeLink(item.id)>{{item.name}}</a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    //歌手列表
    export default {
        name: "SingerList",
        data() {
            return {
                curChoice: 0,
                singers: [],
            }
        },
        methods: {
            changChoice(val) {
                if (this.curChoice === val)
                    return;
                this.curChoice = val;
                this.changeSingers();
            },
            changeSingers() {
                let param = new URLSearchParams();
                let target = 'all';
                if (this.curChoice === 1)
                    target = 'male';
                else if (this.curChoice === 2)
                    target = 'female';
                param.append('target', target);
                this.$axios.post('/db/singers/', param)
                    .then(response => {
                        let res = response.data['singers'];
                        console.log(res);
                        this.singers = res;
                    })
            },
            computeLink(id){
                return '/#/singer/' + id;
            }
        },
        mounted() {
            this.changeSingers();
        }
    }
</script>

<style scoped>
    li {
        list-style: none;
    }

    a {
        text-decoration: none;
        color: black;
    }

    /*a:link{*/
    /*    */
    /*}*/
    /*a:visited{*/
    /*    */
    /*}*/
    /*a:hover{*/
    /*    */
    /*}*/
    .singList {
        margin: 20px auto;
        width: 900px;

    }

    .choices {
        height: 32px;
        width: 100%;
        /*background-color: red;*/

    }

    .choices .choiceBtn {
        float: left;
        width: 80px;
        height: 100%;
        box-sizing: border-box;
        margin-left: 20px;
        border: 1px solid rgb(230, 230, 230);
        border-radius: 4px;
        text-align: center;
        line-height: 180%;
    }

    .choiceBtn:active {
        padding-left: 2px;
    }

    .current {
        background-color: #42b983;
        color: white;
    }

    .showArea {
        margin-top: 20px;
        width: 100%;

    }

    .aSinger {
        width: 200px;
        height: 240px;
        margin: 20px 12.5px;
        float: left;

    }

    .aSinger .cover {
        height: 200px;
        width: 200px;

    }

    .aSinger .cover img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }

    .aSinger .name {
        width: 100%;
        height: 40px;
        /*background-color: #42b983;*/
        text-align: center;
        line-height: 200%;
        font-size: 20px;
    }

</style>
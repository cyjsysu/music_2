import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HomePage from "../components/HomePage";
import Discover from "../components/Discover";
import Carousel from "../components/Carousel";
import SingerDiscover from "../components/SingerDiscover";
import SongSheet from "../components/SongSheet";
import NewSong from "../components/NewSong";
import TopList from "../components/home/TopList";
import PersonalPage from "../components/PersonalPage";
import SingerList from "../components/home/SingerList";
import SingerPage from "../components/singer/SingerPage";
import NotLogin from "../components/home/NotLogin";
import SongList from "../components/home/SongList";
import MySheet from "../components/person/MySheet";
import AList from "../components/person/AList";
import Album from "../components/singer/Album";
import Client from "../components/person/Client";
import AllSheet from "../components/home/AllSheet";


Vue.use(Router);

var discover = {
    path: '',
    name: "Discover",
    component: Discover,
    children: [
        {
            path: '',
            components: {
                carousel: Carousel,
                sheet: SongSheet,
                songs: NewSong,
                singers: SingerDiscover,
            },

            // component: SingerDiscover,
        }
    ]
};
export default new Router({
    routes: [
        // {
        //     path: '/',
        //     name: 'HelloWorld',
        //     component: HelloWorld
        // },
        {
            path: '/',
            name: "HomePage",
            component: HomePage,
            children: [
                discover,
                {
                    path: '/toplist',
                    name: 'TopList',
                    component: TopList,
                },
                {
                    path: '/singers',
                    name: 'Singers',
                    component: SingerList,
                },
                {
                    path: '/all-list',
                    component: AllSheet,
                },
            ]
        },
        {
            path: '/person',
            component: PersonalPage,
            beforeEnter: (to, from, next) => {
                // console.log(to);
                // console.log(from);
                // console.log(next);
                // if (this.$cookies.isKey('user'))
                //     next();
                // else
                //     next({path:'/#/login'});
                var x = document.cookie;

                if(x.includes('user='))
                    next();
                else{
                    next({path:'/login'});
                }

            },
            children: [
                {
                    path: '',
                    name: 'myFavorite',
                    component: SongList,
                },
                {
                    path: 'list',
                    name: 'myList',
                    component: MySheet,
                }
            ],
        },
        {
            path: '/singer/:id',
            //name: 'SingerPage',
            component: SingerPage,
            //component: PersonalPage,
        },
        {
            path: '/login',
            component: NotLogin,
            beforeEnter: (to, from, next) => {
                // console.log(to);
                // console.log(from);
                // console.log(next);
                // if (this.$cookies.isKey('user'))
                //     next();
                // else
                //     next({path:'/#/login'});
                var x = document.cookie;

                if(x.includes('user='))
                    next({path:'/person'});
                else{
                    next();
                }

            }
        },
        {
            path: '/list/:id',
            component: AList,

        },
        {
            path: '/album/:id',
            component: Album,
        },
        {
            path: '/client',
            component: Client,
        },

    ]
})

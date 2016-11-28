module.exports = function (router) {
    var main = require('./views/musicMain.vue');
    var mainView = require('./views/mainView.vue');
    var rankList = require('./views/rankList.vue');
    var searchList = require('./views/searchList.vue');
    var likeList = require('./views/likeList.vue');
    var playList = require('./views/likeList.vue');
    var downList = require('./views/likeList.vue');
    //路由表
    router.map({
            //默认
            '/main': {
                component: main
            },
            '/music': {
                component: mainView,
                subRoutes: {
                    '/': {
                        component: mainView
                    },
                    '/rankList': {
                        component: rankList
                    },
                    '/searchList': {
                        component: searchList
                    },
                    '/likeList': {
                        component: likeList
                    },
                    '/playList': {
                        component: playList
                    },
                    '/downList': {
                        component: downList
                    }
                }
            }
        }
    );

    router.redirect({
        '*': '/main'
    })
}
;

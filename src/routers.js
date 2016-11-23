module.exports = function (router) {
    var main = require('./views/personal.vue');
    var mainView = require('./views/mainView.vue');
    var search = require('./views/search.vue');
    var rankList = require('./views/rankList.vue');
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
                    component: search
                },
                '/rankList': {
                    component: rankList
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

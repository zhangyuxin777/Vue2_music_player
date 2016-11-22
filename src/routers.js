module.exports = function (router) {
    var main = require('./views/personal.vue');
    var mainView = require('./views/mainView.vue');
    var search = require('./views/search.vue');
    //路由表
    router.map({
            //默认
            '/main': {
                component: main
            },
        '/search': {
            component: mainView,
            subRoutes: {
                '/': {
                    component: search
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

module.exports = function (router) {
    var main = require('./views/personal.vue');
    //路由表
    router.map({
            //默认
            '/main': {
                component: main
            }
        }
    );

    router.redirect({
        '*': '/main'
    })
}
;

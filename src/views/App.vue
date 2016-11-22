<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div>
        <title-bar></title-bar>
        <router-view></router-view>
        <spinner id='spinner' :style="{ display: spinner }"></spinner>
    </div>
</template>

<script type="text/ecmascript-6">
    import titleBar from '../components/titleBar.vue'
    import spinner from '../components/spinner.vue'
    import Common from '../js/rock';
    import {updateTitle} from '../vuex/actions'
    import store from '../vuex/store';

    export default{
        store,
        vuex: {
            actions: {
                updateTitle
            }
        },
        components: {
            titleBar,
            spinner
        },
        computed: {
            spinner () {
                if (store.state.spinner) {
                    return 'block'
                } else {
                    return 'none'
                }
            }
        },
        ready: function () {
            Common.init(this);
            this.updateTitle('主页面', false, 'hide');


            //todo 导入数据用
//            for (var i = 0; i < rec.record.length; i++) {
//                var TestObject = Common.AV.Object.extend('Data_Rest');
//                var Rest_ID = rec.record[i].Rest_ID;
//                var Work_Date = rec.record[i].Work_Date;
//                var Rest_Count = parseInt(rec.record[i].Rest_Count);
//                var Rest_Money = parseInt(rec.record[i].Rest_Money);
//                var testObject = new TestObject();
//                testObject.set('Rest_ID', Rest_ID);
//                testObject.set('Work_Date', Work_Date);
//                testObject.set('Rest_Count', Rest_Count);
//                testObject.set('Rest_Money', Rest_Money);
//                testObject.save().then(function (testObject) {
//                    console.log(testObject.objectId);
//                    // 成功
//                }, function (error) {
//                    console.log(rec.record[i]);
//                    console.log('error');
//                });
//            }
//            console.log(rec.record.length);
        }
    }


</script>

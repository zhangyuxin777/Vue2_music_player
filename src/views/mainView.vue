<style scoped>
  @import "css/mainView.css";
</style>
<template>


</template>

<script type="text/ecmascript-6">
  //  import API from '../js/api'
  import {mapState} from 'vuex'
  export default{
    data () {
      return {}
    },
    computed: {
      ...mapState({
        mode: state => state.play.status.mode
      })
    },
    methods: {},
    watch: {}
  }
</script>

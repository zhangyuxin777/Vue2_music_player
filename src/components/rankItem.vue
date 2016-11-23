<style scoped>
    @import "css/rankItem.css";
</style>

<template>
    <div class='rank-item'>
        <div class='line1'>
            <div id='songname' class='songname left'>{{data.songname}}</div>
            <div id='singername' class='singername right'>{{data.singername}}</div>
        </div>
        <div class='line2'>
            <span id='last-time' class='left'></span>
            <span id='next-time' class='right'></span>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            data: {
                type: Object,
                required: true
            }
        }
    }
</script>

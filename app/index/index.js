import Vue from 'Vue';
// import {
//     Button,Icon
// } from 'wkzf'
import Button from 'wkzf/button/button';
import Icon from 'wkzf/icon/icon';
import Dialog from 'wkzf/dialog/dialog';

var vm=new Vue({
    el: 'body',
    components: {
        'weui-button': Button,
        Icon,
        Dialog
    }
});



$(function(){
	console.log('jquery dom ready!');
})


vm.$on('test', function (msg) {
  console.log(msg);
})


vm.$emit('test', 'hi');

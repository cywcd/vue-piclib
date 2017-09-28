<template>
  <div class="weui-tabbar">
	    <a href="javascript:;" class="weui-tabbar__item" v-bind:class="iconLists.indexOf(iconList) == navActive?'weui-bar__item_on':''"  v-for="(iconList,index) in iconLists" @touchend="getIndex(index)">
	        <span style="display: inline-block;position: relative;">
	            <img v-bind:src="iconLists.indexOf(iconList) == navActive?iconList.hoverIcon:iconList.icon" class="weui-tabbar__icon">
	            <span v-if="iconLists.indexOf(iconList) == 0" class="weui-badge" style="position: absolute;top: -2px;right: -13px;">8</span>
	            <span v-if="iconLists.indexOf(iconList) == 2" class="weui-badge weui-badge_dot" style="position: absolute;top: 0;right: -6px;"></span>
	        </span>
	        <p class="weui-tabbar__label">{{iconList.name}}</p>
	    </a>                
	</div>
</template>

<script>
import router from './../router'
import ware from './../assets/middleware'

export default {
  name: 'footer',
  data () {
    return {
      iconLists:[
      	{icon:'./../../static/img/icon-pic.png',hoverIcon:'./../../static/img/icon-pic-hover.png',name:'影像'},
      	{icon:'./../../static/img/icon-video.png',hoverIcon:'./../../static/img/icon-video-hover.png',name:'视频'},
      	{icon:'./../../static/img/icon-find.png',hoverIcon:'./../../static/img/icon-find-hover.png',name:'发现'},
      	{icon:'./../../static/img/icon-my.png',hoverIcon:'./../../static/img/icon-my-hover.png',name:'关注'}
      ],
      clickIndex:0,
      titleName:''
    }
  },
  computed:{
  	navActive(){
  		const curPath = this.$route.path;
	  	if(curPath == '/index'){
	  		this.titleName = '光影图集';
	  		return this.clickIndex = 0;
	  	}
	  	if(curPath == '/video'){
	  		this.titleName = '光影视频';
	  		return this.clickIndex = 1;
	  	}
	  	if(curPath == '/find'){
	  		this.titleName = '发现光影';
	  		return this.clickIndex = 2;
	  	}
	  	if(curPath == '/mySelf'){
	  		this.titleName = '关于我们';
	  		return this.clickIndex = 3;
	  	}
  	}
  },
  methods:{
  	getIndex(index){  	
	  	if(index == 0){	
  			ware.$emit('propTitle','光影图集');
	  		router.push({path:'/index'});	  	
	  	}
	  	if(index == 1){
	  		ware.$emit('propTitle','光影视频');
	  		router.push({path:'/video'});
	  	}
	  	if(index == 2){	  	
	  		ware.$emit('propTitle','发现光影');
	  		router.push({path:'/find'});
	  	}
	  	if(index == 3){
	  		ware.$emit('propTitle','关于我们');
	  		router.push({path:'/mySelf'})
	  	}	  	
  		
	  }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	html,body,.page{height:100%;}
</style>

<template>
  <div class="conh2">
		<x-header :left-options="leftOptions" :transition="headerTransition">{{curTitle}}</x-header>
  </div>
</template>

<script>
import router from './../router'
import ware from './../assets/middleware'
import { XHeader } from 'vux'

export default {
  name: 'header',
  data () {
    return {
      curTitle:'蓝戒光影'
    }
  },
  components:{
  	XHeader
  },
  mounted(){
  	const self = this;
  	ware.$on('propTitle',function(title){
  		self.curTitle = title;
  	}); 
  },
  computed: {
  	headerTransition () {  		
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
   	},
    leftOptions () {
    	const routePath =  this.$route.path;
	  	if(/articleShow|picList/.test(routePath)){
	  		return {showBack: true}
	  	}else{
	  		return {showBack: false}
	  	}
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.conh2{width:100%; text-align: center; height:40px; line-height:40px; box-sizing:border-box; background:#333; color:#fff;position:absolute; left:0; top:0; z-index:99;}
	.conh2 .vux-header .vux-header-title{font-size:16px;}
</style>

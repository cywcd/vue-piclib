<template>
  <div class="w-full">
  		 <swiper :options="swiperOption">
        <swiper-slide v-for="listSlide in listSlides" :key="listSlide.id">
        	<img v-bind:src="listSlide.url">
        	<div class="btn-pos" v-if="listSlides.length == listSlides.indexOf(listSlide)+1">
        			<span @touchend="goIndex" class="weui-btn weui-btn_primary" style="font-size:14px;">立即体验</span>
        	</div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
  </div>
</template>

<script>
import './../../static/css/swiper.css'
import router from './../router'
export default {
  name: 'splash',
  data(){
  	return {
  		listSlides:[
      		{name:'Slide1',url:'./../../static/img/banner01.jpg'},
      		{name:'Slide2',url:'./../../static/img/banner02.jpg'},
      		{name:'Slide3',url:'./../../static/img/banner03.jpg'}
      	],
      	swiperOption: {
          autoplay: 5000,
          initialSlide: 0,
          loop: false,
          pagination: '.swiper-pagination',
          paginationClickable: true
        }
  	}
  },
  methods: {
  	goIndex: function(){
  		router.push({path:'/index'})
  	}
  }
  
}
</script>

<style>
	.btn-pos{position:absolute; left:50%; bottom:80px; margin-left:-38px;}
	.w-full{width:100%; height:100%;}
	html,body{width:100%;height:100%; margin:0; padding:0;}
	.w-full .swiper-container {height:100%; background:#000;}
	.swiper-container img{width:100%; height:100%;}
</style>
<template>
  <div class="indexPage">
    <swiper :list="swiper_list" direction="horizontal" auto :min-moving-distance="20" height="180px">
    	<load-more tip="loading" v-show="isLoading"></load-more>
    </swiper>
    <divider>蓝戒光影</divider>
    <panel header="光影精彩推荐" :footer="panel_footer" :list="panel_list">
    	<load-more tip="loading" v-show="isLoading1"></load-more>
    </panel>
    <panel header="光影治愈系列" :footer="panel_footer2" :list="panel_list2">
    	<load-more tip="loading" v-show="isLoading2"></load-more>
    </panel>  
	</div>
</template>

<script>
import router from './../router'
import ware from './../assets/middleware'
import {Swiper,Divider,Panel,LoadMore} from 'vux'

import { API,httpRequest } from './../api';

export default {
  name: 'index',
  data () {
    return {      
      swiper_list:[],
			panel_list: [],
      panel_footer: {
        title: '查看更多',
        url: 'picList/146'
      },
      panel_footer2: {
        title: '查看更多',
        url: 'picList/148'
      },
      panel_list2: [],
      id: '',
      isLoading:true,
      isLoading1:true,
      isLoading2:true
    }
  },
  components: {
    Swiper,
    Divider,
    Panel,
    LoadMore
  },
  methods: {
  	getPicList: function (catId,panel_list,isLoading) {
      let _this = this;
      httpRequest(API+'?type=picitem&op=news_jiekou&a=get_newpic&cat='+catId+'&nid=&pid=', {},
        function (data) {
        	for(var i =0 ; i < 5; i++){
        		if(data.news[i].title && data.news[i].title != ''){
        			panel_list.push({
	        			src : data.news[i].thumb,
	        		  title : data.news[i].title,
		        	  desc : data.news[i].description,
		        		url: 'articleShow/' + data.news[i].id
	        		});        		
        		}        		
        	}
        	isLoading = false;
      })
   },
   getSwiperList: function (catId,swiper_list,isLoading) {
      let _this = this;
      httpRequest(API+'?type=topswipe&op=news_jiekou&a=get_newpic&cat='+catId, {}, 
        function (data) {
        	for(var i =0 ; i < data.pics.length; i++){        		
        		data.pics[i].url = data.pics[i].url.substr(1,data.pics[i].url.length-1);
        		swiper_list.push({
        			img : data.pics[i].thumb,
        		  title : data.pics[i].title,
	        		url : 'articleShow/'+data.pics[i].id
        		});        		
        	}
        	_this.isLoading = false;
      	}      	
     )
   }  	
    
  },
  mounted(){
  	ware.$emit('propTitle','影像图集');
  	this.getPicList(146,this.panel_list,this.isLoading1);
  	this.getPicList(148,this.panel_list2,this.isLoading2);
  	this.getSwiperList(148,this.swiper_list,this.isLoading);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.indexPage{width: 100%; margin-bottom:80px; float:left; background:#f2f2f2;}
	.indexPage .weui-media-box_appmsg .weui-media-box__hd:last-child{border-bottom:none;}
	.indexPage .weui-media-box_appmsg .weui-media-box__hd img{width:60px; height:50px; vertical-align:middle;}
	.indexPage .weui-media-box__title{font-size:14px;}
	.vux-slider > .vux-swiper > .vux-swiper-item > a > .vux-img{background-size:100% 100% !important;}
</style>

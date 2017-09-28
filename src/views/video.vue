<template>
  <div class="conbox videobox">
  		<!--<divider>光影视频</divider>-->
    	<load-more tip="loading" v-show="isLoading"></load-more>
    	<scroller class="scrollbox" lock-x scrollbar-y  :height="listDataH" use-pullup :pullup-config="upobj" ref="resultData"  @on-pullup-loading = "loadup">
    		<div class="box2">
		    	<div class="picCon" v-for="item in posterList">
		    			<div class="imgcon">
		    				<img :src="item.src">
		    				<p class="pcon">{{item.title}}</p>
		    			</div>
		    	</div>
		    	<p v-show="isNomoredata" class="tc fs14 p5">{{noMoredataInfo}}</p>
		    </div>
    	</scroller>
	</div>
</template>

<script>
import router from './../router'
import ware from './../assets/middleware'
import {Scroller,Divider,LoadMore,Toast,AjaxPlugin} from 'vux'
import { API,httpRequest } from './../api'
import utils from './../util'
import $ from 'webpack-zepto'

export default {
  name: 'video',
  components:{
  	Scroller,
  	Divider,
  	LoadMore,
  	Toast,
  	AjaxPlugin
  },
  data () {
    return {
      posterList:[],
      isLoading:true,
      isNomoredata:false,
      noMoredataInfo:'没有更多数据啦...',
      pageNum:1,
      listDataH:'0',
      pageSize:5,
      upobj: {
	      pullUpHeight: 60,
	      height: 40,
	      autoRefresh: false,
	      content: '请上拉刷新数据',
	      downContent: '请上拉刷新数据',
	      upContent: '请上拉刷新数据',
	      loadingContent: '加载中...',
	      clsPrefix: 'xs-plugin-pullup-'
	    }
    }
  },
  methods:{
  	getposterList: function(catId,posterList,isLoading){
  		let _this = this;
  		
      httpRequest(API+'?type=picitem&op=news_jiekou&a=get_newpic&cat='+catId+'&nid=&pid=', {},
        function (data) {
      	console.log(data,'-------data');
        	for(var i =0 ; i < 5; i++){
        		if(data.news[i].title && data.news[i].title != ''){
        			posterList.push({
	        			src : data.news[i].thumb,
	        		  title : data.news[i].title,
		        		url: 'articleShow/' + data.news[i].id
	        		});        		
        		}        		
        	}
        	_this.isLoading = false;
        	//第一页数据及渲染处理
        if(_this.pageNum == 1){
        	_this.isMoreLoading = false;
          _this.$nextTick(() => {
            _this.$refs.resultData.enablePullup();
            _this.$refs.resultData.reset({top: 0})
          })
        }
        
        //滑动加载最后一页
        if(_this.pageSize > data.news.length &&　_this.pageNum>1){
          _this.loadingTip('已加载全部数据')
        }
        
        //判断最后一页
        if(_this.pageSize > data.news.length){
          _this.isNomoredata = true
          _this.$nextTick(() => {
            _this.$refs.resultData.disablePullup();
         })
        }
            
        //滑动区域高度计算
        if(data.news && data.news.length > 0){
          $('.scrollbox').css('padding-bottom','30px');
          const LH = $(window).height() - 120;
          _this.listDataH = LH + 'px';
        }
            
        //重新渲染
        _this.$nextTick(() => {
          _this.$refs.resultData.donePullup();
        })
      },function(data){ 
      	isLoading = false;
      	if (data instanceof Error) {
      		_this.loadingTip('网络异常，稍后重试');
      	}
      })
  	},
  	loadup: function () {
  		var companyNameVal = this.companyNameVal;
  		this.loadingTip('加载数据...');
      this.pageNum += 1;
  		this.pageSize += 5;
      this.getposterList(145,this.posterList,this.isLoading);
    },
    loadingTip: function(txt){
    	this.$vux.toast.show({
	  	  type: 'text',
	      text: txt
	    })
    }
  },
  mounted(){
  	ware.$emit('propTitle','光影视频');
  	this.getposterList(145,this.posterList,this.isLoading);
  	this.listDataH = $(window).height() - 120+ 'px';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.videobox *{max-width: 100%;}
	.imgcon{width:100%; float:left; background:rgba(0,0,0,0.8); position:relative; display:inline-block; margin-bottom:10px;}
	.imgcon img{opacity:0.5; display:block; margin:0 auto;}
	.pcon{width:100%; position:absolute; box-sizing:border-box; padding:5px 15px; height:40px; margin-top:-20px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; left:0; top:50%; color:#fff; font-size:14px; text-align:center;}
</style>

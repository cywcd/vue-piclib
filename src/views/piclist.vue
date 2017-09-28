<template>
  <div class="conbox">
    <divider>{{ listTitle }} </divider>
    <scroller class="scrollbox" lock-x scrollbar-y  :height="listDataH" use-pullup :pullup-config="upobj" ref="resultData"  @on-pullup-loading = "loadup">
      <div class="box2">
      	<panel :header="propTitle1" :list="panel_list" v-if="catId == 146"></panel>
      	<panel :header="propTitle2" :list="panel_list2" v-if="catId == 148"></panel>
      	<p v-show="isNomoredata" class="tc fs14 p5">{{noMoredataInfo}}</p>
        <load-more tip="loading" v-show="isMoreLoading"></load-more>
      </div>
    </scroller>
	</div>
</template>

<script>
import router from './../router'
import ware from './../assets/middleware'
import { Divider,Toast,Scroller,LoadMore,Panel } from 'vux'
import { API,httpRequest } from './../api';
import $ from 'webpack-zepto'

export default {
  name: 'picList',
  components:{
  	Divider,
  	Toast,
  	Scroller,
  	LoadMore,
  	Panel
  },
  data () {
    return {
      listTitle:'光影集',
      propTitle1:'精彩光影推荐',
      propTitle2:'光影治愈系列',
      catId: this.$route.params.catId,
      isMoreLoading:true,
      isNomoredata:false,
      noMoredataInfo:'没有更多数据啦...',
			panel_list: [],
      panel_list2: [],
      pageNum:1,
      listDataH:'60',
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
  mounted(){
  		// 获取路由传参id值
  		const catId = this.$route.params.catId;	
      this.getPicList(catId);
  		if(catId == '146'){  			
  			ware.$emit('propTitle',this.propTitle1);
  		}else if(catId == '148'){
  			ware.$emit('propTitle',this.propTitle2);
  		}else{
  			ware.$emit('propTitle','蓝戒光影');
  		}  				
	    
  },
  methods: {
  	loadup: function () {
  		var companyNameVal = this.companyNameVal;
  		this.loadingTip('加载数据...');
      this.pageNum += 1;
  		this.pageSize += 5;
      this.getPicList(146);
    },
    loadingTip: function(txt){
    	this.$vux.toast.show({
	  	  type: 'text',
	      text: txt
	    })
    },
  	loaded: function (item) {
  		//console.log(item,'---------item');
  		//console.log( this.$route.params.catId,'-----this.$router.params.catId');
			const catId = this.$route.params.catId; // 获取路由传参id值	
		},
		getPicList: function (catId) {
      let _this = this;
      httpRequest(API+'?type=picitem&op=news_jiekou&a=get_newpic&cat='+catId+'&nid=&pid=', {},
        function (data) {
        	for(var i =0 ; i < 6; i++){
        		if(data.news[i].title && data.news[i].title != ''){
        			_this.panel_list.push({
	        			src : data.news[i].thumb,
	        		  title : data.news[i].title,
		        	  desc : data.news[i].description,
		        		//url : 'articleShow?id='+data.news[i].id
		        		url: 'articleShow/' + data.news[i].id
	        		});
	        		_this.panel_list2.push({
	        			src : data.news[i].thumb,
	        		  title : data.news[i].title,
		        	  desc : data.news[i].description,
		        		//url : 'articleShow?id='+data.news[i].id
		        		url: 'articleShow/' + data.news[i].id
	        		});
	        		
        		}        		
        	}
        
        	_this.$vux.toast.hide();
        	
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
      })
   },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.scrollbox{box-sizing:border-box; padding:10px 0 30px;}
</style>

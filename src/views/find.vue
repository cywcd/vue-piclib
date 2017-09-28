<template>
  <div class="conbox">
    <div class="weui-cells__title page-space"></div>
    <div class="weui-cells">
        <a class="weui-cell weui-cell_access" :href="listFirst.url" v-for="(listFirst,index) in listFirsts">
            <div class="weui-cell__hd"><img :src="listFirst.icon" alt="" style="width:20px;margin-right:5px;display:block"></div>
            <div class="weui-cell__bd">
                <p>{{listFirst.name}}</p>
            </div>
            <div class="weui-cell__ft"></div>
        </a>        
    </div>
    
    <div class="weui-cells__title page-space"></div>
    <div class="weui-cells">
        <a class="weui-cell weui-cell_access" :href="listSecond.url" v-for="(listSecond,index) in listSeconds">
            <div class="weui-cell__hd"><img :src="listSecond.icon" alt="" style="width:20px;margin-right:5px;display:block"></div>
            <div class="weui-cell__bd">
                <p>{{listSecond.name}}</p>
            </div>
            <div class="weui-cell__ft"></div>
        </a>        
    </div>
    
	</div>
</template>

<script>
import router from './../router'
import ware from './../assets/middleware'

export default {
  name: 'find',
  data () {
    return {
      	listFirsts:[
      			{name:'摄友圈',icon:'../../static/img/icon-photo.png',url:'#/video'},
      			{name:'扫一扫',icon:'../../static/img/icon-photo.png',url:'#/video'},
      			{name:'精彩视界',icon:'../../static/img/icon-photo.png',url:'#/video'},
      			{name:'跟我学',icon:'../../static/img/icon-photo.png',url:'#/video'}
      	],
      	listSeconds:[
      			{name:'摄友圈',icon:'../../static/img/icon-photo.png',url:'#/video'},
      			{name:'扫一扫',icon:'../../static/img/icon-photo.png',url:'#/video'},
      			{name:'精彩视界',icon:'../../static/img/icon-photo.png',url:'#/video'},
      			{name:'精彩视界',icon:'../../static/img/icon-photo.png',url:'#/video'},
      	]
    }
  },
  mounted(){
  	ware.$emit('propTitle','发现光影');
  },
  methods:{
  	goto(index){
  		
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-space{height:5px; background:#f1f1f1;}
.weui-cells p{font-size:14px;}
</style>

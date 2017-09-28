<template>
  <div class="conbox articlePage">
    <iframe name="frameView" ref="previewIframe" class="frameView" :src="frameurl" @load="loaded" frameborder="0"></iframe>
	</div>
</template>

<script>
import router from './../router'
import ware from './../assets/middleware'
const showUrl = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port

export default {
  name: 'articleShow',
  data () {
    return {
      	frameurl:''
    }
  },
  mounted(){
  	ware.$emit('propTitle','蓝戒光影'); 
  },
  methods: {
  	loaded: function (item) {
  		//console.log(item,'---------item');
  		console.log( this.$route.params.id,'-----this.$router.params.id');
			const showId = this.$route.params.id; // 获取路由传参id值
  		this.frameurl = showUrl + '/api.php?op=show_pics_n&id=' + showId;
		}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	.frameView{width:100%;height:100%;}
	.articlePage{height:100%; margin-bottom:15px;}
</style>

<template>
  <div class="conbox">
    	<h2 class="page-h2">蓝戒光影微信公众号</h2>
    	<div class="con-img">
    			<img class="img-qrcode" src="../../static/img/qrcode.jpg">
    	</div>
    	<p class="con-p">长按识别二维码，关注我们<br>了解更多精彩摄影内容</p>
	</div>
</template>

<script>
import router from './../router'
import ware from './../assets/middleware'

export default {
  name: 'mySefl',
  data () {
    return {
      
    }
  },
  mounted(){
  	ware.$emit('propTitle','关于我们');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.page-h2{width:100%; text-align:center; font-size:14px; padding-top:35%; font-weight:bold;}
	.con-img{width:100%; text-align:center;}
	.img-qrcode{width:120px; max-width:100%; margin-top:10px; height:auto; display:inline-block;}
	.con-p{width:100%; text-align:center; font-size:14px;}
</style>

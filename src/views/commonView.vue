<template>
  <div class="page">
    <div class="page__bd" style="height: 100%;">
        <div class="weui-tab">
        		<c-header></c-header>
            <div class="weui-tab__panel pt40 pr">
            	<transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
            		<router-view class="child-view"></router-view>
            	</transition>
            </div>
            <c-footer></c-footer>
        </div>
    </div>
	</div>
</template>

<script>
import router from './../router'
import cHeader from './../components/header'
import cFooter from './../components/footer'

export default {
  name: 'commonView',
  data () {
    return {
      direction:'forward'
    }
  },
  components: {
    cHeader,
    cFooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	html,body,.page{height:100%;  background:#f2f2f2;}	
	.conbox{width:100%; float:left;}
	.weui-panel__ft{text-align:right;}
	.child-view {width:100%; transition: all .8s cubic-bezier(.55,0,.1,1); position:absolute; top:45px; }


</style>

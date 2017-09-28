import {Toast,AjaxPlugin} from 'vux'

export default {
	components:{
	  	Toast,
	  	AjaxPlugin
  	}
}

const util = {
	loadingTip: function(txt){
		console.log(Toast,'-----vux')
		Toast.watch.show({
	  	  type: 'text',
	      text: txt
	    })
	}
}
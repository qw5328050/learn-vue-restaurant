<template>
	<div class="header" id="header">
	  <div class="content-wrapper">
	  	<div class="avatar">
	  		<img :src="seller.avatar" width="64" height="64">
	  	</div>
	  	<div class="content">
	  		<div class="title">
	  			<span class="brand"></span>
	  			<span class="name" @click="testClick($event)">{{seller.name}}</span>
	  		</div>
	  		<div class="description">
	  			{{seller.description}}/{{seller.deliveryTime}}分钟送达
	  		</div>
	  		<div class="support" v-if="seller.supports">
	  			<span class="icon" :class="classMap[seller.supports[0].type]"></span>
	  			<span class="text">{{seller.supports[0].description}}</span>
	  		</div>
	  	</div>
	  	<div class="support-count" v-if="seller.supports" @click="showDetail">
	  		<span class="count">{{seller.supports.length}}个</span>
	  		<i class="icon-keyboard_arrow_right"></i>
	  	</div>
	  </div>
	  <div class="bulletin-wrapper" @click="showDetail">
	  	<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
		<i class="icon-keyboard_arrow_right"></i>
	  </div>
	  <div class="background">
	  	<img :src="seller.avatar" width="100%" height="100%">
	  </div>
	  <div class="detail" v-show="detailShow">
	  	<div class="detail-wrapper clearfix">
	  		<div class="detail-main">
	  			<h1>{{seller.name}}</h1>
	  			<div class="detail-star">
	  				<star :size="48" :score="seller.score"></star>
	  			</div>
	  			<div class="title">
	  				<div class="line"></div>
	  				<div class="text">优惠信息</div>
	  				<div class="line"></div>
	  			</div>
	  			<ul v-if="seller.supports" class="supports">
	  				<li class="support-item" v-for="item in seller.supports">
	  					<span class="icon" :class="classMap[item.type]"></span>
	  					<span class="text">{{item.description}}</span>
	  				</li>
	  			</ul>
	  			<div class="title">
	  				<div class="line"></div>
	  				<div class="text">商家公告</div>
	  				<div class="line"></div>
	  			</div>
	  			<div class="bulletin"><p class="content">{{seller.bulletin}}</p></div>
	  		</div>
	  	</div>
	  	<div class="detail-close">
	  		<i class="icon-close" @click="showDetail"></i>
	  	</div>
	  </div>
	</div>
</template>

<script type="text/ecmascript-6">
import star from 'components/star/star.vue'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      detailShow: false
    }
  },
  methods: {
    testClick (event) {
      console.log(event)
      console.log(event._constructed)
    },
    showDetail () {
      this.detailShow = !this.detailShow
    }
  },
  created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
   },
   components: {
     star
   }
}
</script>
<style lang="stylus">
@import "../../common/style/mixin.styl";
.header
 	color: #fff
 	position: relative
 	overflow: hidden
 	background-color: rgba(7,17,27,0.5)
 	.content-wrapper
 		font-size:0
 		position: relative
 		padding: 24px 12px 18px 24px
 		.avatar
 			display: inline-block
 		.content
 			margin-left: 16px
 			display: inline-block
 			font-size: 14px
 			vertical-align:top
 			.title
 				font-size: 16px
 				line-height: 18px
 				font-weight: bold
 				margin: 2px 0 8px 0
 				.brand
 					display: inline-block
 					width: 30px
 					height: 18px
 					bg-image('brand')
 					background-size: 30px 18px
 					vertical-align: top
 				.name
 					display: inline-block
 			.description
 				margin-bottom: 10px 
 			.support
 				.icon
 					display:inline-block
 					width:12px
 					height:12px
 					margin-right:4px
 					background-size:12px 12px
 					background-repeat:no-repeat
 					&.decrease
 						bg-image('decrease_1')
 					&.discount
 						bg-image('discount_1')
 					&.guarantee
 						bg-image('guarantee_1')
 					&.invoice
 						bg-image('invoice_1')
 					&.special
 						bg-image('special_1')
 				.text
 					line-height:12px
 					font-size:10px
 					vertical-align: top
 		.support-count
 			position: absolute
 			right: 12px
 			bottom: 18px
 			padding: 0 8px
 			height: 24px
 			line-height: 24px
 			border-radius: 14px
 			background: rgba(0,0,0,0.2)
 			text-align: center
 			.count
 				font-size: 10px
 			.icon-keyboard_arrow_right
 				font-size: 10px
	.bulletin-wrapper
		height: 28px
		line-height: 28px
		padding: 0 22px 0 12px
		white-space: nowrap
		overflow: hidden
		text-overflow: ellipsis
		position: relative
		background-color: rgba(7,17,27,0.2)
		.bulletin-title
			display: inline-block
			vertical-align: top
			margin-top: 8px 
			width: 22px
			height: 12px
			bg-image('bulletin')
			background-size: 22px 12px
			background-repeat: no-repeat 
		.bulletin-text
			margin: 0 4px
			vertical-align: top
			font-size: 10px
		.icon-keyboard_arrow_right
			position: absolute
			font-size: 10px
			right: 12px
			top: 8px
	.background
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		z-index: -1
		filter: blur(10px)
	.detail
		position: fixed
		top: 0
		left: 0
		z-index: 100
		width: 100%
		height: 100%
		overflow: auto
		background-color: rgba(7,17,27,0.6)
		background-filter: blur(10px)
		.detail-wrapper
			width: 100%
			min-height: 100%
			.detail-main
				margin-top: 32px
				padding-bottom: 64px 
				h1
					text-align: center
					font-size: 18px
					font-weight: 700
					line-height: 18px
					margin-bottom: 18px 
				.detail-star
					text-align: center
					margin-bottom: 28px
				.title
					display: flex
					width: 80%
					margin: 0 auto 24px auto
					.line
						flex: 1
						position: relative
						top: -7px
						border-bottom: 1px solid rgba(255,255,255,0.2)
					.text
						padding: 0 12px
						font-size: 14px
				.supports
					width: 80%
					margin: 0 auto
					padding-bottom: 28px 
					.support-item
						padding: 0 12px
						margin-bottom: 12px
						font-size: 0
						&:last-child
							margin-bottom: 0
						.text
		 					font-size: 12px
		 					line-height: 16px
						.icon
							display: inline-block
							width: 16px
							height: 16px
							vertical-align: top
							padding-right: 6px
							background-repeat: no-repeat
							background-size: 16px 16px 
							&.decrease
		 						bg-image('decrease_2')
		 					&.discount
		 						bg-image('discount_2')
		 					&.guarantee
		 						bg-image('guarantee_2')
		 					&.invoice
		 						bg-image('invoice_2')
		 					&.special
		 						bg-image('special_2')
				.bulletin
		 			width: 80%
		 			margin: 0 auto
		 			font-size: 12px
		 			line-height: 24px
		 			.content
		 				padding: 0 12px

		.detail-close
			text-align: center
			margin-top:-64px 
			font-size: 32px
	

</style>
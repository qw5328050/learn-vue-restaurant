<template>
	<div>
         <div class="goods">
            <div class="menu-wrapper" ref="meunScroll">
                <ul>
                    <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="clickMeun(index,$event)">
                        <span class="text border-1px">
                            <span class="icon" v-show="item.type>0" :class="classMap[item.type]"></span>
                            {{item.name}}
                        </span>
                    </li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodScroll">
                <ul>
                    <li v-for="item in goods" class="food-list food-list-hook">
                        <h1 class="title">{{item.name}}</h1>
                        <ul>
                            <li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
                                <div class="icon">
                                    <img :src="food.icon" width="57">
                                </div>
                                <div class="content">
                                    <h2 class="name">{{food.name}}</h2>
                                    <p class="desc">{{food.description}}</p>
                                    <div class="extra">
                                        <span>月售{{food.sellCount}}份</span>
                                        <span>好评率{{food.rating}}</span>
                                    </div>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                    </div>
                                    <div class="cartcontrol-wrapper">
                                        <cartcontrol :food="food"></cartcontrol>
                                    </div>
                                </div>
                            </li>
                        </ul> 
                    </li>
                </ul>      
            </div>
            <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
        </div>
        <food :food="selectedFood" ref="food"></food>   
    </div>
</template>
<script>
import BSscroll from 'better-scroll'
import shopcart from 'components/shopcart/shopcart.vue'
import cartcontrol from 'components/cartcontrol/cartcontrol.vue'
import food from 'components/food/food.vue'

const ERR_OK = 0
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      },
      selectFoods () {
        let foods = []
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      this.$http.get('/api/goods').then((responce) => {
        responce = responce.body
        if (responce.errno === ERR_OK) {
          this.goods = responce.data
          this.$nextTick(() => {
            this._initScroll()
            this._calculateHeight()
          })
        }
      })
    },
    methods: {
        selectFood (food, event) {
          if (!event._constructed) {
            return
          }
          this.selectedFood = food
          this.$refs.food.show()
        },
        _initScroll () {
            this.meunScroll = new BSscroll(this.$refs.meunScroll, {
              click: true
            })
            this.foodsScroll = new BSscroll(this.$refs.foodScroll, {
              probeType: 3,
              click: true
            })
            this.foodsScroll.on('scroll', (pos) => {
              this.scrollY = Math.abs(Math.round(pos.y))
            })
        },
        _calculateHeight () {
          let foodList = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
          let height = 0
          this.listHeight.push(height)
          for (let i = 0; i < foodList.length; i++) {
            let item = foodList[i]
            height += item.clientHeight
            this.listHeight.push(height)
          }
        },
        clickMeun (index, event) {
          let foodList = this.$refs.foodScroll.getElementsByClassName('food-list-hook')
          let el = foodList[index]
          if (!event._constructed) {
            return
          }
          console.log(event._constructed)
          this.foodsScroll.scrollToElement(el, 300)
        }
    },
    components: {
      shopcart,
      cartcontrol,
      food
    }
  }
</script>
<style lang="stylus">
@import "../../common/style/mixin.styl";
.goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
        flex: 0 0 80px
        width: 80px
        background: #f3f5f7
        .menu-item
            display: table
            width: 100%
            height: 54px
            line-height: 14px
            margin: 0 auto
            &.current
                position: relative
                z-index: 10
                margin-top: -1px
                background: #fff
                font-weight: 700
                .text
                    border-none()
            .icon
                display:inline-block
                width: 12px
                height: 12px
                margin-right: 2px
                background-size: 12px 12px
                background-repeat: no-repeat
                &.special
                    bg-image('special_3')
                &.decrease
                    bg-image('decrease_3')
                &.discount
                    bg-image('discount_3')
                &.guarantee
                    bg-image('guarantee_3')
                &.invoice
                    bg-image('invoice_3')
            .text
                width:100%
                padding: 0 12px
                vertical-align: middle
                font-size: 12px
                display: table-cell
                border-1px(rgba(7,17,27,0.2))
    .foods-wrapper
        flex: 1
        .title
            padding-left: 14px
            height: 26px
            line-height: 26px
            border-left: 2px solid #d9dde1
            font-size:12px
            color: rgb(147,153,159)
            background: #f3f5f7
        .food-item
            display: flex
            margin: 18px
            border-1px(rgba(7,17,27,0.1))
            padding-bottom: 18px
            &:last-child
                border-none()
                margin-bottm: 0
            .icon
                flex: 0 0 57px
                margin-right: 10px
            .content
                flex: 1    
                .name
                    margin: 2px 0 8px 0
                    height: 14px
                    line-height: 14px
                    font-size: 14px
                    color: rgb(7,17,27)    
                .desc, .extra
                    line-height: 10px
                    font-size: 10px
                    color: rgb(147, 153, 159)
                .desc
                    line-height: 12px
                    margin-bottom: 8px
                .extra
                    line-height: 10px
                    .count
                        margin-right: 12px
                .price
                    font-weight: 700
                    line-height: 24px
                    .now
                        margin-right: 8px
                        font-size: 14px
                        color: rgb(240,20,20)
                    .old
                        color: rgb(147,153,159)
                        text-decoration: line-through
                        font-size: 10px
                .cartcontrol-wrapper
                    position: absolute
                    right: 0
                    bottom: 12px
</style>
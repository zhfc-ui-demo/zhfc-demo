<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    @close="$emit('update:visible', false)"
    class="zhfc-dialog-head"
    :width="width">
    
    
    <map-point @sureAddress="sureAddress"></map-point>

    <div slot="footer" class="dialog-footer">
      <slot name="footer">
        <el-button @click="$emit('update:visible', false)" round size="small" class="zhfc-button">取 消</el-button>
        <el-button type="primary" round @click="sure" size="small" class="zhfc-button">确 定</el-button>
      </slot>
    </div> 

  </el-dialog>
</template>

<script>
import mapPoint from './mapChoose'
export default {
  name:'mapAddressDialog',
  components:{mapPoint},
    props:{
        visible:{
            type:Boolean,
            default:false
        },
        title:{
          type:String,
          default:'地图定位'
        },
         width: {
          type: String,
          default: '800px'
        },
    },
  data(){
      return{
        address:'',
        point:{}
      }
  },
  mounted(){
  },
  methods:{
    sureAddress(address,pt){
      this.address=address
      this.point.lat=pt.lat;
      this.point.lng=pt.lng
    },
      sure(address){
          this.$emit('sureAddress',this.address,this.point)
      }
  }
}
</script>
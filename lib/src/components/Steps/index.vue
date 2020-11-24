<template>
    <div class="steps">
        <div class="zhfc-step"  v-for="(item,index) in StepsData" :key="index"  :style="[index==StepsData.length-1?lastitemStyle:itemStyle]" :class="[index<= active?'active':'',index==StepsData.length-1?'last-item':'']">
            <step-item :stepData="item" :index="index"></step-item>
        </div>
    </div>
</template>

<script>
import stepItem from './step-item'
export default {
    name:'zhcfSteps',
    components:{stepItem},
    props: {
        // 步骤状态
        active: {
            type:[String,Number],
            default:0
        },
        StepsData:Array
    },
    computed:{
        itemStyle(a){
            let styleObj={
                margin:0
            }
            let len=this.StepsData.length
            styleObj.flexBasis=100/(len-1)+'%'
            return styleObj
        },
        lastitemStyle(a){
            let styleObj={}
            let len=this.StepsData.length
            styleObj.maxWidth= 100/len+'%';
            return styleObj
        }
    },
}
</script>
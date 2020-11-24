``` javascript


# ElementUI     size: 'medium'

     main.js  Vue.use(ElementUI, { size: 'medium' })

# 基础样式更改部分

## 按钮 button

* 添加类名

        <el-button class="zhfc-button primary">主要按钮</el-button>
        <el-button class="zhfc-button plain">次要按钮</el-button>
        <el-button class="zhfc-button danger">危险按钮</el-button>
        <el-button class="zhfc-button danger-plain">危险按钮有边框</el-button>
        <el-button class="zhfc-button text">文字按钮</el-button>
        <el-button class="zhfc-button danger-text">文字按钮</el-button>

## 选择器 select

    <el-select class="zhfc-select"></el-select>

* 添加类名

    class="zhfc-select"
   
## input输入框

    <el-input class="zhfc-input" ></el-input>

* 属性

    suffix-icon="zhfc-icon-search"             后缀搜索icon

    远程搜索功能input输入框 添加icon，其他默认即可

## 日期/时间

    <el-date-picker
        class="zhfc-picker"
        v-model="value1"
        type="daterange"
        range-separator="→"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        prefix-icon="el-icon-date"
        :clearable="false"
    ></el-date-picker>

* 参数

    添加类名 class="zhfc-picker"

## 穿梭框

    <el-transfer class="zhfc-transfer" :data="data"></el-transfer>

* 参数

    添加类名  class="zhfc-transfer"

## 单选/多选

    <el-radio class="zhfc-radio" v-model="radio" label="1">单选框<el-radio>
    <el-checkbox class="zhfc-checkbox">多选框</el-checkbox>



* -----------------------------------------------------------------------------------------

# 组件部分

## 容器

    <main-panel>
        <div slot="header" class="header-section">
            <div class="query-wrap"></div>
            <div class="action-wrap"></div>
        </div>
        <div class="content-section"></div>
        <div slot="footer" class="footer-section"></div>
    </main-panel>

* 用法
    query-wrap input输入框 选择器等  查询重置按钮

    ction-wrap      仅存放 新增 修改类按钮放第二排   参考demo10

## 分页

    <zhfc-pagination
        :total="totalCount"
        :background="false"
        :page-sizes="pageSizes"
        :page.sync="page"
        :limit.sync="limit"
        @pagination="getPagedData"
    ></zhfc-pagination>
        

* 参数

    total             总条数                             number         (必填)
    background        背景色                             Boolean        (默认false)
    page-sizes        每页显示个数选择器的选项设置         [10,20,30,50]  (默认)
    page.sync         当前页数                           1              (默认)
    limit.sync        每页显示条目个数                    10             (默认)
* 事件

    pagination        limt / page 改变时会触发
* --------------------------------------    

## 表格
     <el-table class="zhfc-table" height="100%"></<el-table>

* 注意点
    align="left"   统一设置left
    最后一列操作栏 右边距 30px
    button size="small"


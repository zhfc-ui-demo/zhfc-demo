<template>
  <transition name="viewer-fade" v-if="urlList.length !=0">
    <div tabindex="-1" ref="el-image-viewer__wrapper" class="el-image-viewer__wrapper" :class="{tofull: isTofull}" :style="{ 'z-index': zIndex }">
      <div class="el-image-viewer__mask"></div>
      <!-- CLOSE -->
      <span class="el-image-viewer__btn el-image-viewer__close" @click="hide">
        <i class="el-icon-circle-close"></i>
      </span>
      <div class="img-info-box">
          <div class="img-view-box" :class="[showlist?'showList':'']">
          <!-- ARROW -->
            <template v-if="!isSingle">
                <span
                class="el-image-viewer__btn el-image-viewer__prev"
                :class="{ 'is-disabled': !infinite && isFirst }"
                @click="prev">
                <i class="el-icon-arrow-left"/>
                </span>
                <span
                class="el-image-viewer__btn el-image-viewer__next"
                :class="{ 'is-disabled': !infinite && isLast }"
                @click="next">
                <i class="el-icon-arrow-right"/>
                </span>
            </template>
            <!-- ACTIONS -->
            <div class="el-image-viewer__btn el-image-viewer__actions" style="width:400px">
                <div class="el-image-viewer__actions__inner">
                  <span class="showImgList" @click="imglistChangeShow">{{showlist?'收起':'展开'}}缩略图<i :class="[showlist? 'el-icon-caret-bottom' : 'el-icon-caret-top']"></i></span>
                <i class="el-icon-zoom-out" @click="handleActions('zoomOut')"></i>
                <i class="el-icon-zoom-in" @click="handleActions('zoomIn')"></i>
                <i class="el-image-viewer__actions__divider" v-if="false"></i>
                <i :class="mode.icon" @click="toggleMode"></i>
                <i class="el-image-viewer__actions__divider" v-if="false"></i>
                <i class="el-icon-refresh-left" @click="handleActions('anticlocelise')"></i>
                <i class="el-icon-refresh-right" @click="handleActions('clocelise')"></i>
                <i class="el-icon-download" @click="download"></i>
                <i class="el-icon-delete" @click="removeImg"></i>
                <i v-show="showImgdetail" class="el-icon-warning-outline" @click="infoShowChange"></i>
                </div>
            </div>
            <!-- CANVAS -->
            <div class="el-image-viewer__canvas img-view" >
                <div class=" cuurent-img">
                    <img
                    ref="img"
                    class="el-image-viewer__img"
                    :src="currentImg"
                    :style="imgStyle"
                    @load="handleImgLoad"
                    @error="handleImgError"
                    @mousedown="handleMouseDown">
                </div>
                <div class="current-info-box" v-if="infoShow">
                    <div class="info-box-center">
                        <div class="info-header">
                            <h4>要件信息类型：{{currentInfo.infoType}}</h4>
                        </div>
                        <ul>
                            <li>姓名:{{currentInfo.name}}</li>
                            <li>性别:{{currentInfo.gender}}</li>
                            <li>民族:{{currentInfo.nation}}</li>
                            <li>证件类型:{{currentInfo.cardType}}</li>
                            <li>出生日期:{{currentInfo.brith}}</li>
                            <li>住址:{{currentInfo.address}}</li>
                            <li>发证机关:{{currentInfo.gov}}</li>
                            <li>证件有效期:{{currentInfo.expData}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="img-list" v-show="showlist">
          <ul>
            <li @click="chooseImg(i)" v-for="(item,i) in urlList" :key="i" :class="[index==i?'on':'']"><img :src="item.url" alt="" ></li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { on, off } from '../../utils/dom';
import { rafThrottle, isFirefox } from '../../utils/util';

const Mode = {
  CONTAIN: {
    name: 'contain',
    icon: 'el-icon-full-screen'
  },
  ORIGINAL: {
    name: 'original',
    icon: 'el-icon-c-scale-to-original'
  }
};

const mousewheelEventName = isFirefox() ? 'DOMMouseScroll' : 'mousewheel';

export default {
  name: 'zhfcImgViewer',

  props: {
    showImgdetail:{
      type: Boolean,
      default: false,
    },
    urlList: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 2000
    },
    onSwitch: {
      type: Function,
      default: () => {}
    },
    onClose: {
      type: Function,
      default: () => {}
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      index: this.initialIndex,
      isShow: false,
      infinite: true,
      loading: false,
      mode: Mode.CONTAIN,
      transform: {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      },
      infoShow:this.showImgdetail,
      showlist:true,
      isTofull:false // 切换定位格式
    };
  },
  computed: {
    isSingle() {
      return this.urlList.length <= 1;
    },
    isFirst() {
      return this.index === 0;
    },
    isLast() {
      return this.index === this.urlList.length - 1;
    },
    currentImg() {
      return this.urlList[this.index].url;
    },
    currentInfo() {
      return this.urlList[this.index];
    },
    imgStyle() {
      const { scale, deg, offsetX, offsetY, enableTransition } = this.transform;
      const style = {
        transform: `scale(${scale}) rotate(${deg}deg)`,
        transition: enableTransition ? 'transform .3s' : '',
        'margin-left': `${offsetX}px`,
        'margin-top': `${offsetY}px`
      };
      if (this.mode === Mode.CONTAIN) {
        style.maxWidth = style.maxHeight = '100%';
      }
      return style;
    }
  },
  watch: {
    index: {
      handler: function(val) {
        this.reset();
        this.onSwitch(val);
      }
    },
    currentImg(val) {
      this.$nextTick(_ => {
        const $img = this.$refs.img;
        if (!$img.complete) {
          this.loading = true;
        }
      });
    },
    showImgdetail(val) {
      this.infoShow = val ? true : false
    }
  },
  methods: {
    hide() {
      this.deviceSupportUninstall();
      this.onClose();
    },
    deviceSupportInstall() {
      this._keyDownHandler = rafThrottle(e => {
        const keyCode = e.keyCode;
        switch (keyCode) {
          // ESC
          case 27:
            this.hide();
            break;
          // SPACE
          case 32:
            this.toggleMode();
            break;
          // LEFT_ARROW
          case 37:
            this.prev();
            break;
          // UP_ARROW
          case 38:
            this.handleActions('zoomIn');
            break;
          // RIGHT_ARROW
          case 39:
            this.next();
            break;
          // DOWN_ARROW
          case 40:
            this.handleActions('zoomOut');
            break;
        }
      });
      this._mouseWheelHandler = rafThrottle(e => {
        const delta = e.wheelDelta ? e.wheelDelta : -e.detail;
        if (delta > 0) {
          this.handleActions('zoomIn', {
            zoomRate: 0.015,
            enableTransition: false
          });
        } else {
          this.handleActions('zoomOut', {
            zoomRate: 0.015,
            enableTransition: false
          });
        }
      });
      on(document, 'keydown', this._keyDownHandler);
      on(document, mousewheelEventName, this._mouseWheelHandler);
    },
    deviceSupportUninstall() {
      off(document, 'keydown', this._keyDownHandler);
      off(document, mousewheelEventName, this._mouseWheelHandler);
      this._keyDownHandler = null;
      this._mouseWheelHandler = null;
    },
    handleImgLoad(e) {
      this.loading = false;
    },
    handleImgError(e) {
      this.loading = false;
      e.target.alt = '加载失败';
    },
    handleMouseDown(e) {
      if (this.loading || e.button !== 0) return;

      const { offsetX, offsetY } = this.transform;
      const startX = e.pageX;
      const startY = e.pageY;
      this._dragHandler = rafThrottle(ev => {
        this.transform.offsetX = offsetX + ev.pageX - startX;
        this.transform.offsetY = offsetY + ev.pageY - startY;
      });
      on(document, 'mousemove', this._dragHandler);
      on(document, 'mouseup', ev => {
        off(document, 'mousemove', this._dragHandler);
      });

      e.preventDefault();
    },
    reset() {
      this.transform = {
        scale: 1,
        deg: 0,
        offsetX: 0,
        offsetY: 0,
        enableTransition: false
      };
    },
    toggleMode() {
      if (this.loading) return;
      const modeNames = Object.keys(Mode);
      const modeValues = Object.values(Mode);
      const index = modeValues.indexOf(this.mode);
      // 
      this.isTofull = index ? false : true
      this.$emit('tofull',index)


      // 
      const nextIndex = (index + 1) % modeNames.length;
      this.mode = Mode[modeNames[nextIndex]];
      this.reset();
    },
    prev() {
      if (this.isFirst && !this.infinite) return;
      const len = this.urlList.length;
      this.index = (this.index - 1 + len) % len;
    },
    next() {
      if (this.isLast && !this.infinite) return;
      const len = this.urlList.length;
      this.index = (this.index + 1) % len;
    },
    handleActions(action, options = {}) {
      if (this.loading) return;
      const { zoomRate, rotateDeg, enableTransition } = {
        zoomRate: 0.2,
        rotateDeg: 90,
        enableTransition: true,
        ...options
      };
      const { transform } = this;
      switch (action) {
        case 'zoomOut':
          if (transform.scale > 0.2) {
            transform.scale = parseFloat((transform.scale - zoomRate).toFixed(3));
          }
          break;
        case 'zoomIn':
          transform.scale = parseFloat((transform.scale + zoomRate).toFixed(3));
          break;
        case 'clocelise':
          transform.deg += rotateDeg;
          break;
        case 'anticlocelise':
          transform.deg -= rotateDeg;
          break;
      }
      transform.enableTransition = enableTransition;
    },
    download(){
      this.$emit('download',this.currentInfo)
    },
      removeImg(){
      this.$emit('removeImg',this.currentInfo)
    },
    infoShowChange(){
      this.infoShow= !this.infoShow
    },
    imglistChangeShow(){
      this.showlist=!this.showlist;
    },
    chooseImg(index){
      this.index=index
    }
  },
  mounted() {
    this.deviceSupportInstall();
    // add tabindex then wrapper can be focusable via Javascript
    // focus wrapper so arrow key can't cause inner scroll behavior underneath
    this.$refs['el-image-viewer__wrapper'].focus();
  }
};
</script>

<style lang="scss" scoped>
  .el-image-viewer__btn {
     span,
     i {
      cursor: pointer !important;
    }
  }
</style>

<template>
  <v-card
    :class="{
      'd-flex': images.length === 0,
      'justify-center': images.length === 0,
      'mb-6': true
    }"
    flat
    tile
    color="transparent"
  >
    <v-card
      v-if="images.length === 0"
      flat
      tile
      color="transparent"
      class="img_no_data"
    >
      <v-img src="/no_data.svg" />
    </v-card>

    <client-only>
      <viewer :images="images">
        <draggable
          :list="images"
          :animation="200"
          group="description"
          :disabled="false"
          ghost-class="ghost"
          :force-fallback="true"
          tag="span"
          @change="orderChange"
        >
          <div
            v-for="{ id, src } in images"
            :key="id"
            class="img_box"
            :class="{ showbefore: showFirstTag }"
          >
            <img :src="src" :data-source="src">
          </div>
        </draggable>
      </viewer>
    </client-only>
  </v-card>
</template>

<script>
import Vue from 'vue'
import Viewer from 'v-viewer'
import draggable from 'vuedraggable'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)
export default {
  components: { draggable },
  props: {
    images: {
      type: Array,
      required: true
    },
    showFirstTag: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      options: {
        toolbar: true,
        url: 'data-source'
      }
    }
  },
  computed: {},
  methods: {
    orderChange() {
      this.$emit('order-files', this.images)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.img_box {
  position: relative;
  outline: thin solid orange;
  width: calc(50% - 10px);
  height: 145px;
  cursor: zoom-in;
  margin: 5px;
  display: inline-block;
  overflow: hidden;
}
.img_box img {
  max-width: 100%;
  height: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateX(-50%) translateY(-50%) scale(1.1);
  transform: translateX(-50%) translateY(-50%) scale(1.1);
  z-index: 2;
}

.showbefore:first-child:before {
  content: '封面';
  position: absolute;
  top: 3px;
  left: 3px;
  padding: 2px 4px;
  background-color: #ff7729;
  color: white;
  font-size: 12px;
  z-index: 5;
}

.img_no_data {
  width: 50%;
}

@media screen and (min-width: 600px) {
  .img_box {
    width: calc(33% - 10px);
  }

  .img_no_data {
    width: 30%;
  }
}

@media screen and (min-width: 960px) {
  .img_box {
    width: calc(25% - 10px);
  }

  .img_no_data {
    width: 25%;
  }
}

@media screen and (min-width: 1264px) {
  .img_box {
    width: calc(20% - 10px);
  }
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.viewer-loading > img {
  display: none; /* hide big images when it is loading */
}
</style>

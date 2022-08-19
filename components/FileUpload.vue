<template>
  <v-dialog :value="value" persistent max-width="600px" @input="$emit('input')">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{ title }}</span>
        <v-spacer />
        <v-tooltip bottom>
          <template #activator="{ on, attrs }">
            <v-icon small v-bind="attrs" v-on="on">
              mdi-information-outline
            </v-icon>
          </template>
          <span>
            檔案上傳上限為{{ maxFiles }}
          </span>
        </v-tooltip>
      </v-card-title>

      <v-card-text>
        <client-only>
          <file-pond
            ref="pond"
            name="upload"
            label-idle="將檔案拖曳至此，或點此<span class='filepond--label-action'>選擇檔案</span>"
            label-file-type-not-allowed="格式不支援"
            file-validate-type-label-expected-types="僅支援 {allTypes} 格式"
            :allow-multiple="multiFiles"
            :max-files="maxFiles"
            accepted-file-types="image/jpeg, image/png"
            :files="files"
            credits=""
            max-file-size="5MB"
          />
        </client-only>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click.native="$emit('input')">
          取消
        </v-btn>
        <v-btn color="blue darken-1" text @click.native="confirm">
          確定
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import vueFilePond from 'vue-filepond'
// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// Import the plugin code
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'

// Import FilePond styles
import 'filepond/dist/filepond.min.css'

// Import image preview plugin styles
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize
)

export default {
  components: { FilePond },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false
    },
    title: {
      type: String,
      required: false,
      default: ''
    },
    files: {
      type: Array,
      required: true
    },
    maxFiles: {
      type: Number,
      required: false,
      default: 5
    },
    multiFiles: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    confirm() {
      const arr = this.$refs.pond.getFiles()
      if (arr.length === 0) {
        this.$swal.fire('小提示', '請上傳檔案', 'warning')
      }

      let checkFlag = true
      arr.forEach((item) => {
        if (item.status !== 2) {
          checkFlag = false
        }
      })

      if (checkFlag) {
        this.$emit('get-files', arr)
        this.$emit('input')
      } else {
        this.$swal.fire('小提示', '部分檔案發生錯誤，請重新確認！', 'warning')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.image {
  width: calc(20% - 10px);
  cursor: pointer;
  margin: 5px;
  display: inline-block;
}

.viewer-loading > img {
  display: none; /* hide big images when it is loading */
}
.flip-list-move {
  transition: transform 0.5s;
}
</style>

<template>
  <div>
    <notifications
      :duration="5000"
      animation-name="v-fade-left"
      position="top right"
    >
      <template slot="body" slot-scope="props">
        <div class="custom-template " :class="'custom-template-' + props.item.type">
          <div class="custom-template-icon">
            <v-icon :color="props.item.type">
              mdi-{{ props.item.type | notifyIconTransform }}
            </v-icon>
          </div>
          <div class="custom-template-content">
            <div class="custom-template-title">
              {{ props.item.title }}
            </div>
            <!-- eslint-disable vue/no-v-html -->
            <div class="custom-template-text" v-html="props.item.text" />
            <!--eslint-enable-->
          </div>
          <div class="custom-template-close" @click="props.close">
            <v-icon>mdi-close</v-icon>
          </div>
        </div>
      </template>
    </notifications>
  </div>
</template>
<style lang="scss">
.custom-template {
  line-height: 1rem !important;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  text-align: left;
  font-size: 13px;
  margin: 5px;
  margin-bottom: 0;
  align-items: center;
  justify-content: center;
  &,
  & > div {
    box-sizing: border-box;
  }

  .custom-template-icon {
    flex: 0 1 auto;
    font-size: 32px;
    padding: 0 10px;
  }
  .custom-template-close {
    flex: 0 1 auto;
    padding: 0 20px;
    font-size: 16px;
    opacity: 0.2;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .custom-template-content {
    padding: 10px;
    flex: 1 0 auto;
    .custom-template-title {
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 10px;
      font-weight: 600;
    }
  }
}

.custom-template.custom-template-success {
  background: #e8f9f0;
  border: 2px solid #d0f2e1;
  .custom-template-icon {
    color: #15c371;
  }
}

.custom-template.custom-template-info {
  background: #eaf4fe;
  border: 2px solid #d4e8fd;
  .custom-template-icon {
    color: #03a9f4;
  }
}

.custom-template.custom-template-warning {
  background: #FFF8E1;
  border: 2px solid #FFECB3;
  .custom-template-icon {
    color: #FFC107;
  }
}

.custom-template.custom-template-error {
  background: #FFEBEE;
  border: 2px solid #FFCDD2;
  .custom-template-icon {
    color: #FF5252;
  }
}

.v-fade-left-enter-active,
.v-fade-left-leave-active,
.v-fade-left-move {
  transition: all 0.5s;
}

.v-fade-left-enter,
.v-fade-left-leave-to {
  opacity: 0;
  transform: translateX(500px) scale(0.2);
}
</style>

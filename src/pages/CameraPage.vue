<template>
  <q-page padding class="flex flex-center">
    <div class="row full-width">
      <div class="col-12 col-sm-6">
        <div class="q-pr-sm-md">
          <!--          <div class="aspect-ratio-3by4 q-mx-auto" style="max-width: 300px" v-show="!imageCaptured">-->
          <!--            <video class="full-width full-height bg-black aspect-ratio-item" ref="selfie_cam" autoplay-->
          <!--                   style="transform: scaleX(-1);"/>-->
          <!--            <img src="images/user-outline.png" alt="user outline" class="absolute" style="top: 0;left: 0;">-->
          <!--          </div>-->
          <!--          <canvas class="full-width" ref="selfie_canvas" v-show="imageCaptured"/>-->
          <img :src="imageSrc" alt="blank image" class="q-mx-auto block" @click="takeSelfie">
        </div>
      </div>
      <div class="col-12 col-sm-6 flex flex-center">
        <div class="q-pl-sm-md full-width">
          <div class="text-center">
            <h4 class="q-mt-md q-mt-sm-none q-mb-md">
              Yeremia
            </h4>
          </div>
          <div class="row q-mt-md gt-md">
            <div class="col-6">
              <div class="q-pr-sm">
                <q-btn label="Clock In" color="positive" size="lg" class="block full-width"/>
              </div>
            </div>
            <div class="col-6">
              <div class="q-pl-sm">
                <q-btn label="Clock Out" color="negative" size="lg" class="block full-width" disable/>
              </div>
            </div>
          </div>
          <div class="q-mt-md q-mb-md">
            <q-list bordered separator>
              <q-item>
                <q-item-section>
                  <q-item-label>Item with caption</q-item-label>
                  <q-item-label caption>
                    Clock Out
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label>Item with caption</q-item-label>
                  <q-item-label caption>
                    Clock In
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style lang="scss" scoped>
.aspect-ratio-3by4 {
  position: relative;

  &:before {
    display: block;
    content: '';
    padding-top: 4 / 3 * 100%;
  }

  .aspect-ratio-item {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>

<script>
import {CameraDirection, CameraResultType, CameraSource, Plugins} from '@capacitor/core';

const {Camera} = Plugins;

export default {
  name: 'CameraPage',

  data() {
    return {
      hasCameraSupport: true,
      imageCaptured: false,
      selfie: null,
      imageSrc: 'images/blank_portrait_pointer.png',
      clockedIn: false
    };
  },

  methods: {
    async takeSelfie() {
      const image = await Camera.getPhoto({
        allowEditing: false,
        direction: CameraDirection.Front,
        width: 300,
        height: 400,
        source: CameraSource.Camera,
        quality: 90,
        resultType: CameraResultType.Uri
      });
      // image.webPath will contain a path that can be set as an image src.
      // You can access the original file using image.path, which can be
      // passed to the Filesystem API to read the raw data of the image,
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      this.imageSrc = image.webPath;
      console.log('clock in');
    }
  },

  mounted() {
    this.takeSelfie();
  }
};
</script>

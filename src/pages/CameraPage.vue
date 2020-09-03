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
          <img :src="imageSrc" class="q-mx-auto block">
        </div>
      </div>
      <div class="col-12 col-sm-6 flex flex-center">
        <div class="q-pl-sm-md full-width">
          <div class="text-center">
            <h4 class="q-mt-md q-mt-sm-none q-mb-md">
              Yeremia
            </h4>
          </div>
          <div class="row q-mt-md">
            <div class="col-6">
              <div class="q-pr-sm">
                <q-btn label="Clock In" color="positive" size="lg" class="block full-width" @click="takeSelfie"/>
              </div>
            </div>
            <div class="col-6">
              <div class="q-pl-sm">
                <q-btn label="Clock Out" color="negative" size="lg" class="block full-width" @click="clockIn" disable/>
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
      imageSrc: 'images/blank_portrait.png'
    };
  },

  methods: {
    async takeSelfie() {
      const image = await Camera.getPhoto({
        allowEditing: false,
        direction: CameraDirection.Front,
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
    },
    initCamera() {
      if (this.$q.platform.is.capacitor) {
        console.log('must init capacitor camera');
      } else {
        this.initBrowserCamera();
      }
    },
    initBrowserCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        this.$refs.selfie_cam.srcObject = stream;
      }).catch(error => {
        this.hasCameraSupport = false;
      });
    },
    disableCamera() {
      if (this.$q.platform.is.capacitor) {
        console.log('must init capacitor camera');
      } else {
        this.disableBrowserCamera();
      }
    },
    disableBrowserCamera() {
      this.$refs.selfie_cam.srcObject.getVideoTracks().forEach(track => track.stop());
    },
    clockIn() {
      this.captureImage();
      this.$q.dialog({
        title: 'Confirm',
        message: 'Clock-in sekarang?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        this.imageCaptured = false;
        this.initBrowserCamera();
        this.selfie = null;
      });
    },
    captureImage() {
      let video = this.$refs.selfie_cam;
      let canvas = this.$refs.selfie_canvas;
      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;
      let ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageCaptured = true;
      this.selfie = this.dataURItoBlob(canvas.toDataURL());
    },
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      var ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], {type: mimeString});
      return blob;

    }
  },

  mounted() {
    this.initCamera();
  },

  beforeDestroy() {
    if (this.hasCameraSupport) {
      this.disableCamera();
    }
  }
};
</script>

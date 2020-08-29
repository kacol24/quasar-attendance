<template>
  <q-page padding>
    <div style="max-width: 500px" class="q-mx-auto q-pa-md">
      <video class="full-width" ref="selfie_cam" autoplay style="max-height: 500px; transform: scaleX(-1)"
             v-show="!imageCaptured"/>
      <canvas class="full-width" ref="selfie_canvas" style="max-height: 500px; background-color:green;"
              v-show="imageCaptured"/>
      <div class="row q-mt-md">
        <div class="col-6">
          <div class="q-pr-md">
            <q-btn label="Clock In" color="positive" class="block full-width" @click="clockIn"/>
          </div>
        </div>
        <div class="col-6">
          <div class="q-pl-md">
            <q-btn label="Clock In" color="negative" class="block full-width" @click="confirm" disable/>
          </div>
        </div>
      </div>
      <div class="q-mt-md">
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
  </q-page>
</template>

<script>
export default {
  name: 'CameraPage',

  data() {
    return {
      hasCameraSupport: true,
      imageCaptured: false,
      selfie: null
    };
  },

  methods: {
    initCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        this.$refs.selfie_cam.srcObject = stream;
      }).catch(error => {
        this.hasCameraSupport = false;
      });
    },
    disableCamera() {
      this.$refs.selfie_cam.srcObject.getVideoTracks().forEach(track => track.stop());
    },
    clockIn() {
      this.captureImage();
      this.$q.dialog({
        title: 'Confirm',
        message: 'Would you like to turn on the wifi?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        // console.log('>>>> OK')
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
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

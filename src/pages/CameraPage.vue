<template>
  <q-page padding>
    <div style="max-width: 500px" class="q-mx-auto q-pa-md">
      <video class="full-width" autoplay ref="selfie_cam"/>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'CameraPage',

  data() {
    return {
      hasCameraSupport: true
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

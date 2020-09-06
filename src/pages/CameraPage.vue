<template>
  <q-page padding class="flex flex-center">
    <div class="row full-width">
      <div class="col-12 col-sm-6">
        <div class="q-pr-sm-md full-height flex flex-center">
          <div class="row full-width">
            <div class="col-12">
              <div class="q-mx-auto" style="max-width: 300px">
                <q-responsive :ratio="3/4" :style="[imageSrc ? {'background-image': 'url('+ imageSrc +')'} : '']"
                              style="background-size: cover; background-position: center" @click="takeSelfie">
                  <img src="images/blank_portrait_pointer.png" alt="blank image" class="q-mx-auto block"
                       style="max-width: 100%; height: auto;" v-if="!imageSrc">
                </q-responsive>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 flex flex-center">
        <div class="q-pl-sm-md full-width">
          <div class="text-center">
            <h4 class="q-mt-md q-mt-sm-none q-mb-md" v-if="selectedEmployee">
              {{ selectedEmployee.name }}
            </h4>
          </div>

          <template v-if="selectedEmployee">
            <q-slide-item @left="clockIn" left-color="positive" v-if="!selectedEmployee.on_shift" :disabled="!selfie">
              <template v-slot:left v-if="selfie">
                <div class="row items-center">
                  <q-icon name="play_circle_filled" class="q-mr-md"/>
                  Clock In
                </div>
              </template>

              <q-item v-ripple class="bg-green-4" dark :disabled="!selfie">
                <q-item-section avatar class="animated slideOutRight infinite" style="animation-duration: 2s;">
                  <q-avatar color="positive" text-color="white" icon="double_arrow"/>
                </q-item-section>
                <q-item-section class="text-weight-bolder q-ml-xl">
                  MULAI SHIFT
                </q-item-section>
              </q-item>
            </q-slide-item>

            <q-slide-item @left="clockOut" left-color="negative" v-if="selectedEmployee.on_shift" :disabled="!selfie">
              <template v-slot:left v-if="selfie">
                <div class="row items-center">
                  <q-icon name="stop" class="q-mr-md"/>
                  Clock Out
                </div>
              </template>

              <q-item v-ripple class="bg-red-4" dark :disabled="!selfie">
                <q-item-section avatar class="animated slideOutRight infinite" style="animation-duration: 2s;">
                  <q-avatar color="negative" text-color="white" icon="double_arrow"/>
                </q-item-section>
                <q-item-section class="text-weight-bolder q-ml-xl">
                  AKHIRI SHIFT
                </q-item-section>
              </q-item>
            </q-slide-item>
          </template>
          <div class="q-mt-md q-mb-md" v-if="selectedEmployee && selectedEmployee.attendances">
            <q-list bordered separator v-for="attendance in selectedEmployee.attendances" :key="attendance.id">
              <q-item v-if="attendance.end_at" class="bg-red-1">
                <q-item-section>
                  <q-item-label>
                    Clock Out
                  </q-item-label>
                  <q-item-label caption>
                    {{ attendance.formatted_end_at }}
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item v-if="attendance.start_at" class="bg-green-1">
                <q-item-section>
                  <q-item-label>
                    Clock In
                  </q-item-label>
                  <q-item-label caption>
                    {{ attendance.formatted_start_at }}
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

.q-list:not(:last-child) {
  border-bottom: 0;
}
</style>

<script>
import {CameraDirection, CameraResultType, CameraSource, Plugins} from '@capacitor/core';

const {Camera} = Plugins;

export default {
  name: 'CameraPage',

  data() {
    return {
      selfie: null,
      imageSrc: null,
      selectedEmployee: {
        name: null,
        on_shift: false
      }
    };
  },

  methods: {
    async takeSelfie() {
      if (!this.requireSelfie()) {
        return false;
      }
      try {
        const image = await Camera.getPhoto({
          allowEditing: false,
          direction: CameraDirection.Front,
          height: 400,
          source: CameraSource.Camera,
          quality: 90,
          resultType: CameraResultType.Uri
        });

        if (image) {
          this.imageSrc = image.webPath;
          this.selfie = await fetch(image.webPath).then(r => r.blob());
        }
      } catch (e) {
        console.log(e);
      }
    },
    clockIn() {
      this.$q.loading.show();
      this.$store.dispatch('employee/clockIn', {selfie: this.selfie})
          .finally(() => {
            this.$q.loading.hide();
          });
    },
    clockOut() {
      this.$q.loading.show();
      this.$store.dispatch('employee/clockOut')
          .finally(() => {
            this.$q.loading.hide();
          });
    },
    requireSelfie() {
      if (!this.$q.platform.is.capacitor) {
        return false;
      }

      let latestAttendance = this.selectedEmployee.attendances[0];
      return !latestAttendance || latestAttendance.end_at !== null;
    }
  },

  mounted() {
    let employeeId = this.$route.params.employee_id;
    this.$store.dispatch('employee/selectEmployee', employeeId);
    this.selectedEmployee = this.$store.state.employee.selectedEmployee;
    if (!this.selectedEmployee) {
      return this.$router.back();
    }
    let latestAttendance = this.selectedEmployee.attendances[0];
    this.imageSrc = null;
    if (latestAttendance && latestAttendance.selfie) {
      this.imageSrc = latestAttendance.selfie_url;
    }
    this.takeSelfie();
  },

  beforeDestroy() {
    this.imageSrc = null;
  }
};
</script>

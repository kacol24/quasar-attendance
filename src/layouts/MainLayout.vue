<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round dense icon="arrow_back" v-show="this.$route.name !== 'home'" v-go-back.single/>
        <q-toolbar-title>
          Absensi Karyawan
          <small style="font-size: 50%">
            v1.0.2
          </small>
        </q-toolbar-title>

        <div class="gt-xs">
          {{ currentTime }}
        </div>
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white">
      <q-toolbar class="flex-center bg-primary lt-sm">
        {{ currentTime }}
      </q-toolbar>
    </q-footer>


    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.check-clock-buttons .q-tab__indicator {
  display: none !important;
}
</style>

<script>
import moment from 'moment';

moment.locale('id');

export default {
  name: 'MainLayout',
  data: function() {
    return {
      currentTime: ''
    };
  },
  methods: {
    getTime() {
      this.currentTime = moment().format('dddd, D MMMM Y (HH:mm:ss)');
    },
    startTimer() {
      setInterval(() => this.getTime(), 1000);
    }
  },
  mounted() {
    this.startTimer();
    this.$store.dispatch('employee/loadEmployees');
  }
};
</script>

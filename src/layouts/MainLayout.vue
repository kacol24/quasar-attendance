<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Absensi Karyawan
        </q-toolbar-title>

        <div class="orientation-landscape">
          {{ currentTime }}
        </div>
      </q-toolbar>
    </q-header>

    <q-footer elevated class="orientation-portrait">
      <q-toolbar class="flex-center">
        {{ currentTime }}
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

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
  }
};
</script>

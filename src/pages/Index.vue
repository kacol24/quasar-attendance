<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 col-sm-6 order-last order-sm-first">
        <div class="q-pa-sm">
          <q-card>
            <q-card-section class="bg-grey-3">
              <div class="text-h5">Off</div>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col-6" v-for="employee in off_employees" :key="employee.id">
                  <div class="q-pa-sm">
                    <q-btn :to="{ name: 'camera.index', params: {employee_id: employee.id} }" :label="employee.name"
                           class="block q-py-md"/>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="col-12 col-sm-6 order-first order-sm-last">
        <div class="q-pa-sm">
          <q-card>
            <q-card-section class="bg-positive text-white">
              <div class="text-h5">On Shift</div>
            </q-card-section>
            <q-card-section>
              <div class="row">
                <div class="col-6" v-for="employee in on_employees">
                  <div class="q-pa-sm">
                    <q-btn :to="{ name: 'camera.index', params: {employee_id: employee.id} }" :label="employee.name"
                           class="block q-py-md"/>
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',

  data() {
    return {
      off_employees: [],
      on_employees: []
    };
  },

  mounted() {
    this.off_employees = this.$store.getters['employee/offEmployees'];
    this.on_employees = this.$store.getters['employee/onEmployees'];
  }
};
</script>

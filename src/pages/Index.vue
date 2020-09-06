<template>
  <q-page padding>
    <q-pull-to-refresh @refresh="fetchEmployees">
      <div class="row">
        <div class="col-12 col-sm-6 order-last order-sm-first">
          <div class="q-pa-sm">
            <q-card>
              <q-card-section class="bg-grey-3">
                <div class="text-h5">Off</div>
              </q-card-section>
              <q-card-section>
                <div class="row">
                  <div class="col-6" v-for="employee in Array(2).keys()" v-if="employeeLoading">
                    <div class="q-pa-md">
                      <q-skeleton type="QBtn" class="block q-py-md full-width" style="height: 68px;"/>
                    </div>
                  </div>
                  <div class="col-6" v-for="employee in offEmployees" :key="employee.id" v-if="!employeeLoading">
                    <div class="q-pa-md">
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
                  <div class="col-6" v-for="employee in Array(2).keys()" v-if="employeeLoading">
                    <div class="q-pa-md">
                      <q-skeleton type="QBtn" class="block full-width" style="height: 68px;"/>
                    </div>
                  </div>
                  <div class="col-6" v-for="employee in onEmployees" v-if="!employeeLoading">
                    <div class="q-pa-md">
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
    </q-pull-to-refresh>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',

  methods: {
    fetchEmployees(done) {
      this.$store.dispatch('employee/loadEmployees').then(() => {
        done();
      });
    }
  },

  computed: {
    employeeLoading() {
      return this.$store.state.employee.isLoading;
    },
    offEmployees() {
      return this.$store.getters['employee/offEmployees'];
    },
    onEmployees() {
      return this.$store.getters['employee/onEmployees'];
    }
  }
};
</script>

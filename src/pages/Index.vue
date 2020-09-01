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
                <div class="col-6">
                  <div class="q-pa-sm">
                    <q-btn to="/camera" label="Yeremia" class="block q-py-md"/>
                  </div>
                </div>
                <div class="col-6">
                  <div class="q-pa-sm">
                    <q-btn to="/camera" label="Yeremia" class="block q-py-md"/>
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
                <div class="col-6">
                  <div class="q-pa-sm">
                    <q-btn to="/camera" label="Yeremia" class="block q-py-md"/>
                  </div>
                </div>
                <div class="col-6">
                  <div class="col-6">
                    <div class="q-pa-sm">
                      <q-btn to="/camera" label="Yeremia" class="block q-py-md"/>
                    </div>
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

  mounted() {
    this.$axios.get('http://backpack-payroll/api/employees');
  }
};
</script>

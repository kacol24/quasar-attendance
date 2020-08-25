<template>
  <q-page>
    <q-dialog v-model="card">
      <q-card style="min-width: 300px">
        <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg"/>

        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">
              Cafe Basilico
            </div>
            <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
              <q-icon name="place"/>
              250 ft
            </div>
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn v-close-popup flat color="primary" label="Reserve"/>
          <q-btn v-close-popup flat color="primary" round icon="event"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="q-pa-md">
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
                      <q-card>
                        <q-card-section>
                          <div class="text-h6">
                            Yeremia
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="q-pa-sm">
                      <q-card>
                        <q-card-section>
                          <div class="text-h6">
                            Yeremia
                          </div>
                        </q-card-section>
                      </q-card>
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
                      <q-card>
                        <q-card-section>
                          <div class="text-h6">
                            Yeremia
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                  <div class="col-6">
                    <div class="q-pa-sm">
                      <q-card>
                        <q-card-section>
                          <div class="text-h6">
                            Yeremia
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',

  data: function() {
    return {
      card: true
    };
  }
};
</script>

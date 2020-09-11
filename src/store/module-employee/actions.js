import api from '../../services/api';
import {Notify} from 'quasar';

export function selectEmployee(context, employeeId) {
  let employee = context.getters.findEmployeeById(employeeId);
  context.commit('setSelectedEmployee', employee);
}

export async function loadEmployees(context) {
  context.commit('startLoading');
  await api.employeesIndex()
           .then(response => {
             context.commit('setEmployees', response.data.data);
           })
           .finally(() => context.commit('doneLoading'));
}

export async function clockIn(context, {selfie}) {
  let selectedEmployee = context.state.selectedEmployee;
  const response = await api.clockIn(selectedEmployee.id, selfie);
  let employee = response.data;
  Notify.create({
    type: 'positive',
    message: employee.name + ': berhasil clock-in!',
    icon: 'play_circle_filled'
  });
  await context.dispatch('loadEmployees');
  this.$router.back();
}

export async function clockOut(context, {selfie}) {
  let selectedEmployee = context.state.selectedEmployee;
  const response = await api.clockOut(selectedEmployee.id, selfie);
  let employee = response.data;
  Notify.create({
    type: 'positive',
    message: employee.name + ': berhasil clock-out!',
    icon: 'stop_circle'
  });
  await context.dispatch('loadEmployees');
  this.$router.back();
}

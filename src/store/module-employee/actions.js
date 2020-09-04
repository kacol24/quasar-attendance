import axios from 'axios';

export function selectEmployee(context, employeeId) {
  let employee = context.getters.findEmployeeById(employeeId);
  context.commit('setSelectedEmployee', {employee});
}

export function loadEmployees(context) {
  axios.get('https://attendance.kamsia.kevinchandra.me/api/employees')
       .then(response => {
         context.commit('setEmployees', response.data.data);
       });
}

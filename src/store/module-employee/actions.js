import axios from 'axios';

export function selectEmployee(context, employeeId) {
  let employee = context.getters.findEmployeeById(employeeId);
  context.commit('setSelectedEmployee', {employee});
}

export function loadEmployees(context) {
  axios.get('http://backpack-payroll.docker/api/employees')
       .then(response => {
         context.commit('setEmployees', response.data.data);
       });
}

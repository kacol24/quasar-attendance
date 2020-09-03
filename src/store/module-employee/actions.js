export function selectEmployee(context, employeeId) {
  let employee = context.getters.findEmployeeById(employeeId);
  context.commit('setSelectedEmployee', {employee});
}

export function setSelectedEmployee(state, employee) {
  state.selectedEmployee = employee;
}

export function setEmployees(state, payload) {
  state.employees = payload;
}

export function startLoading(state) {
  state.isLoading = true;
}

export function doneLoading(state) {
  state.isLoading = false;
}

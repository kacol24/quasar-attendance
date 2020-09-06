export function offEmployees(state) {
  return state.employees.filter(employee => {
    return !employee.on_shift;
  });
}

export function onEmployees(state) {
  return state.employees.filter(employee => {
    return employee.on_shift;
  });
}

export function findEmployeeById(state) {
  return id => {
    return state.employees.find(employee => employee.id === parseInt(id));
  };
}

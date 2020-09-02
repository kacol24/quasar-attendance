export default {
  getEmployees() {
    this.$axios.get('http://backpack-payroll.docker/api/employees');
  }
};

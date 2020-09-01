export default {
  getEmployees() {
    this.$axios.get('http://backpack-payroll.test/api/employees');
  }
};

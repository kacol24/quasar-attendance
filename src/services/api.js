import axios from 'axios';

const BASE_URL = 'https://attendance.kamsia.kevinchandra.me/api';

export default {
  employeesIndex() {
    return axios.get(BASE_URL + '/employees');
  },
  clockIn(employeeId) {
    return axios.post(BASE_URL + '/employee/' + employeeId + '/clock-in');
  },
  clockOut(employeeId) {
    return axios.put(BASE_URL + '/employee/' + employeeId + '/clock-out');
  }
};

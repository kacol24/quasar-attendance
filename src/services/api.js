import axios from 'axios';

// const BASE_URL = 'https://attendance.kamsia.kevinchandra.me/api';
const BASE_URL = 'http://backpack-payroll.docker/api';

export default {
  employeesIndex() {
    return axios.get(BASE_URL + '/employees');
  },
  clockIn(employeeId, selfie) {
    let formData = new FormData();
    formData.append('selfie_in', selfie);
    return axios.post(
      BASE_URL + '/employee/' + employeeId + '/clock-in',
      formData
    );
  },
  clockOut(employeeId, selfie) {
    let formData = new FormData();
    formData.append('selfie_out', selfie);
    return axios.put(
      BASE_URL + '/employee/' + employeeId + '/clock-out',
      formData
    );
  }
};

import http from "../http-common";
class CRUDService {
  getUsers(data) {
    return http.post("/student/list?page=0&pageSize=10", data);
  }
  create(data) {
    return http.post("/student", data);
  }
}
export default new CRUDService();

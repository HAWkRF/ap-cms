import ApiModel from '../ApiModel'

class DepartmentsModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new DepartmentsModel ('/departments');
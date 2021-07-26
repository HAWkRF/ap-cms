import ApiModel from '../ApiModel'

class RoomsModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new RoomsModel ('/rooms');
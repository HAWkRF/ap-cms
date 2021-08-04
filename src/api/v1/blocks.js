import ApiModel from '../ApiModel'

class BlocksModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new BlocksModel ('/blocks');
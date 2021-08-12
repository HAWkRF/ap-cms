import ApiModel from '../ApiModel'

class PropertiesGoodsModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new PropertiesGoodsModel('/properties');
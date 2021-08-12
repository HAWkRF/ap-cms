import ApiModel from '../ApiModel'

class PropertiesItemsGoodsModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new PropertiesItemsGoodsModel('/properties-items');
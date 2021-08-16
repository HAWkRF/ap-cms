import ApiModel from '../ApiModel'

class PropertiesGoodsModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }

  getPropertiesItems() {
    return this.api.get(`${this.baseUrl}/properties?expand=propertiesItems`,);
  }
}

export default new PropertiesGoodsModel('/properties');
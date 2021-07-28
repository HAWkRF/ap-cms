import ApiModel from '../ApiModel'

class KbCat extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }
}

export default new KbCat ('/knowledgebase-categories');
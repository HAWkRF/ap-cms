import ApiModel from '../ApiModel'

class MainNewsModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }

  getMainNews(params) {
    return this.api.get(`${this.baseUrl}`, params);
  }
}

export default new MainNewsModel('/main-news');
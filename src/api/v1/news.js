import ApiModel from '../ApiModel'

class NewsModel extends ApiModel {
  getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
  }

  getNews(params) {
    return this.api.get(`${this.baseUrl}`, params);
  }
}

export default new NewsModel('/news');
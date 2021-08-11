import ApiModel from '../ApiModel'

class CategoriesGoogsModel extends ApiModel {
    getFilters(params) {
    return this.api.get(`${this.baseUrl}/filters`, params);
    }
    /*getQuery(params) {
        return this.api.get(`${this.baseUrl}?query=&title=${params}`);
    } */
    getCategoriesName(params) {
        return this.api.get(`${this.baseUrl}`, params);
    }
}

export default new CategoriesGoogsModel('/categories');
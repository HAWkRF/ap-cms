import ApiModel from '../ApiModel'

class CategoriesGoodsModel extends ApiModel {
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

export default new CategoriesGoodsModel('/categories');
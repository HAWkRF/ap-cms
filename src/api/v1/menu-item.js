import ApiModel from '../ApiModel'

class MenuItemModel extends ApiModel {
  getFilters(id) {
    return this.api.get(`${this.baseUrl}/item/filters/${id}`); // фильтры
  }
  getMenusId(id) {
      return this.api.get(`${this.baseUrl}/item/item-index/${id}`) // все пункты меню по ID меню
  }
  getItemId(id) {
      return this.api.get(`${this.baseUrl}/item/${id}`) // просмотр пункта меню
  }
  postItem() {
      return this.api.post(`${this.baseUrl}/item`) // добавление пункта
  }
  putMenuItem(id) {
    return this.api.put(`${this.baseUrl}/item/${id}`); // редактирование пункта
  }
  deleteItemId(id) {
    return this.api.delete(`${this.baseUrl}/item/${id}`) // удаление пункта
  }
}



export default new MenuItemModel('/menu');
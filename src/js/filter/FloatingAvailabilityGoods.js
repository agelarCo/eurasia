class FloatingAvailabilityGoods {
    constructor(selector, value, link) {
        this.selector = document.querySelector(selector)
        this.value = value
        this.link = link
        _init();
    }
    

    static deatroyThis() {
        let elemForDel = document.querySelector('.filter-btn-details-avialable--js')
        elemForDel.remove();
    }

    _createFloatChecker() {
        if (this.value == 0) {
            this.selector.insertAdjacentHTML('afterend', `<div
        class="filter-btn-details-avialable filter-btn-details-avialable--js"
      >
        <div class="filter-btn-details-avialable__inner-state">
          <div class="filter-btn-details-avialable__find-value">
            Ничего не найдено
          </div>
        </div>
      </div>`);
        } else {
            this.selector.insertAdjacentHTML('afterend', `<div
        class="filter-btn-details-avialable filter-btn-details-avialable--js"
      >
        <div class="filter-btn-details-avialable__inner-state">
          <div class="filter-btn-details-avialable__find-value">
            Найдено: <span>${this.value}</span>
          </div>
          <a href="${this.link}" class="filter-btn-details-avialable__link"
            >Посмотреть</a
          >
        </div>
      </div>`);
        }
        
    }
    _init() {
        this._createFloatChecker()
    }
}




export default FloatingAvailabilityGoods;
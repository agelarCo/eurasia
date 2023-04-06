class FloatingAvailabilityGoods {
    constructor(selector, value, link) {
        this.selector = selector;
        this.value = value
        this.link = link
        this._init();
    }
    

    static deatroyThis() {
        let elemForDel = document.querySelector('.filter-btn-details-avialable--js');
        if(elemForDel)
          elemForDel.remove();
    }

    _createFloatChecker() {
        if (this.value == 0) {
            this.selector.insertAdjacentHTML('afterbegin', `<div
        class="filter-btn-details-avialable filter-btn-details-avialable--js"
      >
          <div class="filter-btn-details-avialable__close filter-btn-details-avialable__close--js">
              <svg style="width: 10px; height: 10px" class="img">
                <use xlink:href="/assets/template/images/icons/icons.svg#close"></use>
            </svg>
        </div>
        <div class="filter-btn-details-avialable__inner-state">
          <div class="filter-btn-details-avialable__find-value">
            Ничего не найдено
          </div>
        </div>
      </div>`);
        } else {
            this.selector.insertAdjacentHTML('afterbegin', `<div
        class="filter-btn-details-avialable filter-btn-details-avialable--js"
      >
      <div class="filter-btn-details-avialable__close filter-btn-details-avialable__close--js">
              <svg style="width: 10px; height: 10px" class="img">
                <use xlink:href="/assets/template/images/icons/icons.svg#close"></use>
            </svg>
        </div>
        <div class="filter-btn-details-avialable__inner-state">
          <div class="filter-btn-details-avialable__find-value">
            Найдено: <span>${this.value}</span>
          </div>
          <a href='${this.link}' class="filter-btn-details-avialable__link"
            >Посмотреть</a
          >
        </div>
      </div>`);
        }
        
        const closeBtn = document.querySelector(".filter-btn-details-avialable__close--js");
        if(closeBtn){
          closeBtn.addEventListener("click", () => {
            FloatingAvailabilityGoods.deatroyThis();
          })
        }
    }
    _init() {
        this._createFloatChecker()
    }
}




export default FloatingAvailabilityGoods;
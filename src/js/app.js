import {
  isWebp,
  headerFixed,
  togglePopupWindows,
  addTouchClass,
  addLoadedClass,
  menuInit,
} from "./modules";

import Swiper, { Navigation, Pagination } from "swiper";
import SimpleBar from "simplebar";
import Tabs from "./tabs.js";
import { Modal } from "bootstrap";
import LazyLoad from "vanilla-lazyload";

import "./filter/Filter.js";
import StarRating from "./starRating.js";
import easyComm from "./easyComm.js";
import AgelarSelect from "./select/Select.js";

new AgelarSelect();

let ratings = document.querySelectorAll(".rating");
if (ratings) {
  ratings.forEach((elem, index) => {
    new StarRating(elem);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  easyComm.initialize();
});

var lazyLoadInstance = new LazyLoad({});

import PhotoSwipeLightbox from "photoswipe/lightbox";
import PhotoSwipe from "photoswipe";

const lightbox = new PhotoSwipeLightbox({
  gallery: "#gallery--no-dynamic-import",
  children: "a",
  pswpModule: PhotoSwipe,
});

lightbox.init();

if (
  document.querySelector(".product-detail-tabs") &&
  document.querySelector(".btn-char-movie")
) {
  let newTabs = new Tabs(".product-detail-tabs");

  const btnCharMovie = document.querySelector(".btn-char-movie");

  let charTabBtn = document.querySelectorAll(".tabs__btn")[1];

  btnCharMovie.addEventListener("click", () => {
    newTabs.show(charTabBtn);
    charTabBtn.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  });
}

if (document.querySelector(".product-detail-tabs")) {
  let newTabs = new Tabs(".product-detail-tabs");
}

function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, "transparent", "#25daa5", controlSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromSlider.value = from;
  }
}

function controlToInput(toSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, "transparent", "#ff3048", controlSlider);
  setToggleAccessible(toInput);
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
  }
}

function controlFromSlider(fromSlider, toSlider, fromInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, "transparent", "#ff3048", toSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromInput.value = from;
  }
}

function controlToSlider(fromSlider, toSlider, toInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, "transparent", "#ff3048", toSlider);
  setToggleAccessible(toSlider);
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
    toSlider.value = from;
  }
}

function getParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
}

function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
  const rangeDistance = to.max - to.min;
  const fromPosition = from.value - to.min;
  const toPosition = to.value - to.min;
  controlSlider.style.background = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
    ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
    ${sliderColor} ${(toPosition / rangeDistance) * 100}%, 
    ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget, item) {
  const toSlider = item.querySelector(
    ".filter-btn-dropdown-range__input-range--from"
  );
  if (Number(currentTarget.value) <= 0) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
}

const boxRangeFilter = document
  .querySelectorAll(".filter-btn-dropdown-range")
  .forEach(function (item) {
    const fromSlider = item.querySelector(
      ".filter-btn-dropdown-range__input-range--from"
    );
    const toSlider = item.querySelector(
      ".filter-btn-dropdown-range__input-range--to"
    );
    const fromInput = item.querySelector(
      ".filter-btn-dropdown-range__input--from"
    );
    const toInput = item.querySelector(".filter-btn-dropdown-range__input--to");

    if (toInput) {
      fillSlider(fromSlider, toSlider, "transparent", "#ff3048", toSlider);
      setToggleAccessible(toSlider, item);
      fromSlider.oninput = () =>
        controlFromSlider(fromSlider, toSlider, fromInput);
      toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
      fromInput.oninput = () =>
        controlFromInput(fromSlider, fromInput, toInput, toSlider);
      toInput.oninput = () =>
        controlToInput(toSlider, fromInput, toInput, toSlider);
    }
  });

const btnColExpand = document.querySelector(".filter-line-btn--col");
const btnRowExpand = document.querySelector(".filter-line-btn--row");
const productsGrid = document.querySelector(".products-grid");
if (btnColExpand) {
  btnRowExpand.addEventListener("click", () => {
    productsGrid.classList.add("products-grid--row");
    containsActiveClass(btnRowExpand);
  });
  btnColExpand.addEventListener("click", () => {
    productsGrid.classList.remove("products-grid--row");
    containsActiveClass(btnColExpand);
  });
}

function containsActiveClass(btn) {
  document.querySelectorAll(".filter-line-btn").forEach((elem, index) => {
    elem.classList.remove("filter-line-btn--active");
  });
  btn.classList.add("filter-line-btn--active");
}

const cartControlValueDecr = document.querySelector(
  ".cart-control-value__decr"
);
const cartControlValueInput = document.querySelector(
  ".cart-control-value__input"
);
const cartControlValueIncrem = document.querySelector(
  ".cart-control-value__increm"
);

let currentValue = 0;

if (cartControlValueDecr && cartControlValueIncrem) {
  cartControlValueDecr.addEventListener("click", () => {
    currentValue >= 1 ? currentValue-- : "";
    cartControlValueInput.value = currentValue;
  });

  cartControlValueIncrem.addEventListener("click", () => {
    currentValue++;
    cartControlValueInput.value = currentValue;
  });
}

window.addEventListener("scroll", () => {
  
});

let headerMenu = document.querySelector(".header-menu");
let headerButtonsClose = document.querySelectorAll(".header-menu-close");
headerButtonsClose.forEach((elem) => {
  elem.addEventListener("click", () => {
    headerMenu.classList.toggle("header-menu--visible");
  });
});
document
  .querySelectorAll(".header-menu-dropdown__scrollbox")
  .forEach((elem, index) => {
    new SimpleBar(elem);
  });

document
  .querySelectorAll(".catalog-card-overlay__scrollbox")
  .forEach((elem, index) => {
    new SimpleBar(elem);
  });

document
  .querySelectorAll(".drop-normal-menu__scroller")
  .forEach((elem, index) => {
    new SimpleBar(elem);
  });

document.querySelectorAll(".reviwe-block-scroller").forEach((elem, index) => {
  new SimpleBar(elem);
});
document.querySelectorAll("table").forEach((elem, index) => {
  if (
    elem.dataset.tableScroller == false ||
    elem.parentElement.parentElement.classList.contains("table-scroller")
  )
    return;

  let scrollerContainer = document.createElement("div");
  scrollerContainer.classList.add("table-scroller");
  elem.parentElement.insertBefore(scrollerContainer, elem);
  let containerTable = document.createElement("div");
  containerTable.classList.add("table-custom");
  containerTable.appendChild(elem);
  scrollerContainer.appendChild(containerTable);

  new SimpleBar(scrollerContainer);
});

document
  .querySelectorAll(".header-menu-simple-dropdown__scroller")
  .forEach((elem, index) => {
    new SimpleBar(elem);
  });

if (window.innerWidth <= 1200) {
  let buttonHeaderForExpand = document.querySelectorAll(
    ".header-menu__list-item-arrow"
  );
  let dropdownHeaderForExpand = document.querySelectorAll(
    ".header-all-dropdown"
  );
  buttonHeaderForExpand.forEach((btn, idx) => {
    btn.addEventListener("click", (e) => {
      //console.log(idx, dropdownHeaderForExpand)
      if(dropdownHeaderForExpand[idx])
        dropdownHeaderForExpand[idx].classList.toggle('header-all-dropdown--active')
    });
  });
}

document
  .querySelectorAll(".breadcrumb-list__sublinks-scrollbox")
  .forEach((elem, index) => {
    if (elem.parentElement.clientHeight < elem.clientHeight)
      elem.parentElement.style.height = elem.parentElement.clientHeight + "px";

    new SimpleBar(elem);
  });

document
  .querySelectorAll(".filter-btn-dropdown__scroller")
  .forEach((elem, index) => {
    // if(elem.parentElement.clientHeight < elem.clientHeight)
    //   elem.parentElement.style.height = elem.parentElement.clientHeight + "px";

    new SimpleBar(elem);
  });

let filterBtnMore = document.querySelector(".filter-btn--more");
let filterBlock = document.querySelector(".filter-block");
if (filterBtnMore) {
  filterBtnMore.addEventListener("click", () => {
    let textBtn = filterBtnMore.querySelector("span");
    let toggleText = filterBtnMore.getAttribute("data-toggle-text");
    filterBtnMore.setAttribute("data-toggle-text", textBtn.textContent);
    textBtn.textContent = toggleText;

    let open = !Boolean(Number(filterBtnMore.getAttribute("data-open")));
    filterBtnMore.setAttribute("data-open", Number(open));

    let start = Number(filterBtnMore.dataset.start);
    if (isNaN(start)) start = 0;

    for (let i = start; i < filterBlock.children.length - 1; i++) {
      if (open) {
        filterBlock.children[i].classList.remove("d-none");
      } else {
        filterBlock.children[i].classList.add("d-none");
      }
    }

    filterBlock.classList.toggle("filter-block--rolled");
  });
}

/* Переключатель вида карточек ниже */

/* if (document.querySelector('.products-grid')) {
  document.querySelectorAll(".filter-line-btn--expand-toggler").forEach((elem, index) => {
  elem.addEventListener('click', () => {
    document.querySelector('.products-grid').classList.toggle('products-grid--row')
  })
});
}
 */

let headerMenuDropdownListsLinks = document.querySelectorAll(
  ".header-menu-dropdown__list-link--js"
);

let filter = document.querySelector(".filter");
let filterExpandBtns = document.querySelectorAll(".filter-expand-toggler");

filterExpandBtns.forEach((element) => {
  element.addEventListener("click", () => {
    filter.classList.toggle("filter--show");
  });
});

headerMenuDropdownListsLinks.forEach((element) => {
  let btnExpand = element.querySelector(".header-menu-dropdown-btn-expand");
  if (btnExpand)
    btnExpand.addEventListener("click", (event) => {
      switch (event.target.textContent) {
        case "Ещё":
          event.target.textContent = "Свернуть";
          break;

        case "Свернуть":
          event.target.textContent = "Ещё";
          break;
      }

      let linksContaainer = element.querySelector(
        ".header-menu-dropdown__list-link"
      );
      if (linksContaainer)
        linksContaainer.classList.toggle(
          "header-menu-dropdown__list-link--expand"
        );
    });
});

document.querySelectorAll(".products-card-char-list").forEach((elem, index) => {
  new SimpleBar(elem);
});

/* let boxForfilterCheckboxes = document.querySelectorAll('.filter-btn-dropdown__container')
boxForfilterCheckboxes.querySelectorAll('input:checked')
boxForfilterCheckboxes.forEach(boxForcheckboxes => {
  
}); */

/* let nweCheck = document.querySelectorAll('.filter-btn-dropdown__container')
 */

/* Отвечает за работу контейнера, перекрыващего карточку, когда нажата кнока с вопросом. 
Необходимо в скрите, который будет подгружать карточки при перелистывании 
пагинации, добавлять новые подгруенные карточи в nodeList - "productOverflowButtonToggle" */

/* products-card */

let productCart = document.querySelectorAll(".products-card");
let productOverflow = document.querySelectorAll(".products-card__overflow");
/* let productOverflowButtonToggle = document.querySelectorAll(
  ".products-card-overflow-toggle"
); */

/* productCart.forEach((elem, indexOne) => {
  elem
    .querySelectorAll(".products-card__inner-image")
    .forEach((element, indexTwo) => {
      element.addEventListener("mouseover", () => {
        productOverflow[indexOne].classList.toggle(
          "products-card__overflow--active"
        );
      });
      element.addEventListener("mouseout", () => {
        productOverflow[indexOne].classList.toggle(
          "products-card__overflow--active"
        );
      });
    });
}); */

let headerContainer = document.querySelector(".header");
let currentScroll;
window.addEventListener("scroll", () => {
  currentScroll = window.pageYOffset;
  if (Number(currentScroll) > 0) {
    headerContainer.classList.add("header--fixed");
  } else {
    headerContainer.classList.remove("header--fixed");
  }

  /* if (Number(currentScroll) > 150) {
    floatMenu.classList.add("float-menu--visible");
  } else {
    floatMenu.classList.remove("float-menu--visible");
  } */
});

const certSlider = new Swiper(".cert-slider", {
  modules: [Navigation, Pagination],
  navigation: {
    prevEl: ".cert-slider-button-prev",
    nextEl: ".cert-slider-button-next",
  },
  spaceBetween: 30,
  breakpoints: {
    1200: {
      spaceBetween: 30,
      slidesPerView: 4,
    },
    768: {
      spaceBetween: 15,
      slidesPerView: 3,
    },
    320: {
      spaceBetween: 15,
      slidesPerView: 2,
    },
  },
});

const serviceSlider = new Swiper(".service-slider", {
  modules: [Navigation, Pagination],
  navigation: {
    prevEl: ".service-slider-button-prev",
    nextEl: ".service-slider-button-next",
  },
  spaceBetween: 30,
  breakpoints: {
    992: {
      spaceBetween: 30,
    },
    320: {
      spaceBetween: 15,
    },
  },
});

const productsSlider = new Swiper(".products-slider", {
  modules: [Pagination],
  slidesPerView: 1,
  spaceBetween: 30,
  pagination: {
    el: ".products-slider__pagination",
    clickable: true,
    type: "bullets",
  },
});

const recomendedGoodsSlider = new Swiper(".recomended-goods-slider", {
  modules: [Navigation],
  slidesPerView: 4,
  spaceBetween: 30,
  navigation: {
    prevEl: ".recomended-goods-slider-button-prev",
    nextEl: ".recomended-goods-slider-button-next",
  },
  breakpoints: {
    1440: {
      slidesPerView: 4,
    },
    992: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
  },
});

let usefullArticlesSlider = new Swiper(".usefull-articles-slider", {
  modules: [Navigation],
  spaceBetween: 30,
  navigation: {
    prevEl: ".usefull-articles-slider-button-prev",
    nextEl: ".usefull-articles-slider-button-next",
  },
  breakpoints: {
    768: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
  },
});

let newsSlider = new Swiper(".news-slider", {
  modules: [Navigation],
  spaceBetween: 30,
  navigation: {
    prevEl: ".news-slider-button-prev",
    nextEl: ".news-slider-button-next",
  },
  breakpoints: {
    768: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
  },
});

let jobSearchSlider = new Swiper(".job-search-slider", {
  modules: [Navigation],
  spaceBetween: 30,
  navigation: {
    prevEl: ".job-search-slider-button-prev",
    nextEl: ".job-search-slider-button-next",
  },
  breakpoints: {
    768: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
  },
});

let ourPartners = new Swiper(".our-partners-slider", {
  modules: [Navigation],
  spaceBetween: 30,
  navigation: {
    prevEl: ".our-partners-slider-button-prev",
    nextEl: ".our-partners-slider-button-next",
  },
  breakpoints: {
    1200: {
      slidesPerView: 3,
    },
    768: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 15,
    },
  },
});

let recomendedSlider = new Swiper(".recomended-slider", {
  modules: [Navigation],
  spaceBetween: 30,
  navigation: {
    prevEl: ".recomended-slider-button-prev",
    nextEl: ".recomended-slider-button-next",
  },
  breakpoints: {
    1440: {
      slidesPerView: 4,
    },
    992: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
  },
});

let previouslyViewed = new Swiper(".previously-viewed-slider", {
  modules: [Navigation],
  spaceBetween: 30,
  navigation: {
    prevEl: ".previously-viewed-slider-button-prev",
    nextEl: ".previously-viewed-slider-button-next",
  },
  breakpoints: {
    1440: {
      slidesPerView: 4,
    },
    992: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
  },
});

let popularProducts = new Swiper(".popular-products", {
  modules: [Navigation],
  spaceBetween: 30,
  navigation: {
    prevEl: ".popular-products-button-prev",
    nextEl: ".popular-products-button-next",
  },
  breakpoints: {
    1440: {
      slidesPerView: 4,
    },
    992: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
  },
});

let relatedProducts = new Swiper(".related-products", {
  modules: [Navigation],
  spaceBetween: 30,
  navigation: {
    prevEl: ".related-products-button-prev",
    nextEl: ".related-products-button-next",
  },
  breakpoints: {
    1440: {
      slidesPerView: 4,
    },
    992: {
      spaceBetween: 30,
      slidesPerView: 3,
    },
    320: {
      slidesPerView: 2,
      spaceBetween: 15,
    },
  },
});

const topSlider = new Swiper(".top-slider", {
  modules: [Pagination],
  pagination: {
    el: ".top-slider__pagination",
    clickable: true,
    type: "bullets",
  },
  autoHeight: true,
});

let inputFile = document.querySelector(".input-file");
let blockContainer = document.querySelector(
  ".modal-custom-attach__inner-image"
);
if (inputFile) {
  inputFile.addEventListener("input", (e) => {
    const unraw = e.target.files[0];
    let image = blockContainer.querySelector("img");
    if (image) {
      image.remove();
    }
    let reader = new FileReader();
    reader.readAsDataURL(unraw);
    reader.onload = (e) => {
      let images = document.createElement("img");
      images.width = 150;
      images.style.cssText = "margin: 10px 0";
      images.src = e.target.result;
      blockContainer.append(images);
    };
  });
}
document.querySelectorAll(".sort-products--js").forEach(function (item) {
  item.querySelectorAll("[name='sort'").forEach(function (input) {
    input.addEventListener("input", function () {
      let url = new URL(window.location.href);
      url.searchParams.set("sort", this.value);
      window.location.href = url.href;
    });
  });
});

const bannerCategory = document.querySelector("#banner-category--js");
if (bannerCategory) {
  let image = bannerCategory.dataset.image;
  let imageMobile = bannerCategory.dataset.imageMobile;
  bannerCategory.remove();
  let picture = `
    <div class="products-grid-image">
      <picture>
        <source srcset="${imageMobile}" media="(max-width: 768px)">
        <img class="wp-100" src="${image}" alt="Баннер">
      </picture>
    </div>
  `;

  const productContainer = document.querySelector("#products-container--js");
  if (productContainer) {
    let products = productContainer.querySelectorAll(".products-card");
    let pos = -1;
    if (products.length > 3) {
      if (products.length % 2) {
        pos = (products.length - (products.length % 2)) / 2;
      } else {
        pos = products.length / 2;
      }
      pos -= 1;
    } else if (products.length == 1) {
      pos = 0;
    }

    
    if (pos != -1) {
      products[pos].insertAdjacentHTML("afterend", picture);
    } else {
      productContainer.insertAdjacentHTML("beforeend", picture);
    }
  }
}

let btnsByOneClick = document.querySelectorAll(
  "[data-bs-target='#modalOrder'], [data-bs-target='#modalQuestionProduct'], [data-bs-target='#modalGetPriceProduct']"
);
btnsByOneClick.forEach(function (el) {
  let form = document.querySelector(el.dataset.bsTarget + " form");
  if (form) {
    let input = form.querySelector("[name='product']");
    if (input && el.dataset.product) {
      input.value = el.dataset.product;
    }
  }
});

document.querySelectorAll(".agelarForm").forEach(function (item) {
  item.addEventListener("agelar-form-before-success", function (e) {
    const closeBtn = this.querySelector(".modal-custom-close");
    if (closeBtn) {
      closeBtn.click();
    }
  });
});

let filterButtons = document.querySelectorAll(
  ".filter-btn input[type=checkbox]"
);

filterButtons.forEach((btn, idx) => {
  btn.addEventListener("input", (e) => {
    let currentBtn = btn.closest(".filter-btn");

    isActiveFilterBtn(currentBtn);
  });
});

window.addEventListener("load", (e) => {
  document.querySelectorAll(".filter-btn").forEach((btn, idx) => {
    isActiveFilterBtn(btn);
  });
});

function isActiveFilterBtn(elem) {
  let counterActive = elem.querySelectorAll(
    ".custom-checkbox input[type=checkbox]:checked"
  );
  if (counterActive.length) {
    elem.classList.add("filter-btn--inside-active");
  } else {
    elem.classList.remove("filter-btn--inside-active");
  }
}

/* if (window.innerWidth < 1200) {
  let arrowExpandForMenu = document.querySelectorAll(
  ".header-menu__list-item .header-menu__list-item-arrow"
);

let dropdownForMenu = document.querySelectorAll(
  ".header-all-dropdown"
);

arrowExpandForMenu.forEach((elem, index) => {
  elem.addEventListener('click', () => {
    elem.classList.toggle('header-menu__list-item-arrow--active')
    dropdownForMenu[index].classList.toggle('header-all-dropdown--active')
  })
})
} */

window["FLS"] = location.hostname === "localhost";

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



var lazyLoadInstance = new LazyLoad({
});




if (document.querySelector(".product-detail-tabs")) {
  new Tabs(".product-detail-tabs");
}

/* 
function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
  if (from > to) {
      fromSlider.value = to;
      fromInput.value = to;
  } else {
      fromSlider.value = from;
  }
}
  
function controlToInput(toSlider, fromInput, toInput, controlSlider) {
  const [from, to] = getParsed(fromInput, toInput);
  fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
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
fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
if (from > to) {
  fromSlider.value = to;
  fromInput.value = to;
} else {
  fromInput.value = from;
}
}

function controlToSlider(fromSlider, toSlider, toInput) {
const [from, to] = getParsed(fromSlider, toSlider);
fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
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
  const rangeDistance = to.max-to.min;
  const fromPosition = from.value - to.min;
  const toPosition = to.value - to.min;
  controlSlider.style.background = `linear-gradient(
    to right,
    ${sliderColor} 0%,
    ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
    ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
    ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
    ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
    ${sliderColor} 100%)`;
}

function setToggleAccessible(currentTarget) {
const toSlider = document.querySelector('#toSlider');
if (Number(currentTarget.value) <= 0 ) {
  toSlider.style.zIndex = 2;
} else {
  toSlider.style.zIndex = 0;
}
}

const fromSlider = document.querySelector('.filter-btn-dropdown-range__input-range--from');
const toSlider = document.querySelector('.filter-btn-dropdown-range__input-range--to');
const fromInput = document.querySelector('#fromInput');
const toInput = document.querySelector('#toInput');
fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
setToggleAccessible(toSlider);

fromSlider.oninput = () => controlFromSlider(fromSlider, toSlider, fromInput);
toSlider.oninput = () => controlToSlider(fromSlider, toSlider, toInput);
fromInput.oninput = () => controlFromInput(fromSlider, fromInput, toInput, toSlider);
toInput.oninput = () => controlToInput(toSlider, fromInput, toInput, toSlider);

 */


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

document.querySelectorAll(".reviwe-block-scroller").forEach((elem, index) => {
  new SimpleBar(elem);
});
document.querySelectorAll(".table-scroller").forEach((elem, index) => {
  new SimpleBar(elem);
});

document
  .querySelectorAll(".breadcrumb-list__sublinks-scrollbox")
  .forEach((elem, index) => {
    new SimpleBar(elem);
  });

let filterBtnMore = document.querySelector(".filter-btn--more");
let filterBlock = document.querySelector(".filter-block");
if (filterBtnMore) {
  filterBtnMore.addEventListener("click", () => {
    let textBtn = filterBtnMore.querySelector("span");

    switch (textBtn.textContent) {
      case "Развернуть ещё":
        textBtn.textContent = "Свернуть";
        break;

      case "Свернуть":
        textBtn.textContent = "Развернуть ещё";
        break;
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
  ".header-menu-dropdown__list-link"
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
  btnExpand.addEventListener("click", (event) => {
    switch (event.target.textContent) {
      case "Ещё":
        event.target.textContent = "Свернуть";
        break;

      case "Свернуть":
        event.target.textContent = "Ещё";
        break;
    }
    element.classList.toggle("header-menu-dropdown__list-link--expand");
  });
});

document.querySelectorAll(".products-card-char-list").forEach((elem, index) => {
  new SimpleBar(elem);
});

/* Отвечает за работу контейнера, перекрыващего карточку, когда нажата кнока с вопросом. 
Необходимо в скрите, который будет подгружать карточки при перелистывании 
пагинации, добавлять новые подгруенные карточи в nodeList - "productOverflowButtonToggle" */

/* products-card */

let productCart = document.querySelectorAll(".products-card");
let productOverflow = document.querySelectorAll(".products-card__overflow");
let productOverflowButtonToggle = document.querySelectorAll(
  ".products-card-overflow-toggle"
);

productCart.forEach((elem, indexOne) => {
  elem
    .querySelectorAll(".products-card-overflow-toggle")
    .forEach((element, indexTwo) => {
      element.addEventListener("click", () => {
        productOverflow[indexOne].classList.toggle(
          "products-card__overflow--active"
        );
      });
    });
});

let headerContainer = document.querySelector(".header");
let floatMenu = document.querySelector(".float-menu");
let currentScroll;
window.addEventListener("scroll", () => {
  currentScroll = window.pageYOffset;
  if (Number(currentScroll) > 0) {
    headerContainer.classList.add("header--fixed");
  } else {
    headerContainer.classList.remove("header--fixed");
  }

  if (Number(currentScroll) > 150) {
    floatMenu.classList.add("float-menu--visible");
  } else {
    floatMenu.classList.remove("float-menu--visible");
  }
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

window["FLS"] = location.hostname === "localhost";

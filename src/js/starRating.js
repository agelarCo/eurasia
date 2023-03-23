const ratings = document.querySelectorAll(".rating");
if (ratings.length > 0) {
  initRatings();
}
// Основная функция
function initRatings() {
  let ratingActive, ratingValue;
  // "Бегаем" по всем рейтингам на странице
  for (let index = 0; index < ratings.length; index++) {
    const rating = ratings[index];
    initRating(rating);
  }

  function initRating(rating) {
    initRatingVars(rating);
    setRatingActiveWidth();

    if (rating.classList.contains("rating--set")) {
      setRating(rating);
    }
  }
  function initRatingVars(rating) {
    ratingActive = rating.querySelector(".rating__active");
    ratingValue = rating.querySelector(".rating__value");
  }

  function setRatingActiveWidth(index = ratingValue.innerHTML) {
    const ratingActiveWidth = index / 0.05;
    ratingActive.style.width = `${ratingActiveWidth}%`;
  }

  function setRating(rating) {
    const ratingItems = rating.querySelectorAll(`.rating__items`);
    for (let index = 0; index < ratingItems.length; index++) {
      const ratingItem = ratingItems[index];
      ratingItem.addEventListener("mouseenter", (e) => {
        initRatingVars(rating);
        setRatingActiveWidth(ratingItem.value);
      });
      ratingItem.addEventListener("mouseleave", (e) => {
        setRatingActiveWidth();
      });
      ratingItem.addEventListener("click", (e) => {
        initRatingVars(rating);
        ratingValue.innerHTML = index + 1;
        setRatingActiveWidth();
      });
    }
  }
}

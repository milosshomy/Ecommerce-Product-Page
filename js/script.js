//Hamburger animations

const hamburger = document.querySelector(".hamburger");
const menu = document.querySelector(".menu");
const body = document.querySelector("body");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("open");
  body.classList.toggle("fixed");
  body.classList.toggle("blur");
});

//Slider

const prevMobileBtn = document.querySelector(".mobile-prev-btn");
const nextMobileBtn = document.querySelector(".mobile-next-btn");
const desktopIndicators = Array.from(
  document.querySelectorAll(".slider-indicator")
);
const desktopActiveImg = document.querySelector(".slider-desktop-active img");
const lightBoxImg = document.querySelector(".lightbox-active-img");
const closeIcon = document.querySelector(".lightbox-active img");
const lightBoxIndicators = Array.from(
  document.querySelectorAll(".lightbox-indicator")
);
const lightBoxNextBtn = document.querySelector(".lightbox-next-btn");
const lightBoxPrevBtn = document.querySelector(".lightbox-prev-btn");
let currentImgIndex = 0;

nextMobileBtn.addEventListener("click", () => slide("next"));

prevMobileBtn.addEventListener("click", () => slide("previous"));

desktopIndicators.forEach((indicator) => {
  indicator.addEventListener("click", () => {
    showClickedPhoto(
      indicator,
      desktopIndicators,
      desktopActiveImg,
      "slider-indicator-active"
    );
    sliderTracker(
      indicator,
      lightBoxIndicators,
      lightBoxImg,
      "lightbox-indicator-active"
    );
  });
});

desktopActiveImg.addEventListener("click", () => {
  alterClass(document.querySelector(".lightbox"), "lightbox-visible", "add");
  addOverlay();
});

closeIcon.addEventListener("click", () => {
  alterClass(document.querySelector(".lightbox"), "lightbox-visible", "remove");
  removeOverlay();
});

lightBoxIndicators.forEach((indicator) => {
  indicator.addEventListener("click", () => {
    showClickedPhoto(
      indicator,
      lightBoxIndicators,
      lightBoxImg,
      "lightbox-indicator-active"
    );
    sliderTracker(
      indicator,
      desktopIndicators,
      desktopActiveImg,
      "slider-indicator-active"
    );
  });
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("overlay")) {
    alterClass(
      document.querySelector(".lightbox"),
      "lightbox-visible",
      "remove"
    );
    removeOverlay();
  }
});

lightBoxPrevBtn.addEventListener("click", (e) => lightboxSlide("previous"));
lightBoxNextBtn.addEventListener("click", (e) => lightboxSlide("next"));

function alterClass(element, class_name, processName) {
  if (processName === "add") {
    element.classList.add(class_name);
  } else if (processName === "remove") {
    if (element.classList.contains(class_name)) {
      element.classList.remove(class_name);
    }
  } else if (processName === "toggle") {
    element.classList.toggle(class_name);
  }
}

function addOverlay() {
  if (!document.body.contains(document.querySelector(".overlay"))) {
    const overlayElement = document.createElement("div");
    overlayElement.classList.add("overlay");
    document.body.append(overlayElement);
  }
}
function removeOverlay() {
  if (document.body.contains(document.querySelector(".overlay"))) {
    document.querySelector(".overlay").remove();
  }
}

function slide(slideTo) {
  const sliderMobileItems = document.querySelector(".slider-mobile-items");
  const slideWidth = document.querySelector(".slider-mobile-image").offsetWidth;
  const sliderMobileImages = Array.from(
    document.querySelectorAll(".slider-mobile-image")
  );
  if (slideTo === "next") {
    if (
      sliderMobileItems.scrollLeft <
      (sliderMobileImages.length - 1) * slideWidth
    ) {
      sliderMobileItems.scrollLeft += slideWidth;
    }
  } else if (slideTo === "previous") {
    if (sliderMobileItems.scrollLeft > 0) {
      sliderMobileItems.scrollLeft -= slideWidth;
    }
  }
}

function showClickedPhoto(element, siblings, visibleImg, class_name) {
  const srcImg = element.getAttribute("data-src");
  visibleImg.setAttribute("src", srcImg);
  siblings.forEach((e) => {
    if (e.classList.contains(class_name)) {
      e.classList.remove(class_name);
    }
  });
  element.classList.add(class_name);
}

function addOverlay() {
  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  document.body.appendChild(overlay);
}

function removeOverlay() {
  if (document.body.contains(document.body.querySelector(".overlay"))) {
    document.body.querySelector(".overlay").remove();
  }
}

function sliderTracker(element, siblings, visibleImg, class_name) {
  const srcImg = element.getAttribute("data-src");
  visibleImg.setAttribute("src", srcImg);
  siblings.forEach((e) => {
    alterClass(e, class_name, "remove");
    if (element.getAttribute("data-src") === e.getAttribute("data-src")) {
      alterClass(e, class_name, "add");
    }
  });
}

function lightboxSlide(slideTo) {
  lightBoxIndicators.forEach((e, i) => {
    if (e.classList.contains("lightbox-indicator-active")) {
      currentImgIndex = i;
    }
  });
  if (slideTo === "next") {
    if (currentImgIndex < lightBoxIndicators.length - 1) {
      lightBoxIndicators[currentImgIndex].classList.remove(
        "lightbox-indicator-active"
      );
      currentImgIndex++;
      lightBoxImg.setAttribute(
        "src",
        lightBoxIndicators[currentImgIndex].getAttribute("data-src")
      );
      lightBoxIndicators[currentImgIndex].classList.add(
        "lightbox-indicator-active"
      );
      sliderTracker(
        lightBoxIndicators[currentImgIndex],
        desktopIndicators,
        desktopActiveImg,
        "slider-indicator-active"
      );
    }
  } else if (slideTo === "previous") {
    if (currentImgIndex > 0) {
      lightBoxIndicators[currentImgIndex].classList.remove(
        "lightbox-indicator-active"
      );
      currentImgIndex--;
      lightBoxImg.setAttribute(
        "src",
        lightBoxIndicators[currentImgIndex].getAttribute("data-src")
      );
      lightBoxIndicators[currentImgIndex].classList.add(
        "lightbox-indicator-active"
      );
      sliderTracker(
        lightBoxIndicators[currentImgIndex],
        desktopIndicators,
        desktopActiveImg,
        "slider-indicator-active"
      );
    }
  }
}

const countEl = document.querySelector(".count");
const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");
const countNumber = document.querySelector(".count-number");
const cartCount = document.querySelector(".cart-count");
const emptyCart = document.querySelector(".empty-cart");
const fullCart = document.querySelector(".full-cart");
const cartBtn = document.querySelector(".cart-btn");
const newPrice = document.querySelector(".new");
const deleteIcon = document.querySelector(".delete-icon");
const checkoutBtn = document.querySelector(".checkout-btn");
let count = 0;

//Decrement count on click

minus.addEventListener("click", () => {
  if (count <= 0) {
    count === 0;
  } else {
    count -= 1;
    countEl.textContent = count;
  }
});

//Increment count on click

plus.addEventListener("click", () => {
  count += 1;
  countEl.textContent = count;
});

//Display cart depend on the count

cartBtn.addEventListener("click", () => {
  countNumber.textContent = count;
  cartCount.textContent = count;
  newPrice.textContent = "$" + count * 125 + ".00";
  countNumber.classList.add("appear");
  if (count === 0) {
    emptyCart.classList.remove("none");
    emptyCart.classList.add("block");
    fullCart.classList.remove("block");
  } else {
    emptyCart.classList.add("none");
    fullCart.classList.add("block");
  }
});

//Delete product on click and reset count to 0

deleteIcon.addEventListener("click", () => {
  fullCart.classList.remove("block");
  emptyCart.classList.remove("none");
  countNumber.textContent = 0;
  count = 0;
  countEl.textContent = count;
});

//Create a modal when user clicks on checkout button

checkoutBtn.addEventListener("click", () => {
  const purchaseContainer = document.createElement("div");
  purchaseContainer.classList.add("purchase-container");
  body.appendChild(purchaseContainer);
  const purchaseBox = document.createElement("div");
  purchaseBox.classList.add("purchase-box");
  purchaseContainer.appendChild(purchaseBox);
  const purchaseText = document.createElement("p");
  purchaseText.classList.add("purchase-text");
  purchaseBox.appendChild(purchaseText);
  purchaseText.textContent = "Thank you for purchase!";

  //Hide modal on outside click

  purchaseContainer.addEventListener("click", (e) => {
    if (e.target.closest(".purchase-box")) return;
    else {
      purchaseContainer.classList.add("hide");
    }
  });

  // Hide modal on espace

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      purchaseContainer.classList.add("hide");
    }
  });

  // Reset cart and count

  fullCart.classList.remove("block");
  emptyCart.classList.remove("none");
  countNumber.textContent = 0;
  count = 0;
  countEl.textContent = count;
});

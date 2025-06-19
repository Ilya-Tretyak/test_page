const tg = window.Telegram.WebApp;
tg.expand();

let selectedProduct = null;

const buy = document.getElementById("buy");
const catalog = document.getElementById("catalog");
const form = document.getElementById("form");
const order = document.getElementById("order");
const errorDiv = document.getElementById("error");

buy.addEventListener("click", () => {
  document.getElementById("main").style.display = "none";
  catalog.style.display = "block";
});


// Устанавливаем логику + / - для всех товаров
document.querySelectorAll(".quantity-control").forEach(control => {
  const minus = control.querySelector(".quantity-minus");
  const plus = control.querySelector(".quantity-plus");
  const input = control.querySelector(".quantity-input");

  minus.addEventListener("click", () => {
    let v = parseInt(input.value, 10);
    if (v > parseInt(input.min, 10)) input.value = v - 1;
  });

  plus.addEventListener("click", () => {
    let v = parseInt(input.value, 10);
    if (v < parseInt(input.max, 10)) input.value = v + 1;
  });
});

// Обработка клика "Купить" на товаре
catalog.addEventListener("click", function(e) {
  if (e.target.classList.contains("product-buy")) {
    const productDiv = e.target.closest(".product");
    const title = e.target.dataset.title;

    const priceElement = productDiv.querySelector("[data-price]");
    const price = parseFloat(priceElement?.dataset.price);

    // Размер — радиокнопка, если есть
    const sizeRadio = productDiv.querySelector("input[type='radio']:checked");
    const selectedSize = sizeRadio ? sizeRadio.value : null;

    const quantityInput = productDiv.querySelector(".quantity-input");
    const selectedQuantity = quantityInput ? quantityInput.value : 1;

    selectedProduct = {
      title: title,
      size: selectedSize,
      quantity: selectedQuantity,
      price: price,
    };

    document.getElementById("catalog").style.display = "none";
    document.getElementById("form").style.display = "block";

    // Заполняем имя из Telegram
    const firstName = tg.initDataUnsafe.user?.first_name || "";
    const lastName = tg.initDataUnsafe.user?.last_name || "";
    document.getElementById("user_name").value = `${firstName} ${lastName}`.trim();
  }
});

order.addEventListener("click", () => {
  errorDiv.innerText = "";
  let name = document.getElementById("user_name").value.trim();
  let email = document.getElementById("user_email").value.trim();
  let phone = document.getElementById("user_phone").value.trim();

  if (name.length < 3) {
    errorDiv.innerText = "Ошибка в имени";
    return;
  }
  if (email.length < 3) {
    errorDiv.innerText = "Ошибка в email";
    return;
  }
  if (phone.length < 3) {
    errorDiv.innerText = "Ошибка в номере телефона";
    return;
  }
  if (!selectedProduct) {
    errorDiv.innerText = "Выберите товар";
    return;
  }

  const data = {
    name: name,
    email: email,
    phone: phone,
    product: selectedProduct.title,
    size: selectedProduct.size,
    quantity: selectedProduct.quantity,
    price: selectedProduct.price,
  };

  tg.sendData(JSON.stringify(data));
  tg.close();
});



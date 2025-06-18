document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main");
  const catalog = document.getElementById("catalog");
  const form = document.getElementById("form");
  const buyButton = document.getElementById("buy");
  const orderButton = document.getElementById("order");
  const errorDiv = document.getElementById("error");

  // Показать каталог при нажатии "Купить"
  buyButton.addEventListener("click", () => {
    main.style.display = "none";
    catalog.style.display = "block";
  });

  // Обработка кнопок +/-
  document.querySelectorAll(".product").forEach(product => {
    const minusBtn = product.querySelector(".quantity-minus");
    const plusBtn = product.querySelector(".quantity-plus");
    const input = product.querySelector(".quantity-input");

    minusBtn.addEventListener("click", () => {
      let val = parseInt(input.value, 10);
      if (val > 1) input.value = val - 1;
    });

    plusBtn.addEventListener("click", () => {
      let val = parseInt(input.value, 10);
      if (val < 10) input.value = val + 1;
    });
  });

  // Нажатие на кнопку купить на товаре - открыть форму и заполнить данные
  document.querySelectorAll(".product-buy").forEach(button => {
    button.addEventListener("click", (e) => {
      const productDiv = e.target.closest(".product");

      // Собираем данные выбранного товара
      const title = e.target.dataset.title;
      const sizeInputs = productDiv.querySelectorAll(".size-options input[type=radio]");
      let selectedSize = null;
      sizeInputs.forEach(input => {
        if (input.checked) selectedSize = input.value;
      });

      const quantity = productDiv.querySelector(".quantity-input").value;
      const priceText = productDiv.querySelector("p u").textContent;

      // Сохраняем в форму или можно использовать при отправке
      form.dataset.product = title;
      form.dataset.size = selectedSize;
      form.dataset.quantity = quantity;
      form.dataset.price = priceText;

      // Показываем форму
      catalog.style.display = "none";
      form.style.display = "block";
    });
  });

  // Обработка формы
  orderButton.addEventListener("click", () => {
    errorDiv.textContent = "";

    const name = document.getElementById("user_name").value.trim();
    const email = document.getElementById("user_email").value.trim();
    const phone = document.getElementById("user_phone").value.trim();

    if (!name) {
      errorDiv.textContent = "Введите имя";
      return;
    }

    if (!email) {
      errorDiv.textContent = "Введите email";
      return;
    }

    if (!phone) {
      errorDiv.textContent = "Введите телефон";
      return;
    }

    // Здесь можно добавить отправку данных на сервер
    alert(
      `Заказ оформлен!\n\n` +
      `Товар: ${form.dataset.product}\n` +
      `Размер: ${form.dataset.size || '—'}\n` +
      `Количество: ${form.dataset.quantity}\n` +
      `Цена: ${form.dataset.price}\n\n` +
      `Имя: ${name}\nEmail: ${email}\nТелефон: ${phone}`
    );

    // Сбросить форму и показать главный экран
    form.style.display = "none";
    main.style.display = "block";
  });
});


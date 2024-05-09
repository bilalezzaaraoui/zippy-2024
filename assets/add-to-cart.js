const addToCartForm = document.querySelectorAll(".shopify-product-form");
console.log(addToCartForm);

addToCartForm.forEach((form) => {
  form.addEventListener("submit", async (e) => {
    // Prevent normal submission
    e.preventDefault();

    // Submit form with ajax
    await fetch("/cart/add", {
      method: "post",
      body: new FormData(form),
    });

    // Get new cart object
    const res = await fetch("/cart.json");
    const cart = await res.json();

    var headerCartIcon = document.querySelector(".header__icon--cart");
    var existingBubble = headerCartIcon.querySelector(".cart-count-bubble");

    function createCartCountBubble(item) {
      // Créer l'élément div pour le bubble
      var cartCountBubble = document.createElement("div");
      cartCountBubble.className = "cart-count-bubble";

      // Créer le premier span avec aria-hidden
      var spanAriaHidden = document.createElement("span");
      spanAriaHidden.setAttribute("aria-hidden", "true");
      spanAriaHidden.textContent = `${item}`; // Supposons que vous voulez mettre 15 articles

      // Créer le second span pour accessibilité
      var spanVisuallyHidden = document.createElement("span");
      spanVisuallyHidden.className = "visually-hidden";
      spanVisuallyHidden.textContent = `${item} articles`;

      // Ajouter les spans au div bubble
      cartCountBubble.appendChild(spanAriaHidden);
      cartCountBubble.appendChild(spanVisuallyHidden);

      // Retourner l'élément bubble complet
      return cartCountBubble;
    }

    // Vérifier si le bubble existe déjà
    if (!existingBubble) {
      var newCartCountBubble = createCartCountBubble(cart.item_count);
      headerCartIcon.appendChild(newCartCountBubble);
      console.log("Cart count bubble added.");
    } else {
      // Update cart count
      var cartBubble = document.querySelector(".cart-count-bubble");

      // Within this element, find the <span> that has the 'aria-hidden' attribute set to 'true'
      var ariaHiddenSpan = cartBubble.querySelector('span[aria-hidden="true"]');

      ariaHiddenSpan.textContent = cart.item_count;
      console.log("Cart count bubble already exists.");
    }

    //Update cart
    const updateCartDrawer = async () => {
      const res = await fetch("/?section_id=cart-drawer");
      const text = await res.text();

      const html = document.createElement("div");
      html.innerHTML = text;

      const newBox = html.querySelector("#cart-target").innerHTML;
      document.querySelector("#cart-target").innerHTML = newBox;

      console.log(html, "lol");
    };

    await updateCartDrawer();

    const cartDrawer = document.querySelector(".drawer");
    cartDrawer.classList.add("active"); // Ajouter la classe 'active'
  });
});

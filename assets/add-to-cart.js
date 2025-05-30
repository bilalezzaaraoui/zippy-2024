document.addEventListener("DOMContentLoaded", function () {
  const addToCartForm = document.querySelectorAll(".shopify-product-form");
  console.log(addToCartForm);

  addToCartForm.forEach((form) => {
    const formActual = form.querySelector("button");

    if (!formActual.classList.contains("out-of-stock")) {
      form.addEventListener("submit", async (e) => {
        // Prevent normal submission
        e.preventDefault();

        // // Submit form with ajax
        console.log("Etape 1");
        await fetch("/cart/add", {
          method: "post",
          body: new FormData(form),
        });

        // console.log(formActual, "ptttnnnnnn de button ici");
        // Get new cart object
        console.log("Etape 2");
        const res = await fetch("/cart.js");
        const cart = await res.json();

        console.log("Etape 3");
        if (cart.item_count >= 1) {
          const elementVide = document.querySelector(".drawer__inner-empty");
          // console.log(cart.item_count, "cart.item_count");

          if (elementVide) {
            const elementVide = document.querySelector(".drawer__inner-empty");
            const header = document.querySelector(".drawer__header");
            const footer = document.querySelector(".drawer__footer");

            elementVide.style.display = "none";
            header.style.display = "block";
            footer.style.display = "block";
          }

          console.log("Etape 4");
          const cartDrawer = document.querySelector(".drawer");

          if (!cartDrawer.classList.contains("activate")) {
            console.log("je l'ai pas eu");
            cartDrawer.classList.remove("is-empty");
            cartDrawer.classList.add("active");
          }
        }
        //Update cart
        const updateCartDrawer = async () => {
          const res = await fetch("/?section_id=cart-drawer");
          const text = await res.text();

          // console.log(text, "texte");
          const isEmptyCart = document.querySelector(".is-empty");

          if (isEmptyCart) {
            isEmptyCart.classList.remove("is-empty");
          }

          const html = document.createElement("div");
          html.innerHTML = text;

          // const newBox = html.querySelector("#cart-target").innerHTML;
          // document.querySelector("#cart-target").innerHTML = newBox;

          const newBox = html.querySelector("#CartDrawer-Form").innerHTML;
          document.querySelector("#CartDrawer-Form").innerHTML = newBox;

          const newBoxAmount = html.querySelector(".drawer__footer").innerHTML;
          document.querySelector(".drawer__footer").innerHTML = newBoxAmount;

          console.log(html, "lol");
        };

        await updateCartDrawer();

        console.log("Etape 5");
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

        console.log("Etape 6");
        // Vérifier si le bubble existe déjà
        if (!existingBubble) {
          var newCartCountBubble = createCartCountBubble(cart.item_count);
          headerCartIcon.appendChild(newCartCountBubble);
          console.log("Cart count bubble added.");
        } else {
          // Update cart count
          var cartBubble = document.querySelector(".cart-count-bubble");

          // Within this element, find the <span> that has the 'aria-hidden' attribute set to 'true'
          var ariaHiddenSpan = cartBubble.querySelector(
            'span[aria-hidden="true"]'
          );

          ariaHiddenSpan.textContent = cart.item_count;
          console.log("Cart count bubble already exists.");
        }
      });
    } else {
      form.addEventListener("submit", async (e) => {
        // Prevent normal submission
        e.preventDefault();

        console.log("Produit en rupture de stock");
      });
    }
  });
});

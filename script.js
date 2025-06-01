// Sample code for adding to cart
let cart = [];

function addToCart(productId, productName, productPrice) {
    const product = {
        id: productId,
        name: productName,
        price: productPrice
    };
    cart.push(product);
    alert(`${productName} ha sido agregado al carrito.`);
}

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            addToCart(1, 'Puerta Metálica', 200.00); // Example
        }
    });
});
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

async function verifyGoogleToken(idToken) {
    const ticket = await client.verifyIdToken({
        idToken,
        audience: CLIENT_ID,  // Este CLIENT_ID es el que obtuviste de la consola de Google
    });
    const payload = ticket.getPayload();
    console.log(payload);  // Información del usuario
}
const prevButton = document.querySelector('.carousel-arrow.prev');
const nextButton = document.querySelector('.carousel-arrow.next');
const carousel = document.querySelector('.product-carousel');
let index = 0; // Keeps track of the current set of products (0-based index for set of 3)

// Calculate the width of the carousel based on the product width and margin
const productWidth = document.querySelector('.product-item').offsetWidth + 20; // 20px is the total margin (10px on each side)
const visibleItems = 3; // Showing 3 products at a time

// Move the carousel to the correct position
function moveCarousel() {
  const offset = -index * productWidth * visibleItems;
  carousel.style.transform = `translateX(${offset}px)`;
}

// Click event for previous button
prevButton.addEventListener('click', () => {
  if (index > 0) {
    index--; // Move one set to the left
  } else {
    index = 0; // Prevent looping back
  }
  moveCarousel();
});

// Click event for next button
nextButton.addEventListener('click', () => {
  const maxIndex = Math.ceil(carousel.children.length / visibleItems) - 1;
  if (index < maxIndex) {
    index++; // Move one set to the right
  } else {
    index = maxIndex; // Prevent looping back
  }
  moveCarousel();
});

// Swipe functionality for mobile
let startX = 0;
let endX = 0;

carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX; // Get the initial touch position
});

carousel.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX; // Get the final touch position
  const swipeDistance = startX - endX;

  // If the swipe distance is more than a threshold, we consider it a swipe
  if (swipeDistance > 50) {
    nextButton.click(); // Swipe left, go to next
  } else if (swipeDistance < -50) {
    prevButton.click(); // Swipe right, go to previous
  }
});
// JavaScript para controlar el deslizamiento automático de los productos
document.addEventListener("DOMContentLoaded", () => {
    const productList = document.querySelector(".product-list");
    const productItems = document.querySelectorAll(".product-item");
    
    let slideIndex = 0;

    // Función para deslizar los productos
    function slideProducts() {
        // Deslizar hacia la izquierda
        slideIndex++;
        if (slideIndex >= productItems.length) {
            slideIndex = 0;
        }
        
        // Aplicar el transform a la lista de productos
        productList.style.transform = `translateX(-${slideIndex * 100}%)`;

        // Espera 2 segundos antes de permitir el siguiente deslizamiento
        setTimeout(() => {
            slideProducts(); // Llamada recursiva
        }, 2000);
    }

    // Iniciar el deslizamiento
    slideProducts();
});
// JavaScript to toggle the navbar on mobile devices
document.querySelector('.hamburger-menu').addEventListener('click', function() {
  document.querySelector('.navbar').classList.toggle('active');
});
// Asegurarse de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Cargar el carrito desde el localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Actualizar el contador del carrito
  const updateCartCount = () => {
      const cartCount = document.getElementById('cart-count');
      cartCount.innerText = cart.length;
  };

  // Función para agregar al carrito
  const addToCart = (productId) => {
      // Verificar si el producto ya está en el carrito
      if (!cart.some(item => item.id === productId)) {
          // Si no está en el carrito, agregarlo
          cart.push({ id: productId });
          localStorage.setItem('cart', JSON.stringify(cart));
          updateCartCount();
      } else {
          alert("Este producto ya está en el carrito.");
      }
  };

  // Asociar la función de agregar al carrito a los botones correspondientes
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
          const productId = button.closest('.product-item').getAttribute('data-id');
          addToCart(productId);
      });
  });

  // Actualizar el contador de carrito al cargar la página
  updateCartCount();
});
document.addEventListener('DOMContentLoaded', () => {
  // Recuperar el carrito desde localStorage (si existe)
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Mostrar el contador de productos en el carrito
  const updateCartCount = () => {
      const cartCount = document.getElementById('cart-count');
      cartCount.innerText = cart.length;
  };

  // Mostrar los productos en el carrito
  const displayCartItems = () => {
      const cartItemsContainer = document.getElementById('cart-items');
      cartItemsContainer.innerHTML = ''; // Limpiar contenedor antes de agregar los productos

      if (cart.length === 0) {
          cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
      } else {
          cart.forEach(item => {
              // Aquí puedes agregar más detalles de los productos, como nombre y precio.
              const productDiv = document.createElement('div');
              productDiv.classList.add('cart-item');
              productDiv.innerHTML = `<p>Producto ID: ${item.id}</p>`; // Puedes mostrar más detalles si lo deseas
              cartItemsContainer.appendChild(productDiv);
          });
      }
  };

  // Función para añadir un producto al carrito
  const addToCart = (productId) => {
      // Verificar si el producto ya está en el carrito
      if (!cart.some(item => item.id === productId)) {
          cart.push({ id: productId }); // Añadir el producto al carrito
          localStorage.setItem('cart', JSON.stringify(cart)); // Guardar el carrito en localStorage
          updateCartCount(); // Actualizar el contador de carrito
      }
  };

  // Función para vaciar el carrito
  const clearCart = () => {
      cart = []; // Limpiar el carrito
      localStorage.setItem('cart', JSON.stringify(cart)); // Actualizar en localStorage
      updateCartCount(); // Actualizar el contador
      displayCartItems(); // Mostrar el carrito vacío
  };

  // Función para finalizar la compra (aquí puedes redirigir a una página de pago, etc.)
  const checkout = () => {
      alert("Proceso de compra en desarrollo. ¡Gracias por tu compra!");
      // Aquí puedes redirigir a una página de pago o realizar una acción de checkout
  };

  // Cargar productos al cargar la página de carrito
  displayCartItems(); // Mostrar los productos en el carrito

  // Asociar las funciones al carrito
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
          const productId = button.closest('.product-item').getAttribute('data-id');
          addToCart(productId); // Añadir el producto al carrito
      });
  });

  // Event listener para el botón "Vaciar carrito"
  const clearCartButton = document.getElementById('clear-cart');
  clearCartButton.addEventListener('click', clearCart);

  // Event listener para el botón "Finalizar compra"
  const checkoutButton = document.getElementById('checkout');
  checkoutButton.addEventListener('click', checkout);

  // Actualizar el contador del carrito en el header al cargar la página
  updateCartCount();
});

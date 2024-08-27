function loadContent(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading file:', error));
}
/* Add button functionality */
document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.servicesCardsContainer');

    cardsContainer.addEventListener('click', function(event) {
        if (event.target.closest('.addButton')) {
            const card = event.target.closest('.servicesCardContent');
            const priceElement = card.querySelector('.price');
            const totalPriceElement = card.querySelector('.totalPrice');
            const continueBox = card.querySelector('.continueBox');

            const initialPrice = parseInt(priceElement.getAttribute('data-initial-price'));
            let currentQuantity = parseInt(card.getAttribute('data-quantity')) || 0;

            // Only increment after the first addition
            if (currentQuantity === 0) {
                currentQuantity = 1;
            } else {
                currentQuantity++;
            }

            card.setAttribute('data-quantity', currentQuantity);
            
            // Calculate new price based on quantity
            const newPrice = initialPrice * currentQuantity;
            
            // Update the total price
            totalPriceElement.textContent = `Rs. ${newPrice}`;
            
            // Show the continue box if it's hidden
            continueBox.classList.remove('d-none');
        }
    });

    // Continue button functionality
    cardsContainer.addEventListener('click', function(event) {
        if (event.target.closest('.continueButton')) {
            const card = event.target.closest('.servicesCardContent');
            const currentQuantity = parseInt(card.getAttribute('data-quantity')) || 1;
            const initialPrice = parseInt(card.querySelector('.price').getAttribute('data-initial-price'));

            alert(`You have selected ${currentQuantity} product(s) with a total amount of Rs. ${initialPrice * currentQuantity}`);
        }
    });
});

/* ------------------------------------------Book Now Functionlity------------------------------ */
function submitService(serviceType) {         /* The function submitService(serviceType) is called when the user clicks the "Submit" button for a service modal (e.g., AC, Refrigerator, etc.). */
    // Get the selected sub-service
    const subService = document.querySelector(`input[name="${serviceType.toLowerCase()}Service"]:checked`);

    if (subService) {
      // Get the selected sub-service value (text)
      const subServiceText = subService.value;

      // Create the WhatsApp message
      const whatsappLink = `https://wa.me/03124387803?text=I would like to book a ${serviceType} service for ${encodeURIComponent(subServiceText)}.`;   /* The encodeURIComponent() function is used to ensure that the sub-service text is safely included in the URL (special characters are properly encoded). */
      
      // Open WhatsApp link in a new tab
      window.open(whatsappLink, '_blank');
    } else {
      alert('Please select an option before submitting.');
    }
  }
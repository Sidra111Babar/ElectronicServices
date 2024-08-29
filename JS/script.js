function loadContent(file, elementId) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
        })
        .catch(error => console.error('Error loading file:', error));
}
/* ******************************************Add button functionality *****************************************/
document.addEventListener('DOMContentLoaded', function() {
    const cardsContainer = document.querySelector('.servicesCardsContainer');

    // Click event for the entire container
    cardsContainer.addEventListener('click', function(event) {
        const card = event.target.closest('.servicesCardContent');
        if (!card) return;  // Exit if no card is clicked
        
        const priceElement = card.querySelector('.price');
        const totalPriceElement = card.querySelector('.totalPrice');
        const continueBox = card.querySelector('.continueBox');
        const productName = card.querySelector('p.fw-bold').textContent;
        const initialPrice = parseInt(priceElement.getAttribute('data-initial-price'));
        let currentQuantity = parseInt(card.getAttribute('data-quantity')) || 1;

        // Add button click handler
        if (event.target.closest('.addButton')) {
            continueBox.classList.remove('d-none');
        }

        // + Button click handler
        if (event.target.closest('.addButton .rounded-circle:last-child')) {
            currentQuantity++;
            card.setAttribute('data-quantity', currentQuantity);
            const newPrice = initialPrice * currentQuantity;
            totalPriceElement.textContent = `Rs. ${newPrice}`;
        }

        // - Button click handler
        if (event.target.closest('.addButton .rounded-circle:first-child')) {
            if (currentQuantity > 1) {
                currentQuantity--;
                card.setAttribute('data-quantity', currentQuantity);
                const newPrice = initialPrice * currentQuantity;
                totalPriceElement.textContent = `Rs. ${newPrice}`;
            }
        }

        // Continue button functionality
        if (event.target.closest('.continueButton')) {
            const newPrice = initialPrice * currentQuantity;
            const message = `I would like to order ${currentQuantity} ${productName}(s) for a total of Rs. ${newPrice}.`;

            // WhatsApp API link
            const whatsappLink = `https://wa.me/+923000000000?text=${encodeURIComponent(message)}`;
            window.open(whatsappLink, '_blank');
        }
    });
});
function disappearBox(event) {
    // Get the closest .continueBox of the clicked button and add the d-none class to it
    event.target.closest('.continueBox').classList.add('d-none');
}

/* ------------------------------------------Book Now Functionlity------------------------------ */
function submitService(serviceType) {         /* The function submitService(serviceType) is called when the user clicks the "Submit" button for a service modal (e.g., AC, Refrigerator, etc.). */
    // Get the selected sub-service
    const subService = document.querySelector(`input[name="${serviceType.toLowerCase()}Service"]:checked`);

    if (subService) {
      // Get the selected sub-service value (text)
      const subServiceText = subService.value;

      // Create the WhatsApp message
      const whatsappLink = `https://wa.me/+923000000000?text=I would like to book a ${serviceType} service for ${encodeURIComponent(subServiceText)}.`;   /* The encodeURIComponent() function is used to ensure that the sub-service text is safely included in the URL (special characters are properly encoded). */
      
      // Open WhatsApp link in a new tab
      window.open(whatsappLink, '_blank');
    } else {
      alert('Please select an option before submitting.');
    }
  }

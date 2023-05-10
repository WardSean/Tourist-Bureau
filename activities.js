let categories = ["Sports", "Music", "Art"];
let activities = [  {    id: "1",    name: "Football",    category: "Sports",    price: 10.99,    description: "Play a game of football",    location: "Park",    image: "https://via.placeholder.com/150",  },  {    id: "2",    name: "Guitar Lessons",    category: "Music",    price: 20.99,    description: "Learn to play the guitar",    location: "Music school",    image: "https://via.placeholder.com/150",  },  {    id: "3",    name: "Painting",    category: "Art",    price: 0,    description: "Paint a picture",    location: "Art studio",    image: "https://via.placeholder.com/150",  },];

window.addEventListener("load", () => {
  // Populate categories dropdown list
  populateCategories(categories);

  // Add event listeners to form elements
  const categoryDropdown = document.getElementById("activity-categories");
  const activityDropdown = document.getElementById("activities");
  const buyForm = document.getElementById("buy-form");
  const purchaseMessage = document.getElementById("purchase-message");
  categoryDropdown.addEventListener("change", () => {
    // Populate activities dropdown list
    populateActivities(activities, categoryDropdown.value);

    // Hide activity details and purchase form/message
    hideActivityDetails();
    hideBuyForm();
    hidePurchaseMessage();
  });

  activityDropdown.addEventListener("change", () => {
    // Display activity details
    displayActivityDetails(activities, activityDropdown.value);

    // Hide purchase message
    hidePurchaseMessage();

    const selectedActivity = getActivityById(activities, activityDropdown.value);

    if (selectedActivity.price > 0) {
      // Display buy form
      displayBuyForm();

      // Add submit event listener to buy form
      buyForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(buyForm);
        const numTickets = parseInt(formData.get("num-tickets"));
        const creditCardNumber = formData.get("credit-card-number");
        const email = formData.get("email");

        // Validate form data
        const validationMessage = validateFormData(numTickets, creditCardNumber, email);
        if (validationMessage) {
          // Display validation message
          displayPurchaseMessage(validationMessage, true);
        } else {
          // Display confirmation message
          const activityName = selectedActivity.name;
          const totalAmount = numTickets * selectedActivity.price;
          const confirmationMessage = "Your credit card has been charged $${totalAmount.toFixed(2)} for ${numTickets} to ${activityName}. A confirmation email has been sent to ${email}."
          // Send confirmation email
          sendConfirmationEmail(email, activityName, totalAmount);
          // Display success message
          const successMessage = "You have successfully purchased ${numTickets} ticket(s) to ${activityName} for a total of $${totalAmount.toFixed(2)}. A confirmation email has been sent to ${email}.";
          displayPurchaseMessage(successMessage, false);
    
          // Hide buy form
          hideBuyForm();
        }
      });
    } else {
      // Hide buy form
      hideBuyForm();
    }
});
});

function populateCategories(categories) {
const categoryDropdown = document.getElementById("activity-categories");
categories.forEach((category) => {
const option = document.createElement("option");
option.value = category;
option.text = category;
categoryDropdown.appendChild(option);
});
}

function populateActivities(activities, category) {
const activityDropdown = document.getElementById("activities");
activityDropdown.innerHTML = "";

activities.forEach((activity) => {
if (activity.category === category) {
const option = document.createElement("option");
option.value = activity.id;
option.text = activity.name;
activityDropdown.appendChild(option);
}
});
}

function displayActivityDetails(activities, activityId) {
const selectedActivity = getActivityById(activities, activityId);

const activityName = document.getElementById("activity-name");
const activityPrice = document.getElementById("activity-price");
const activityDescription = document.getElementById("activity-description");
const activityLocation = document.getElementById("activity-location");
const activityImage = document.getElementById("activity-image");

activityName.innerText = selectedActivity.name;
activityPrice.innerText = `$${selectedActivity.price.toFixed(2)}`;
activityDescription.innerText = selectedActivity.description;
activityLocation.innerText = `Location: ${selectedActivity.location}`;
activityImage.src = selectedActivity.image;


// Display activity details container
const activityDetails = document.getElementById("activity-details");
activityDetails.style.display = "block";
}

function hideActivityDetails() {
// Hide activity details container
const activityDetails = document.getElementById("activity-details");
activityDetails.style.display = "none";
}

function getActivityById(activities, activityId) {
return activities.find((activity) => activity.id === activityId);
}

function displayBuyForm() {
const buyForm = document.getElementById("buy-form");
buyForm.style.display = "block";
}

function hideBuyForm() {
const buyForm = document.getElementById("buy-form");
buyForm.style.display = "none";
}

function validateFormData(numTickets, creditCardNumber, email) {
let errorMessage = "";

if (isNaN(numTickets) || numTickets <= 0) {
errorMessage = "Please enter a valid number of tickets.";
} else if (!isValidCreditCardNumber(creditCardNumber)) {
errorMessage = "Please enter a valid credit card number.";
} else if (!isValidEmail(email)) {
errorMessage = "Please enter a valid email address.";
}

return errorMessage;
}

function isValidCreditCardNumber(creditCardNumber) {
const regex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
return regex.test(creditCardNumber);
}

function isValidEmail(email) {
const regex = /\S+@\S+.\S+/;
return regex.test(email);
}

function displayPurchaseMessage(message, isError) {
const purchaseMessage = document.getElementById("purchase-message");
purchaseMessage.innerText = message;

if (isError) {
purchaseMessage.classList.add("error");
} else {
purchaseMessage.classList.remove("error");
}

purchaseMessage.style.display = "block";
}

function hidePurchaseMessage() {
const purchaseMessage = document.getElementById("purchase-message");
purchaseMessage.style.display = "none";
}
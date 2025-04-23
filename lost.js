// Firebase config — replace placeholders with your actual values from Firebase console
const firebaseConfig = {
    apiKey: "AIzaSyBEagD9WprpIoDri3Hg7_j-y3mmQQGy66o",
    authDomain: "lostandfoundhub-4ede1.firebaseapp.com",
    projectId: "lostandfoundhub-4ede1",
    storageBucket: "lostandfoundhub-4ede1.appspot.com",
    messagingSenderId: "811409158826",
    appId: "1:811409158826:web:871d135ef4c734f8a896d3",
    measurementId: "G-X5K378Z96M"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  // Load lost items from Firestore
  async function loadLostItems() {
    const listContainer = document.getElementById("lost-items-list");
    listContainer.innerHTML = "";
  
    try {
      const snapshot = await db.collection("lost_items").orderBy("timestamp", "desc").get();
      snapshot.forEach(doc => {
        const data = doc.data();
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("lost-item");
        itemDiv.innerHTML = `
          <div class="text-container">
            <h2>Item lost: ${data.item}</h2>
            <p>Last seen: ${data.lastSeen}</p>
            <p>Owner: ${data.name}</p>
            <p>Contact info: ${data.contact}</p>
            <p>Description: ${data.description}</p>
          </div>
        `;
        listContainer.appendChild(itemDiv);
      });
    } catch (error) {
      console.error("Error loading items:", error);
    }
  }
  
  // Form submit handler
  const form = document.getElementById("lost-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const item = document.getElementById("item-lost").value;
    const name = document.getElementById("name").value;
    const lastSeen = document.getElementById("last-seen").value;
    const contact = document.getElementById("contact-info").value;
    const description = document.getElementById("description").value;
  
    try {
      await db.collection("lost_items").add({
        item,
        name,
        lastSeen,
        contact,
        description,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  
      form.reset();
      loadLostItems(); // Refresh list
    } catch (error) {
      console.error("Error adding item:", error);
    }
  });
  
  // Star animation
  const starCount = 100;
  const shootingStarCount = 15;
  const body = document.body;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    star.style.top = Math.random() * 100 + 'vh';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.animationDuration = Math.random() * 1.5 + 0.5 + 's';
    body.appendChild(star);
  }
  
  for (let i = 0; i < shootingStarCount; i++) {
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');
    shootingStar.style.top = Math.random() * 100 + 'vh';
    shootingStar.style.left = Math.random() * 100 + 'vw';
    shootingStar.style.animationDelay = Math.random() * 3 + 's';
    shootingStar.style.animationDuration = Math.random() * 2 + 1 + 's';
    body.appendChild(shootingStar);
  }
  
  // Initial load
  loadLostItems();
  
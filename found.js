// Firebase config (add your messagingSenderId and appId if needed)
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
  const storage = firebase.storage();
  
  // Load found items from Firestore
  async function loadFoundItems() {
    const container = document.getElementById("found-items-list");
    container.innerHTML = "";
  
    try {
      const snapshot = await db.collection("found_items").orderBy("timestamp", "desc").get();
      snapshot.forEach(doc => {
        const data = doc.data();
        const div = document.createElement("div");
        div.classList.add("found-item");
  
        div.innerHTML = `
          <div class="text-container">
            <h2>Item found: ${data.item}</h2>
            <p>Found at: ${data.lastSeen}</p>
            <p>Finder: ${data.name}</p>
            <p>Contact: ${data.contact}</p>
            <p>Description: ${data.description}</p>
            ${data.photoUrl ? `<img src="${data.photoUrl}" alt="Found Item Photo" style="max-width: 200px;" />` : ""}
          </div>
        `;
  
        container.appendChild(div);
      });
    } catch (error) {
      console.error("Error loading found items:", error);
    }
  }
  
  // Form submission with image upload
  const form = document.getElementById("found-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const name = document.getElementById("name").value;
    const item = document.getElementById("item-found").value;
    const lastSeen = document.getElementById("last-seen").value;
    const contact = document.getElementById("contact-info").value;
    const description = document.getElementById("description").value;
    const file = document.getElementById("photo").files[0];
  
    if (!file) {
      alert("Please upload a photo of the found item.");
      return;
    }
  
    try {
      const storageRef = storage.ref().child(`found_photos/${Date.now()}_${file.name}`);
      await storageRef.put(file);
      const photoUrl = await storageRef.getDownloadURL();
  
      await db.collection("found_items").add({
        name,
        item,
        lastSeen,
        contact,
        description,
        photoUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  
      form.reset();
      loadFoundItems();
    } catch (error) {
      console.error("Error submitting found item:", error);
    }
  });
  
  // Star animations (optional visual effect)
  const starCount = 100;
  const shootingStarCount = 15;
  const body = document.body;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.top = Math.random() * 100 + "vh";
    star.style.left = Math.random() * 100 + "vw";
    star.style.animationDuration = Math.random() * 1.5 + 0.5 + "s";
    body.appendChild(star);
  }
  
  for (let i = 0; i < shootingStarCount; i++) {
    const shootingStar = document.createElement("div");
    shootingStar.classList.add("shooting-star");
    shootingStar.style.top = Math.random() * 100 + "vh";
    shootingStar.style.left = Math.random() * 100 + "vw";
    shootingStar.style.animationDelay = Math.random() * 3 + "s";
    shootingStar.style.animationDuration = Math.random() * 2 + 1 + "s";
    body.appendChild(shootingStar);
  }
  
  // Load found items on page load
  loadFoundItems();
  
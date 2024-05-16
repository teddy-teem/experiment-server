(async () => {
  addLoader();
  const response = await fetch(
    `http://192.168.8.198:8082/api/v1/campaign/${campaignId}`
  );
  const data = await response.json().then((r) => r.data);

  class EpsilonGreedy {
    constructor(items) {
      this.items = items;
      this.counts = new Array(items.length).fill(0);
      this.values = new Array(items.length).fill(0);
    }

    selectItem(epsilon) {
      const random = Math.random();
      if (random < epsilon) {
        return Math.floor(Math.random() * this.items.length);
      } else {
        // Exploit: Select the item with the highest estimated value
        return this.values.indexOf(Math.max(...this.values));
      }
    }

    update(chosenItem) {
      // Update the counts for the chosen item
      console.log("text", this.counts[chosenItem]);
      this.counts[chosenItem] += 1;
      const value = this.values[chosenItem];
      const n = this.counts[chosenItem];
      this.values[chosenItem] += ((n - 1) / n) * value + (1 / n) * 1; // Assume reward of 1 for selected item
    }
  }

  const epsilon = new EpsilonGreedy(data);
  let prevItem = NaN;

  setInterval(() => {
    const chosenItem = epsilon.selectItem(0.9);
    if (data[chosenItem].pageId !== data[prevItem]?.pageId) {
      fadeIn(data[chosenItem].htmlContent);
    }
    console.log(chosenItem, prevItem);
    prevItem = chosenItem;
    data[chosenItem].htmlContent;
    epsilon.update(chosenItem);
    console.log("=>>>Counts:", epsilon.counts);
    console.log("=>>>Values:", epsilon.values);
  }, 10000);
})();

function fadeIn(newContent) {
  element.style.opacity = 0; // Start invisible
  element.innerHTML = newContent; // Set content before animation (optional for smoother transition)

  // Animation logic
  const animationDuration = 3000; // Adjust duration as needed (in milliseconds)
  let startTime = null;

  const animate = (timestamp) => {
    if (!startTime) startTime = timestamp;
    const elapsed = timestamp - startTime;
    const progress = elapsed / animationDuration;

    element.style.opacity = Math.min(progress, 1); // Smooth fade-in

    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
}

function addLoader() {
  var loaderContainer = element;
  var loader = document.createElement("div");
  loader.classList.add("loader");
  loaderContainer.appendChild(loader);

  loader.style.position = "fixed";
  loader.style.top = "50%";
  loader.style.left = "50%";
  loader.style.transform = "translate(-50%, -50%)";
  loader.style.border = "8px solid #f3f3f3"; /* Light grey */
  loader.style.borderTop = "8px solid #3498db"; /* Blue */
  loader.style.borderRadius = "50%";
  loader.style.width = "50px";
  loader.style.height = "50px";

  // Define keyframe animation for loader
  var keyframes = [
    { transform: "rotate(0deg)" },
    { transform: "rotate(360deg)" },
  ];
  var options = {
    duration: 1000, // 1 second
    iterations: Infinity, // Infinite loop
    easing: "linear", // Linear animation
  };

  loader.animate(keyframes, options);
}

function makeCTR(contentId, contentData) {
  fetch(
    "http://192.168.8.198:8082/api/v1/ctr/019c0500-e193-4dbd-ad03-2f0bc1881895?contentId=" +
      contentId +
      "&contentData=" +
      contentData
  )
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
}

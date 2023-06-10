function init() {
  // Get the selected tab from localStorage or default to 'home'
  var selectedTab = localStorage.getItem("selectedTab") || "home";
  console.log("Selected tab from localStorage:", selectedTab); // Debugging log

  // Remove the 'hidden' class from the selected tab and add the 'active' class to the corresponding button
  document.getElementById(selectedTab).classList.remove("hidden");
  document.getElementById(`${selectedTab}-tab`).classList.add("active");
}

    /* ----------------------------------------------------------------------
        ***     Display unsplash background 
    ---------------------------------------------------------------------- */
    const accessKey = 'tktsbfDjptg6n6dFgVni02cAWpjkRizuMbN-pLCMZ34'; // Replace with your Unsplash API access key
    const collectionId = '8746741'; // Replace with the desired collection ID

    const localImages = [
    '../img/image1.jpg',
    '../img/image2.jpg',
    '../img/image3.jpg'
    // ... add more image paths
];

    async function fetchRandomPhoto() {
        const url = `https://api.unsplash.com/photos/random?collections=${collectionId}&client_id=${accessKey}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            const data = await response.json();
            const width = 2560;
            const height = 1440;
            const photoUrl = `${data.urls.raw}&w=${width}&h=${height}`; // Append width and height to the raw image URL
            const name = data.user.name;
            const userProfileUrl = data.user.links.html;

            const photoDetails = document.getElementById('photoDetails');
            photoDetails.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';


            // Add "Photo by" text
            const photoByText = document.createTextNode('Photo by ');
            photoDetails.appendChild(photoByText);

            // Create and append the photoUsername element
            const photoUsername = document.createElement('a');
            photoUsername.textContent = name;
            photoUsername.href = userProfileUrl;
            photoUsername.target = '_blank';



            photoDetails.appendChild(photoUsername);
                    
            //const username = data.user.username;
            //const userProfileUrl = data.user.links.html;

            //document.getElementById('randomPhoto').src = photoUrl;
            //document.getElementById('photoUsername').textContent = username;
            // document.getElementById('photoUsername').textContent = name;
            // document.getElementById('photoUsername').href = userProfileUrl; // Set the href attribute of the <a> tag

            return photoUrl;

        } catch (error) {
            console.error('Error fetching random photo:', error);
        }
    }

    function setBackgroundImage(elementId, imageUrl) {
        const element = document.getElementById(elementId);

        if (imageUrl) {
            element.style.backgroundImage = `url('${imageUrl}')`;
        } else {
          
            // element.style.backgroundColor = '#fff'; // Default background color
            element.style.backgroundImage = "url('../img/default.jpg')"; // Default background image
        }
    }

    function getRandomImage() {
        const useUnsplashImage = Math.random() < 0.8; // Adjust the probability of using an Unsplash image (0.2 = 20% chance)

        if (useUnsplashImage) {
            return fetchRandomPhoto();
        } else {
            return new Promise((resolve) => {
                const randomIndex = Math.floor(Math.random() * localImages.length);
                resolve(localImages[randomIndex]);
            });
        }
    }

    window.onload = async function() {
        const imageUrl = await getRandomImage();
        setBackgroundImage('backgroundElement', imageUrl);
    };
    /* ----------------------------------------------------------------------
            END Display unsplash background 
    ---------------------------------------------------------------------- */
 

    /* ----------------------------------------------------------------------
        ***     Hover on/off unsplash background
    ---------------------------------------------------------------------- */
    function showContent() {
        var backgroundElement = document.getElementById('backgroundElement');
        for (var i = 0; i < backgroundElement.children.length; i++) {
            backgroundElement.children[i].style.visibility = 'visible';
        }
    }

    function hideContent() {
        var backgroundElement = document.getElementById('backgroundElement');
        for (var i = 0; i < backgroundElement.children.length; i++) {
            backgroundElement.children[i].style.visibility = 'hidden';
        }
    }
    /* ----------------------------------------------------------------------
            END Hover on/off unsplash background
    ---------------------------------------------------------------------- */

    /* ----------------------------------------------------------------------
        ***     Show hide tabs
    ---------------------------------------------------------------------- */
function showTab(tabId) {
  console.log("Showing tab:", tabId); // Debugging log

  let tabContainers = document.getElementsByClassName("container");
  let tabButtons = document.getElementsByClassName("tab");

  for (let i = 0; i < tabContainers.length; i++) {
    tabContainers[i].classList.add("hidden");
    tabButtons[i].classList.remove("active");
  }

  document.getElementById(tabId).classList.remove("hidden");
  document.getElementById(`${tabId}-tab`).classList.add("active");

  // Save the selected tab to localStorage
  localStorage.setItem("selectedTab", tabId);
}
    /* ----------------------------------------------------------------------
        END     Show hide tabs
    ---------------------------------------------------------------------- */





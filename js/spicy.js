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
        element.style.backgroundImage = `url('${imageUrl}')`;
    }

    function getRandomImage() {
        const useUnsplashImage = Math.random() < 0.5; // Adjust the probability of using an Unsplash image (0.2 = 20% chance)

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
        var tabs = document.getElementsByClassName('container');
        for (var i = 0; i < tabs.length; i++) {
            tabs[i].classList.add('hidden');
        }
        document.getElementById(tabId).classList.remove('hidden');

        var tabButtons = document.getElementsByClassName('tab');
        for (var i = 0; i < tabButtons.length; i++) {
            tabButtons[i].classList.remove('active');
        }
        document.getElementById(tabId + '-tab').classList.add('active');

        // Store the selected tab in localStorage
        localStorage.setItem('selectedTab', tabId);
    }
    /* ----------------------------------------------------------------------
        END     Show hide tabs
    ---------------------------------------------------------------------- */
    function init() {
        // Get the selected tab from localStorage or default to 'home'
        var selectedTab = localStorage.getItem('selectedTab') || 'home';
        showTab(selectedTab);
    }
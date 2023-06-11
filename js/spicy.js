window.onload = async function () {
  const imageUrl = await getRandomImage();
  setBackgroundImage("backgroundElement", imageUrl);

};

    /* ----------------------------------------------------------------------
        ***     Display unsplash background 
    ---------------------------------------------------------------------- */
    const accessKey = 'tktsbfDjptg6n6dFgVni02cAWpjkRizuMbN-pLCMZ34'; // Replace with your Unsplash API access key
    const collectionId = '8746741'; // Replace with the desired collection ID

    const localImages = [
    './img/image1.jpg',
    './img/image2.jpg',
    './img/image3.jpg',
    './img/image4.jpg',   
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
            photoDetails.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';


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
            element.style.backgroundImage = "url('./img/default.jpg')"; // Default background image
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
 




function showTab(tabId) {
        const tabs = ['dailyContainer', 'magazineContainer', 'workContainer'];
        tabs.forEach(id => {
            const element = document.getElementById(id);
            element.classList.toggle('hidden', id !== tabId);
        });

        localStorage.setItem('selectedTab', tabId);
        updateActiveTab(tabId);
    }

    function updateActiveTab(tabId) {
        const tabButtons = document.querySelectorAll('.tab');
        tabButtons.forEach(button => {
            if (button.getAttribute('data-tab') === tabId) {
                button.classList.add('border-b-2', 'border-blue-500');
            } else {
                button.classList.remove('border-b-2', 'border-blue-500');
            }
        });
    }

    function updateDateTime() {
        const now = new Date();
        const dateOptions = {
            weekday: 'long',
            // year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            // second: '2-digit',
            hour12: true,
        };
        const formattedDate = now.toLocaleDateString('en-GB', dateOptions);
        const formattedTime = now.toLocaleTimeString('en-GB', timeOptions);
        document.getElementById('dateContainer').textContent = formattedDate;
        document.getElementById('timeContainer').textContent = formattedTime;
    }



        function updateCounter() {
            const counterKey = 'refreshCounter';
            let counter = localStorage.getItem(counterKey);

            if (counter === null) {
                counter = 0;
            } else {
                counter = parseInt(counter, 10);
            }

            counter += 1;
            localStorage.setItem(counterKey, counter);

            const counterElement = document.getElementById('counter');
            counterElement.textContent = `Refresh Count: ${counter}`;

            if (counter >= 1 && counter <= 10) {
                counterElement.classList.add('color-red');
            } else if (counter >= 11 && counter <= 70) {
                counterElement.classList.add('color-green');
            } else if (counter >= 71 && counter <= 130) {
                counterElement.classList.add('color-blue');
            }
        }

        document.addEventListener('DOMContentLoaded', updateCounter);




document.addEventListener('DOMContentLoaded', () => {
    let selectedTab = localStorage.getItem('selectedTab');
    if (selectedTab === null) {
        selectedTab = 'dailyContainer';
    }
    showTab(selectedTab);
    updateDateTime();
});


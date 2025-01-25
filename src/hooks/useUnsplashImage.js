import { useState, useEffect } from 'react';

const useUnsplashImage = (accessKey, collectionId, width, height, defaultImages) => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(null);
  const [photographerName, setPhotographerName] = useState('');
  const [photographerProfileUrl, setPhotographerProfileUrl] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const shouldFetchImage = Math.random() > 0.5;

    if (shouldFetchImage) {
      const url = `https://api.unsplash.com/photos/random?collections=${collectionId}&client_id=${accessKey}&w=${width}&h=${height}`;

      setIsLoading(true);
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setIsLoading(false);
          if (data && data.urls && data.urls.full) {
            setBackgroundImageUrl(data.urls.full);
            if (data.user) {
              if (data.user.name) {
                setPhotographerName(data.user.name);
              }
              if (data.user.links && data.user.links.html) {
                const utmParameters = '?utm_source=szwsaoyika.io&utm_medium=referral';
                setPhotographerProfileUrl(data.user.links.html + utmParameters);
              }
            }
            if (data.id) {
              setPhotoUrl(`https://unsplash.com/photos/${data.id}`);
            }
          }
        })
        .catch((error) => {
          setIsLoading(false);
          setError('Error fetching Unsplash image');
          console.error('Error fetching Unsplash image:', error);
        });
    } else {
      const randomIndex = Math.floor(Math.random() * defaultImages.length);
      setBackgroundImageUrl(defaultImages[randomIndex]);
    }
  }, [accessKey, collectionId, width, height, defaultImages]);

  return [backgroundImageUrl, photographerName, photographerProfileUrl, photoUrl, isLoading, error];
};

export default useUnsplashImage;
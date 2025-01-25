import useUnsplashImage from './useUnsplashImage';
import backgroundImages from '../components/backgroundImages';

const useBackgroundImage = (accessKey, collectionId, width, height) => {
  const [backgroundImageUrl, photographerName, photographerProfileUrl, isLoading] = useUnsplashImage(
    accessKey,
    collectionId,
    width,
    height,
    backgroundImages
  );

  const styleUnsplash = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return [styleUnsplash, photographerName, photographerProfileUrl, isLoading];
};

export default useBackgroundImage;
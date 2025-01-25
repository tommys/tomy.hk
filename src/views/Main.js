import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
/* Custom Components */
import CounterOnRefresh from '../components/CounterOnRefresh';
import backgroundImages from '../components/backgroundImages';
import SheetCellDisplay from '../components/SheetCellDisplay';
import DateTimeDisplay from '../components/DateTimeDisplay';
import DayPeriod from '../components/DayPeriod';
import RandomText from '../components/RandomText';
import Dropdown from '../components/Dropdown';
import Modal from '../components/Modal';


/* Custom Hooks */
import useLocalStorage from '../hooks/useLocalStorage';
import useUnsplashImage from '../hooks/useUnsplashImage';
import useToggleWithLocalStorage from '../hooks/useToggleWithLocalStorage';

const Main = () => {

 
    const apiKey = process.env.REACT_APP_SHEET_API_KEY;
    const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;
    const sheetId= process.env.REACT_APP_X_API_KEY;


    

    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModalVisibility = () => {
        setIsModalVisible(!isModalVisible);    

    };

    const [activeTab, setActiveTab] = useLocalStorage('activeTab');

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    const collectionId = '8746741';
    const width = 2560;
    const height = 1440;
    const [
        backgroundImageUrl,
        photographerName,
        photographerProfileUrl,
        photoUrl, // Add this line
        isLoading,
    ] = useUnsplashImage(accessKey, collectionId, width, height, backgroundImages);


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
        alignItems: 'center'
    };

  return (
<main>

  <LoadingBar
  className="loadingTopBar"
  height={3}
  shadow={false}
  progress={isLoading ? 50 : 100}
  onLoaderFinished={() => {}}
  transitionTime={800}
  waitingTime={1000}
  />

  <div id="backgroundElement" style={styleUnsplash}>
  <div className="fullscreen center">

  <header>
    <SheetCellDisplay sheetId={sheetId} apiKey={apiKey} />
    <DateTimeDisplay/>
    <DayPeriod />
    <div id="RandomText"><RandomText /></div>
    <Dropdown />        
  </header>
    




    
           <div className="google">
            <a href="https://www.google.com.hk/" rel="noopener noreferrer">
                <span className="g">G</span>
                <span className="o">o</span>
                <span className="oo">o</span>
                <span className="g">g</span>
                <span className="l">l</span>
                <span className="e">e</span>
            </a>
            </div>

    <div id="photoDetails">
      {
        styleUnsplash.backgroundImage && ( <> { photoUrl && photographerName && photographerProfileUrl && (
        <div className='photoDetailsBg'><a href={photoUrl} target="_blank" rel="noopener noreferrer">Photo</a> by  {' '}<a href={photographerProfileUrl} target="_blank" rel="noopener noreferrer">{photographerName}</a>
        {' '}on <a href="https://unsplash.com">unsplash.com</a></div>
        )
        } </>
        )
      }
    </div>


  <footer>
    <div id="refreshCounter"><CounterOnRefresh/></div>
  </footer>

  </div>
  </div>
</main>)
}
export default Main;
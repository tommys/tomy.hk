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

import DriversPage from '../components/DriversPage';

// import pagesData from '../data/pagesData.json';


/* Websites Components */
import WebsiteCards from '../components/WebsiteCards';
import { dailyWebsites, magazineWebsites, workWebsites, devWebsites } from '../components/websitesData';

/* Custom Hooks */
import useLocalStorage from '../hooks/useLocalStorage';
import useUnsplashImage from '../hooks/useUnsplashImage';
import useToggleWithLocalStorage from '../hooks/useToggleWithLocalStorage';

const Main = () => {

    const sheetId = '19Owd_x2-moUk6kQfaNNJJKe6Y8jM9StOI63whGkgOKc'; // Twitter Sheet
    //  const sheetId = '10tPkRpFQz4Kea9eDz6R_NREn-f5ehh6k0tR1HWqeNEw'; // Spotify Sheet

    const apiKey = process.env.REACT_APP_SHEET_API_KEY;
    const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

    const [isContainerVisible, toggleContainerVisibility] = useToggleWithLocalStorage('shows-container', true);
    

    const [isModalVisible, setIsModalVisible] = useState(false);

    const toggleModalVisibility = () => {
        setIsModalVisible(!isModalVisible);    
        toggleContainerVisibility();
    };

    const [activeTab, setActiveTab] = useLocalStorage('activeTab', 'dailyContainer');

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
    <Dropdown isContainerVisible={isContainerVisible} toggleContainerVisibility={toggleContainerVisibility} />        
  </header>
    

    {isModalVisible && <Modal toggleModalVisibility={toggleModalVisibility} />}


  <div className={`shows-container ${isContainerVisible ? 'visible' : 'hidden'}`}>



    <div className="tabNavigation">

            <div className="google">
            <a href="https://www.google.com.hk/" target="_blank" rel="noopener noreferrer">
                <span className="g">G</span>
                <span className="o">o</span>
                <span className="oo">o</span>
                <span className="g">g</span>
                <span className="l">l</span>
                <span className="e">e</span>
            </a>
            </div>

        <div className={`tab ${activeTab==='dailyContainer' ? 'activeTab' : '' }`} onClick={()=> handleTabClick('dailyContainer')}>
            Daily
        </div>
        <div className={`tab ${activeTab==='magazineContainer' ? 'activeTab' : '' }`} onClick={()=> handleTabClick('magazineContainer')}>
            Magazine
        </div>
        <div className={`tab ${activeTab==='devWebsites' ? 'activeTab' : '' }`} onClick={()=> handleTabClick('devWebsites')}>
            Dev
        </div>
        <div className={`tab ${activeTab==='workContainer' ? 'activeTab' : '' }`} onClick={()=> handleTabClick('workContainer')}>
            Work
        </div>
    </div>

    <div className={`dailyContainer ${activeTab === 'dailyContainer' ? 'active' : 'hidden'}`}>
      <WebsiteCards websites={dailyWebsites} />
    </div>

    <div className={`magazineContainer ${activeTab === 'magazineContainer' ? 'active' : 'hidden'}`}>
      <WebsiteCards websites={magazineWebsites} />
    </div>

    <div className={`devWebsites ${activeTab === 'devWebsites' ? 'active' : 'hidden'}`}>
      <WebsiteCards websites={devWebsites} />
    </div>

    <div className={`workContainer ${activeTab === 'workContainer' ? 'active' : 'hidden'}`}>
      <WebsiteCards websites={workWebsites} />
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

  </div>




  <footer>
    <div id="refreshCounter"><CounterOnRefresh/></div>
    <button className="thomasdiaryPop" onClick={toggleModalVisibility}>Thomasdiary</button>
  </footer>

  </div>
  </div>
</main>)
}
export default Main;
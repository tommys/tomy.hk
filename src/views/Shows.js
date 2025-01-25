import React from 'react';
import { Link } from 'react-router-dom';
import '../css/shows.css';
import PropTypes from 'prop-types';
import LoadingBar from 'react-top-loading-bar';

/* Custom Components */
import CounterOnRefresh from '../components/CounterOnRefresh';
import backgroundImages from '../components/backgroundImages';
// import RandomFact from '../components/RandomFact';
import SheetCellDisplay from '../components/SheetCellDisplay';
import DateTimeDisplay from '../components/DateTimeDisplay';
import DayPeriod from '../components/DayPeriod';
import RandomText from '../components/RandomText';
import Dropdown from '../components/Dropdown';

// Fake CMS
import pageData from '../data/pageData';
import defaultThumbnail from '../data/content/images/thumbs/defaultThumbnail.jpg';


/* Custom Hooks */
// import useLocalStorage from '../hooks/useLocalStorage';
import useUnsplashImage from '../hooks/useUnsplashImage';
import useToggleWithLocalStorage from '../hooks/useToggleWithLocalStorage';


const Shows = () => {

    const sheetId = '19Owd_x2-moUk6kQfaNNJJKe6Y8jM9StOI63whGkgOKc'; // Twitter Sheet
    //  const sheetId = '10tPkRpFQz4Kea9eDz6R_NREn-f5ehh6k0tR1HWqeNEw'; // Spotify Sheet

		const apiKey = process.env.REACT_APP_SHEET_API_KEY;
		const accessKey = process.env.REACT_APP_UNSPLASH_ACCESS_KEY;

		const [isContainerVisible, toggleContainerVisibility] = useToggleWithLocalStorage('shows-container', true);

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
<>
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


		<div className={`shows-container ${isContainerVisible ? 'visible' : 'hidden'}`}>

			<div className="pages-links">
				<ul>
					{pageData.map(page => (
					<li id={page.slug} key={page.id}>
						<Link to={`/explore/${page.slug}`}>
						<img
						src={page.thumbnail || defaultThumbnail}
						alt={`Thumbnail for ${page.title}`}
						style={{ width: '100px', marginRight: '10px' }}
						/>
						{page.title}
						</Link>
					</li>
					))}
				</ul>
			</div>

		</div>







		<footer>
			<div id="refreshCounter"><CounterOnRefresh/></div>
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
		</footer>

	</div>
	</div>
</main>
</>
);
};

Shows.propTypes = {
    setBackgroundImageUrl: PropTypes.func,
    setPhotographerName: PropTypes.func,
    setPhotographerProfileUrl: PropTypes.func
};

export default Shows;
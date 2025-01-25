const contentful = require('contentful')

const client = contentful.createClient({
  space: '58ojkcr484rn',
  environment: 'master', // defaults to 'master' if not set
  accessToken: 'IPmBlH6YE6IaBVRj9HHoj2LO0vVOGnFpa5sFbqUocpI'
})

client.getEntries()
.then((response) => console.log(response.items))
.catch(console.error)






const accessKey = 'tktsbfDjptg6n6dFgVni02cAWpjkRizuMbN-pLCMZ34';
const collectionId = '8746741';
const width = 2560;
const height = 1440;


tomyswf@gmail.com
https://console.cloud.google.com/apis/credentials?project=szwsaoyika


cms
https://www.cosmicjs.com/docs/quickstart


https://chrome.google.com/u/1/webstore/devconsole/c5f3821d-9a7c-4e7d-a387-bfac8398aae0/gjhjhelignlgnacnicplibejeekhigob/edit/status







Text for creating the js fake cms

can the page url use my own custom url slug in the json instead pageid

is it possible to dymanicly create a page if i import a list of json and click on the link and router it to a url based page?

can i add one more field in json called slug and use it as custom url to replace pageid



can i create enter html code in the title and content



i am afraid one json store all listed of contents are too large, can i separate them into all single json file

can i also add images to the content

can i also add some custom inline css in the content

ok then lets add a css file for each of them



ok good, now lets add 2 more fields, categories and tags


ok, also add a field for date



now add one more custom field for me, but this field has option to let me on or off to display

now create one more field for image only to use it for listing page only in the furute which will not shows on this content page




npm install react-html-parser




[
  {
    "id": 1,
    "title": "<h1>Page 1</h1>",
    "content": "<p>This is the <strong>content</strong> of Page 1.</p>",
    "slug": "page-1"
  },
  {
    "id": 2,
    "title": "<h1>Page 2</h1>",
    "content": "<p>This is the <em>content</em> of Page 2.</p>",
    "slug": "page-2"
  }
]



// src/components/Page.js
import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const Page = ({ data }) => (
  <div>
    {/* Render the title as HTML */}
    {ReactHtmlParser(data.title)}

    {/* Render the content as HTML */}
    {ReactHtmlParser(data.content)}
  </div>
);

export default Page;
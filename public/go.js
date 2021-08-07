var projectso = async function() {
  "use strict";

  const rootAPIDomain = 'https://feature.so/api/';

  async function getData(){
    console.log(rootAPIDomain+'projectDetails');

    fetch(rootAPIDomain+'projectDetails')
      .then(function(response) {
        return response.json();
      }).then(function(data) {
        dataComplete(data);
      });
  }

  async function dataComplete(passedData){

    let scriptTag = document.createElement('script');
    scriptTag.src = "https://feature.so/iframeResizer.min.js";
    scriptTag.async = true;
    document.head.appendChild(scriptTag);

    if(passedData?.feature_data){
      passedData?.feature_data.forEach(function(feature) {
        if(feature?.feature_status === true){
          console.log(feature);
          let featureIframe = [
            '<iframe id="feature-'+feature?.feature_id+'" frameBorder="0" title="iframe" src="https://feature.so/embed/'+feature?.feature_id+'" style="width: 100%; height:auto; border:none; outline:none;" scrolling="no"></iframe>'
          ].join('');
          let iframeDiv = document.createElement('div');
          iframeDiv.innerHTML = featureIframe;
          document.querySelector(feature?.feature_path).insertAdjacentHTML('afterEnd', iframeDiv.outerHTML);
          setTimeout(function (){
            iFrameResize();
          }, 1000);
        }
      });
    }

    if (window.location.href.indexOf("featureEditor=1") > -1 && window.location.href.indexOf("featureId=") > -1 && window.location.href.indexOf("accessToken=") > -1){
      const featureId = window.location.href.split("featureId=")[1].split("&")[0];
      const accessToken = window.location.href.split("accessToken=")[1].split("&")[0];

      if(accessToken.length > 10) {
        fetch(''+rootAPIDomain+'confirmSession', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({"feature_id": featureId, "access_token": accessToken})
        })
        .then(function (response) {
          return response.json();
        })
        .then(function (result) {
          console.log(result);
          if(result?.token_confirmed === true && result?.token_expired === false){
            initialiseEditor(featureId, accessToken);
          }
        })
        .catch (function (error) {
          console.log('Request failed', error);
        });
      }
    }
  }

  await getData();

  function initialiseEditor(featureId, accessToken){

    const editorHtmlStyling = `
      body.featureso-body {
        cursor: pointer !important;
      }
      .featureso-feature-overlay { 
        text-align: center !important;
        background: #2d8589 !important;
        color: #fff !important;
        font-size: 20px !important;
        padding: 3rem !important;
        width: 100% !important;
        position: fixed !important;
        bottom: 0 !important;
        left: 0 !important;
        z-index: 10000000 !important;
      }
      .featureso-wrapper {
        width: 92% !important;
        max-width: 1500px !important;
        margin: 0 auto !important;
      }
      .featureso-feature-overlay svg {
        width: 100% !important; 
        max-width: 150px !important ; 
        height: auto !important; 
        margin: 0 auto 15px !important;
      }
      .featureso-feature-overlay p.title {
        font-size: 15px !important;
        letter-spacing: 0px !important;
        font-family: sans-serif !important;
        line-height: 17px !important;
      }
      .featureso-feature-element-highlight {
        border-bottom: 50px solid #2d8589 !important;
        cursor: pointer !important;
        transition: none !important;
      }
      .featureso-buttons {
        margin-top: 2rem !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }
      .featureso-button {
        border: none !important;
        padding: 0.8rem 1.25rem !important;
        border-radius: 30px !important;
        font-size: 18px !important;
        letter-spacing: 0px !important;
        font-family: sans-serif !important;
        font-weight: bold !important;
        background-color: #fff !important;
        color: #000 !important;
        cursor: pointer !important;
      }
      .featureso-button__delete {
        background-color: #da3c3c !important;
        color: #fff !important; 
        margin-left: 10px !important;
      }
      .featureso-noclick {
        pointer-events: none !important;
        cursor: progress !important;
      }
    `;

    let styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = editorHtmlStyling;
    document.head.appendChild(styleSheet);

    const editorHtml = [
      '<div class="featureso-feature-overlay">',
        '<div class="featureso-wrapper">',
          '<svg xmlns="http://www.w3.org/2000/svg" width="1294" height="239" viewBox="0 0 1294 239"><path fill="#fff" fill-rule="nonzero" d="M70 236V111.2h27.6V68.6H70v-1.5c0-8.8 2-14.9 6-18.3 4-3.4 10.9-4.8 20.7-4.2V1.1C94.9.9 92.1.8 88.3.8 65.5.8 48.2 6.15 36.4 16.85 24.6 27.55 18.7 43.2 18.7 63.8v4.8H.1v42.6h18.6V236H70zm114 2.4c13.6 0 25.9-2.5 36.9-7.5s20.15-11.9 27.45-20.7a74.92 74.92 0 0015.15-29.7h-54.6c-5 10.8-13.9 16.2-26.7 16.2-8.6 0-15.85-2.75-21.75-8.25S151.2 175 150.4 164.6h116.1c.6-5.2.9-10.2.9-15 0-16.8-3.55-31.5-10.65-44.1a73.24 73.24 0 00-29.55-29.1c-12.6-6.8-27-10.2-43.2-10.2-16.6 0-31.3 3.5-44.1 10.5s-22.75 17-29.85 30c-7.1 13-10.65 28.2-10.65 45.6 0 17.4 3.6 32.6 10.8 45.6 7.2 13 17.2 23 30 30s27.4 10.5 43.8 10.5zm30.9-102.3h-64.2c1.4-9.2 5.05-16.3 10.95-21.3 5.9-5 13.15-7.5 21.75-7.5 9 0 16.5 2.6 22.5 7.8 6 5.2 9 12.2 9 21zm130.8 102.3c11.8 0 22.15-2.4 31.05-7.2 8.9-4.8 15.85-11.1 20.85-18.9V236h51.3V68.6h-51.3v23.7c-4.8-7.8-11.65-14.1-20.55-18.9-8.9-4.8-19.25-7.2-31.05-7.2-13.8 0-26.3 3.5-37.5 10.5s-20.05 17-26.55 30-9.75 28.1-9.75 45.3c0 17.2 3.25 32.35 9.75 45.45 6.5 13.1 15.35 23.2 26.55 30.3a68.07 68.07 0 0037.2 10.65zm15.3-44.7c-10.2 0-18.85-3.75-25.95-11.25-7.1-7.5-10.65-17.65-10.65-30.45s3.55-22.85 10.65-30.15A34.83 34.83 0 01361 110.9c10.2 0 18.85 3.7 25.95 11.1 7.1 7.4 10.65 17.5 10.65 30.3s-3.55 22.9-10.65 30.3c-7.1 7.4-15.75 11.1-25.95 11.1zM567.4 236v-43.5h-18.3c-5.6 0-9.6-1.1-12-3.3-2.4-2.2-3.6-5.8-3.6-10.8v-67.2h33.6V68.6h-33.6V27.8h-51.3v40.8h-20.4v42.6h20.4v66.6c0 20.6 5.2 35.45 15.6 44.55 10.4 9.1 24.9 13.65 43.5 13.65h26.1zm79.8 1.8c10.8 0 20.65-2.25 29.55-6.75 8.9-4.5 15.95-10.45 21.15-17.85V236h51.3V68.6h-51.3v90.9c0 11.2-2.9 19.9-8.7 26.1-5.8 6.2-13.7 9.3-23.7 9.3-9.8 0-17.6-3.1-23.4-9.3-5.8-6.2-8.7-14.9-8.7-26.1V68.6h-51v97.8c0 14.6 2.7 27.3 8.1 38.1 5.4 10.8 13 19.05 22.8 24.75 9.8 5.7 21.1 8.55 33.9 8.55zm178.2-1.8v-77.7c0-13.8 3.2-23.45 9.6-28.95 6.4-5.5 16-8.25 28.8-8.25h14.1V66.8c-11 0-21 2.65-30 7.95-9 5.3-16.5 12.55-22.5 21.75V68.6h-51.3V236h51.3zm139.5 2.4c13.6 0 25.9-2.5 36.9-7.5s20.15-11.9 27.45-20.7a74.92 74.92 0 0015.15-29.7h-54.6c-5 10.8-13.9 16.2-26.7 16.2-8.6 0-15.85-2.75-21.75-8.25S932.1 175 931.3 164.6h116.1c.6-5.2.9-10.2.9-15 0-16.8-3.55-31.5-10.65-44.1a73.24 73.24 0 00-29.55-29.1c-12.6-6.8-27-10.2-43.2-10.2-16.6 0-31.3 3.5-44.1 10.5s-22.75 17-29.85 30c-7.1 13-10.65 28.2-10.65 45.6 0 17.4 3.6 32.6 10.8 45.6 7.2 13 17.2 23 30 30s27.4 10.5 43.8 10.5zm30.9-102.3h-64.2c1.4-9.2 5.05-16.3 10.95-21.3 5.9-5 13.15-7.5 21.75-7.5 9 0 16.5 2.6 22.5 7.8 6 5.2 9 12.2 9 21zm73.1 101.3c4 0 7.4-1.4 10.2-4.2 2.8-2.8 4.2-6.27 4.2-10.4 0-4.13-1.4-7.6-4.2-10.4-2.8-2.8-6.2-4.2-10.2-4.2-4.13 0-7.6 1.4-10.4 4.2-2.8 2.8-4.2 6.27-4.2 10.4 0 4.13 1.4 7.6 4.2 10.4 2.8 2.8 6.27 4.2 10.4 4.2zm66 .4c8.53 0 15.97-1.4 22.3-4.2 6.33-2.8 11.23-6.67 14.7-11.6a28.51 28.51 0 005.2-16.8c-.13-7.07-2.07-12.73-5.8-17a36.67 36.67 0 00-13.3-9.7c-5.13-2.2-11.7-4.37-19.7-6.5-6-1.73-10.53-3.17-13.6-4.3a22.8 22.8 0 01-7.8-4.7 9.74 9.74 0 01-3.2-7.4c0-3.73 1.6-6.73 4.8-9 3.2-2.27 7.8-3.4 13.8-3.4 6.13 0 11 1.47 14.6 4.4 3.6 2.93 5.6 6.87 6 11.8h22.8c-.53-10.93-4.63-19.57-12.3-25.9-7.67-6.33-17.77-9.5-30.3-9.5-8.4 0-15.83 1.4-22.3 4.2-6.47 2.8-11.43 6.63-14.9 11.5a27.13 27.13 0 00-5.2 16.1c0 7.2 1.9 13 5.7 17.4 3.8 4.4 8.3 7.67 13.5 9.8 5.2 2.13 11.93 4.33 20.2 6.6 8.53 2.4 14.77 4.6 18.7 6.6 3.93 2 5.9 5.07 5.9 9.2 0 3.87-1.77 7.03-5.3 9.5-3.53 2.47-8.5 3.7-14.9 3.7-6.13 0-11.23-1.57-15.3-4.7s-6.3-7.03-6.7-11.7h-23.6a31.9 31.9 0 006.4 18.1c4 5.4 9.43 9.67 16.3 12.8 6.87 3.13 14.63 4.7 23.3 4.7zm101.6 0c10.53 0 20.17-2.37 28.9-7.1a52.62 52.62 0 0020.7-20.1c5.07-8.67 7.6-18.6 7.6-29.8s-2.47-21.13-7.4-29.8a51.11 51.11 0 00-20.2-20c-8.53-4.67-18.07-7-28.6-7-10.53 0-20.07 2.33-28.6 7a51.11 51.11 0 00-20.2 20c-4.93 8.67-7.4 18.6-7.4 29.8 0 11.33 2.4 21.3 7.2 29.9a51 51 0 0019.8 20c8.4 4.73 17.8 7.1 28.2 7.1zm0-19.8c-9.2 0-16.83-3.23-22.9-9.7-6.07-6.47-9.1-15.63-9.1-27.5 0-8 1.47-14.77 4.4-20.3 2.93-5.53 6.9-9.7 11.9-12.5 5-2.8 10.43-4.2 16.3-4.2 5.87 0 11.33 1.4 16.4 4.2 5.07 2.8 9.13 6.97 12.2 12.5 3.07 5.53 4.6 12.3 4.6 20.3s-1.6 14.8-4.8 20.4c-3.2 5.6-7.37 9.8-12.5 12.6a33.93 33.93 0 01-16.5 4.2z"></path></svg>',
          '<p class="title">Feature.so is a no-code content editor. Hover over an area on your website, and click to confirm where you would like the new feature to be added. The new feature will always be added after the element that you selected.</p>',
        '</div>',
      '</div>'
    ].join('');
    let editorDiv = document.createElement('div');
    editorDiv.innerHTML = editorHtml;
    document.documentElement.appendChild(editorDiv);

    document.body.classList.add('featureso-body');

    const sectionIframe = [
      '<iframe id="feature-'+featureId+'" frameBorder="0" title="iframe" src="https://feature.so/embed/'+featureId+'" style="width: 100%; height:auto; border:none; outline:none;" scrolling="no"></iframe>'
    ].join('');
    let iframeDiv = document.createElement('div');
    iframeDiv.innerHTML = sectionIframe;

    document.body.addEventListener("click", function(e) {
      e.preventDefault();
      
      document.querySelectorAll('#feature-'+featureId+'').forEach(function(feature) {
        feature.parentNode.removeChild(feature);
      });

      e.target.insertAdjacentHTML('afterEnd', iframeDiv.outerHTML);

      setTimeout(function (){
        iFrameResize();
      }, 1000);

      sectionAdded(e.path, featureId, accessToken);
      
    });
  }

  function sectionAdded(targetElement, featureId, accessToken){
    const overlay = document.querySelector('.featureso-feature-overlay');
    let arrayOne = targetElement[1].classList.value.split(/\s+/);
    let selectorOne = '.' + arrayOne.join('.');
    let arrayTwo = targetElement[0].classList.value.split(/\s+/);
    let selectorTwo = '.' + arrayTwo.join('.');
    let joinedArray = selectorOne+" "+selectorTwo;
    joinedArray = joinedArray.replace(".featureso-body", "");
    joinedArray = joinedArray.replace(". .", " .");

    const confirmHtml = [
      '<div class="featureso-confirm-box">',
        '<div class="featureso-buttons">',
          '<button class="featureso-button featureso-button__confirm">Add to site</button>',
          '<button class="featureso-button featureso-button__delete">Delete</button>',
        '</div>',
      '</div>'
    ].join('');
    if(!overlay.querySelector('.featureso-confirm-box')){
      overlay.innerHTML += confirmHtml;
    }
    document.querySelector('.featureso-button__confirm').addEventListener("click", function(e) {
      e.target.classList.add("featureso-noclick");

      fetch(''+rootAPIDomain+'addToSite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"feature_id": featureId, "access_token": accessToken, "targetElement": joinedArray })
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (result) {
        console.log(result);
        if(result?.token_confirmed === true && result?.token_expired === false && feature_added === true){
          window.open('https://feature.so/dashboard/'+result?.project_domain+'/features', '_blank');window.setTimeout(function(){this.close();},1000)
        }
      })
      .catch (function (error) {
        console.log('Request failed', error);
      });
    });
  }

}({});
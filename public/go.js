var projectso = async function() {
  "use strict";

  const rootAPIDomain = 'http://localhost:3000/api/';

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
    if (window.location.href.indexOf("featureEditor=1") > -1 && window.location.href.indexOf("featureId=") > -1){
      // const featureId = window.location.href.split("featureId=")[1].split("&")[0];

      // if(accessToken.length > 10) {
      //   fetch(''+rootAPIDomain+'confirmSession', {
      //     method: 'POST',
      //     headers: {
      //       'Content-Type': 'application/json'
      //     },
      //     body: JSON.stringify({"access_token": accessToken})
      //   })
      //   .then(function (response) {
      //     return response.json();
      //   })
      //   .then(function (result) {
      //     console.log(result);
      //   })
      //   .catch (function (error) {
      //       console.log('Request failed', error);
      //   });
      // }
    }
  }

  const editorHtmlStyling = `
    .feature-overlay { 
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
    }
    .feature-overlay .feature-bottom-bar {
      text-align: center;
      background: #000;
      color: #fff;
      font-size: 20px;
      padding: 2rem;
      width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
    }
    .feature-element-highlight {
      border: 4px solid red !important;
      cursor: pointer;
    }
  `;

  let styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = editorHtmlStyling;
  document.head.appendChild(styleSheet);

  const editorHtml = [
    '<div class="feature-overlay">',
      '<div class="feature-bottom-bar">Feature.so Editor</div>',
    '</div>'
  ].join('');

  let editorDiv = document.createElement('div');
  editorDiv.innerHTML = editorHtml;
  document.body.appendChild(editorDiv);

  const siteDivs = document.querySelectorAll('div');
  siteDivs.forEach(function (div) {
    div.addEventListener("mouseover", function(){
      div.classList.add("feature-element-highlight");
    });
    div.addEventListener("mouseleave", function(){
      div.classList.remove("feature-element-highlight");
    });
    div.addEventListener("click", function(e){
      e.preventDefault();
      console.log(e.target);
    });
  });

  await getData();
  
}({});
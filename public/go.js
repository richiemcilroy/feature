var projectso = function() {
  "use strict";

  const rootAPIDomain = 'https://feature.so/api/';

  async function getData(){
    fetch(rootAPIDomain+'projectDetails')
    .then(response => {
      if (!response.ok) {
        console.log(`Feature.so HTTP error! status: ${response.status}`)
      }
    })
    .then(data => {
      console.log(data);
    })
    .catch(e => {
      console.log('There has been a problem fetching your project from Feature.so - ' + e.message);
    });
  }

  await getData();
  
}({});
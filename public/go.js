var projectso = async function() {
  "use strict";

  const rootAPIDomain = 'https://feature.so/api/';

  async function getData(){
    console.log(rootAPIDomain+'projectDetails');

    fetch(rootAPIDomain+'projectDetails')
    .then(response => {
      if (!response.ok) {
        console.log(`Feature.so HTTP error! status: ${response.status}`)
      }

      console.log(response.body);
    }).catch(e => {
      console.log('There has been a problem fetching your project from Feature.so - ' + e.message);
    });
  }

  await getData();
  
}({});
var projectso = async function() {
  "use strict";

  const rootAPIDomain = 'https://feature.so/api/';

  async function getData(){
    console.log(rootAPIDomain+'projectDetails');

    fetch(rootAPIDomain+'projectDetails')
      .then(function(response) {
        return response.json();
      }).then(function(data) {
        console.log(data);
      });
  }

  await getData();
  
}({});
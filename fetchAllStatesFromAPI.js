// let listOfStates = [];
let dataOfStates = [];

// function getListOfStates(states) {
//   for (let i = 0; i < states.length; ++i) {
//     if (
//       !listOfStates.includes(states[i].Province) &&
//       states[i].Date.slice(0, 10) === new Date().toISOString().slice(0, 10)
//     ) {
//       dataOfStates.push(states[i]);
//       listOfStates.push(states[i].Province);
//     }
//   }
// }

fetch("https://api.rootnet.in/covid19-in/stats/latest")
  .then(function (response) {
    return response.json();
  })
  .then(function (dataFromAPI) {
    if (dataFromAPI.success !== true) return;
    dataOfStates = dataFromAPI.data.regional;
  })
  .then(function () {
    document.querySelector("#allStatesHeading").textContent =
      "ENTIRE CASE LIST";
    for (let i = 0; i < dataOfStates.length; ++i) {
      document.querySelector("#allStatesData").innerHTML += `
      <div class="container card" style="width: 20rem; background-color: rgb(228, 226, 226); margin: 10px">
              <div class="card-body">
                <h5 class="card-title">${dataOfStates[i].loc}</h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item bg-success h6 bg-opacity-50">
                  <div style="float: left;">Discharged</div>
                  <div style="float: right;">${dataOfStates[i].discharged}</div>
                </li>
                <li class="list-group-item bg-danger h6 bg-opacity-50">
                  <div style="float: left;">Deaths</div>
                  <div style="float: right;">${dataOfStates[i].deaths}</div>
                </li>
                <li class="list-group-item bg-info h6 bg-opacity-50">
                  <div style="float: left;">Total Indian Confirmed cases</div>
                  <div style="float: right;">${dataOfStates[i].confirmedCasesIndian}</div>
                </li>
                <li class="list-group-item bg-info h6 bg-opacity-50">
                  <div style="float: left;">Total Confirmed cases</div>
                  <div style="float: right;">${dataOfStates[i].totalConfirmed}</div>
                </li>
              </ul>
            </div>`;
    }
  });

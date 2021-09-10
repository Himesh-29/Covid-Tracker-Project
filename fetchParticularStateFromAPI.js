document
  .querySelector(".submitBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector(".search-results").innerHTML = ``;
    let dataRequire = null;
    let found = false;
    let state = document.querySelector("#choices").value;
    if (!state) return;
    fetch("https://api.rootnet.in/covid19-in/stats/latest")
      .then(function (response) {
        return response.json();
      })
      .then(function (dataFromAPI) {
        if (dataFromAPI.success !== true) {
          document.querySelector(
            ".search-results"
          ).innerHTML = `<div class="container fs-3">Server busy!`;
          return;
        }
        dataFromAPI.data.regional.forEach((eachState) => {
          if (eachState.loc.toLowerCase() === state.toLowerCase()) {
            dataRequire = eachState;
            found = true;
          }
          if (state.toLowerCase() === eachState.loc.toLowerCase().slice(0, -3)) {
            dataRequire = eachState;
            found = true;
          }
        });
        if (found === false) {
          document.querySelector(
            ".search-results"
          ).innerHTML = `<div class="container fs-3">Couldn't find the state, try another one`;
        }
        return found;
      })
      .then(function (foundRet) {
        if (foundRet) {
          document.querySelector(
            ".search-results"
          ).innerHTML = `<div class="container">
    <div class="card" style="width: 23rem; background-color: rgb(228, 226, 226); margin: 30px">
    <div class="card-body">
    <h5 class="card-title">${dataRequire?.loc}</h5>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item bg-success h6 bg-opacity-50">
      <div style="float: left;">Discharged</div>
      <div style="float: right;">${dataRequire?.discharged}</div>
    </li>
    <li class="list-group-item bg-danger h6 bg-opacity-50">
      <div style="float: left;">Deaths</div>
      <div style="float: right;">${dataRequire?.deaths}</div>
    </li>
    <li class="list-group-item bg-info h6 bg-opacity-50">
      <div style="float: left;">Total Indian Confirmed cases</div>
      <div style="float: right;">${dataRequire?.confirmedCasesIndian}</div>
    </li>
    <li class="list-group-item bg-info h6 bg-opacity-50">
      <div style="float: left;">Total Confirmed cases</div>
      <div style="float: right;">${dataRequire?.totalConfirmed}</div>
    </li>
  </ul>
</div>
</div>
    `;
        }
      });
  });

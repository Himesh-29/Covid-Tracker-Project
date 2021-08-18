let dataRequire;

// fetch("https://api.covid19api.com/live/country/india")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (dataFromAPI) {
//     // console.log(dataFromAPI);
//     let data = dataFromAPI.find(function (eachData) {
//       return (eachData.Province = "Gujarat");
//     });
//     dataRequire = data;
//     console.log(
//       "Active cases: " +
//         dataRequire.Active +
//         ", Recovered cases: " +
//         dataRequire.Recovered +
//         ", Deaths: " +
//         dataRequire.Deaths
//     );
//   })
//   .then(function () {
//     document.querySelector(".search-results").innerHTML = `
//     <table class="table table-hover table-bordered table-dark">
//     <thead>
//         <tr>
//             <th scope="col">${dataRequire.Province}</th>
//             <th></th>
//         </tr>
//     </thead>
//     <tbody>
//       <tr class="table-warning">
//         <th scope="row">Active cases</th>
//         <td>${dataRequire.Active}</td>
//       </tr>
//       <tr class="table-success">
//         <th scope="row">Recovered</th>
//         <td>${dataRequire.Recovered}</td>
//       </tr>
//       <tr  class="table-danger">
//         <th scope="row">Deaths</th>
//         <td>${dataRequire.Deaths}</td>
//       </tr>
//       <tr class="table-info">
//         <th scope="row" >Total cases till now</th>
//         <td>${dataRequire.Confirmed}</td>
//       </tr>
//     </tbody>
//     </table>
//     `;
//   });

document
  .querySelector(".submitBtn")
  .addEventListener("click", function (event) {
    event.preventDefault();
    let Value = document.querySelector("#choices").value;
    if (!Value) return;
    let state = document.querySelector('option[value="' + Value + '"]').label;
    fetch("https://api.covid19api.com/live/country/india")
      .then(function (response) {
        return response.json();
      })
      .then(function (dataFromAPI) {
        // console.log(dataFromAPI);
        let data = dataFromAPI.find(({ Province }) => Province === `${state}`);
        console.log(data);
        dataRequire = data;
        console.log(
          "Active cases: " +
            dataRequire.Active +
            ", Recovered cases: " +
            dataRequire.Recovered +
            ", Deaths: " +
            dataRequire.Deaths
        );
      })
      .then(function () {
        document.querySelector(".search-results").innerHTML = `
    <table class="table table-hover table-bordered table-dark">
    <thead>
        <tr>
            <th scope="col">${dataRequire.Province}</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
      <tr class="table-warning">
        <th scope="row">Active cases</th>
        <td>${dataRequire.Active}</td>
      </tr>
      <tr class="table-success">
        <th scope="row">Recovered</th>
        <td>${dataRequire.Recovered}</td>
      </tr>
      <tr  class="table-danger">
        <th scope="row">Deaths</th>
        <td>${dataRequire.Deaths}</td>
      </tr>
      <tr class="table-info">
        <th scope="row" >Total cases till now</th>
        <td>${dataRequire.Confirmed}</td>
      </tr>
    </tbody>
    </table>
    `;
      });
  });

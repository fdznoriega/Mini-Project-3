
// import VIS1 from './js/VIS1.js';
// import VIS2 from './js/VIS2.js';

let dataset;

d3.csv('astronauts.csv', d3.autoType)
    .then(data => {
        // compute total for each datapoint
        
        createVis(data);
    });

function createVis(data) {
    // update dataset
    dataset = data;

    console.log(data);

    // create a vis
    // ex: let areaChart = AreaChart(".chart");
    // use its update function
    // ex: areaChart.update(dataset);
    // on "brush" (interaction), update OTHER datasets
    // ex: areaChart.on("brushed", (range) => {
    //   :  stackedAreaChart.filterByDate(range);
    //   : });

    // create a vis
    // ex: let stackedAreaChart = StackedAreaChart(".chart");
    // update it
    // ex: stackedAreaChart.update(dataset);

}


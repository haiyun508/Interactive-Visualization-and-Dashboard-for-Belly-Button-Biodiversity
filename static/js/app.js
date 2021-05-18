// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("samples.json").then((importedData) => {
    console.log(importedData)
    var names = importedData.names;
    var samples = importedData.samples;
    // append sample names to list
    var list = d3.select("#selDataset");
    for (var i = 0; i < names.length; i++) {
        list.append("option").text(names[i])
    }
    // on change to the DOM, call getData()
    d3.select("#selDataset").on("change", getData);

    function getData() {
        // assign the value of the dropdown menu option to a variable
        var chosenId = d3.select("#selDataset").property("value")
        // get the data for the chosen id
        var dataset = samples.filter(sample => sample.id == chosenId)
        console.log(dataset)

        // Sort the data array using the sample-value
        dataset.sort(function (a, b) {
            return parseFloat(sample_values[b]) - parseFloat(sample_values[a]);
        });
        console.log(dataset[0].sample_values)
        // Slice the first 10 objects for plotting
        // Reverse the array due to Plotly's defaults
        var topTenValues = dataset[0].sample_values.slice(0, 10).reverse();
        console.log("value:" + topTenValues)
        var topTenOtuIds = dataset[0].otu_ids.slice(0, 10).reverse()
        topTenOtuIds = topTenOtuIds.map(topTenOtuId => 'OTU ' + topTenOtuId)
        console.log("id: " + topTenOtuIds)
        var topTenOtuLables = dataset[0].otu_labels.slice(0, 10).reverse()
        console.log("lables: " + topTenOtuLables)

        // Trace1 for the sample Data
        var trace1 = {
            x: topTenValues,
            y: topTenOtuIds,
            text: topTenOtuLables,
            type: "bar",
            orientation: "h"
        };

        // data
        var chartData = [trace1];

        // Apply the group bar mode to the layout
        var layout = {
            title: "Top Ten Bacteria Cultures Found",
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        };

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bar", chartData, layout)
    }
});
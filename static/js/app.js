function init() {
    buildPlot("940")

}
init()
// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.select("#selDataset").on("change", () => {
    var chosenId = d3.select("#selDataset").property("value")
    buildPlot(chosenId)
});

function buildPlot(chosenId) {
    d3.json("samples.json").then((importedData) => {
        console.log(importedData)
        var names = importedData.names;
        var samples = importedData.samples;
        var metadata = importedData.metadata;
        // append sample names to list
        var list = d3.select("#selDataset");
        for (var i = 0; i < names.length; i++) {
            list.append("option").text(names[i])
        }
        // get the data for the chosen id
        var dataset = samples.filter(sample => sample.id == chosenId)
        console.log(dataset)

        // Sort the data array using the sample-value
        dataset.sort(function (a, b) {
            return parseFloat(sample_values[b]) - parseFloat(sample_values[a]);
        });
        // console.log(dataset[0].sample_values)
        // Slice the first 10 objects for plotting
        // Reverse the array due to Plotly's defaults
        var topTenValues = dataset[0].sample_values.slice(0, 10).reverse();
        // console.log("value:" + topTenValues)
        var topTenOtuIds = dataset[0].otu_ids.slice(0, 10).reverse()
        topTenOtuIds = topTenOtuIds.map(topTenOtuId => 'OTU ' + topTenOtuId)
        // console.log("id: " + topTenOtuIds)
        var topTenOtuLables = dataset[0].otu_labels.slice(0, 10).reverse()
        // console.log("lables: " + topTenOtuLables)

        // Trace1 for the sample Data
        var trace1 = {
            x: topTenValues,
            y: topTenOtuIds,
            text: topTenOtuLables,
            type: "bar",
            orientation: "h"
        };


        // data
        var chartData1 = [trace1];

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
        Plotly.newPlot("bar", chartData1, layout)


        // Trace2 for the sample Data
        var trace2 = {
            x: dataset[0].otu_ids,
            y: dataset[0].sample_values,
            text: dataset[0].otu_labels,
            mode: "markers",
            marker: {
                size: dataset[0].sample_values,
                color: dataset[0].otu_ids,
            }

        };
        console.log(dataset[0].sample_values)
        console.log(dataset[0].otu_ids)
        console.log(dataset[0].otu_labels)

        // data
        var chartData2 = [trace2];

        // Apply the group bar mode to the layout
        var layout = {
            title: "Bacteria Cultures Per Sample",
            xaxis: { "title": "OTU ID" },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        }

        // Render the plot to the div tag with id "plot"
        Plotly.newPlot("bubble", chartData2, layout)

        // get demographic info for the chosen ID
        var demoInfo = metadata.filter(metadata => metadata.id == chosenId);
        var meta = d3.select("#sample-metadata").html("");
        Object.entries(demoInfo[0]).forEach(([key, value]) => {
            var para = meta.append("p").text(`${key.toUpperCase()}:${value}`)
        })
    })
}
buildPlot()


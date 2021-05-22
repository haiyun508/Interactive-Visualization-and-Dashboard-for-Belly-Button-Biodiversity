// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
d3.json("samples.json").then((importedData) => {
	console.log(importedData)
	var metadata = importedData.metadata;
	// on change to the DOM, call getData()
	d3.select("#selDataset").on("change", getData);

	function getData() {

		// assign the value of the dropdown menu option to a variable
		var chosenId = d3.select("#selDataset").property("value")
		// get the data for the chosen id
		var dataset = metadata.filter(object => object.id == chosenId)
		console.log(dataset[0].wfreq)
		// assign variable to washing frequency
		value=dataset[0].wfreq
	}
	// create data array for the trace
		var data = [
			{
				domain: { x: [0, 1], y: [0, 1] },
				value: value,
				title: { text: "Speed" },
				type: "indicator",
				mode: "gauge+number"
			}
		];
    // define plot layout
		var layout = { width: 500, height: 500, margin: { t: 0, b: 100, l: 0 } };
	// plot the chart to a division tag with id "gauge"
		Plotly.newPlot('gauge', data, layout);
	})
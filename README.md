# Plot.ly Homework - Belly Button Biodiversity

![Bacteria by filterforge.com](Images/bacteria.jpg)

In this assignment, you will build an interactive dashboard to explore the [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Step 1: Plotly

1. Use the D3 library to read in `samples.json`.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

* Use `sample_values` as the values for the bar chart.

* Use `otu_ids` as the labels for the bar chart.

* Use `otu_labels` as the hovertext for the chart.

  ![bar Chart](Images/hw01.png)

3. Create a bubble chart that displays each sample.

* Use `otu_ids` for the x values.

* Use `sample_values` for the y values.

* Use `sample_values` for the marker size.

* Use `otu_ids` for the marker colors.

* Use `otu_labels` for the text values.

![Bubble Chart](Images/bubble_chart.png)

4. Display the sample metadata, i.e., an individual's demographic information.

5. Display each key-value pair from the metadata JSON object somewhere on the page.

![hw](Images/hw03.png)

6. Update all of the plots any time that a new sample is selected.

Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown below:

![hw](Images/hw02.png)

## Advanced Challenge Assignment (Optional)

The following task is advanced and therefore optional.

* Adapt the Gauge Chart from <https://plot.ly/javascript/gauge-charts/> to plot the weekly washing frequency of the individual.

* You will need to modify the example gauge code to account for values ranging from 0 through 9.

* Update the chart whenever a new sample is selected.

![Weekly Washing Frequency Gauge](Images/gauge.png)

## Deployment

* Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo.

* Ensure your repository has regular commits (i.e. 20+ commits) and a thorough README.md file

## Hints

* Use `console.log` inside of your JavaScript code to see what your data looks like at each step.

* Refer to the [Plotly.js documentation](https://plot.ly/javascript/) when building the plots.

## Rubric

[Unit 15 Rubric - Plot.ly Homework - Belly Button Biodiversity](https://docs.google.com/document/d/14ZKfNF4ws6CxlUsrhI81Q3YD06h0QQ1PbZa6BMnr7w4/edit?usp=sharing)

- - -

## References

Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable_. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)

- - -

© 2021 Trilogy Education Services, LLC, a 2U, Inc. brand. Confidential and Proprietary. All Rights Reserved.




// Use D3 fetch to read the JSON file
// The data from the JSON file is arbitrarily named importedData as the argument
function buildPlot() {
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

// from data.js
var tableData = data;
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"];
var columnNames = ["Date", "City", "State", "Country", "Shape", "Duration", "Comments"];

// Make dropdown for search
var option = d3.select("#filter-select")
                .selectAll("option")
                .data(columns).enter()
                .append("option")
                .text((column,i) => columnNames[i])
                .attr("value", column => column)

// build the table
var table = d3.select("#table-area").append("table")
                .attr("class", "table table-hover table-striped")
                .attr("id", "ufo-table")

var thead = table.append("thead")
                .attr("id", "table-head");
var tbody = table.append("tbody");

// Add in the header
thead.append("tr")
    .selectAll("th")
    .data(columnNames).enter()
    .append("th")
    .attr("scope", "col")
    .text(column => column);


// Add in the rows
var row = tbody.selectAll("tr")
                .data(data).enter()
                .append("tr");

var cell = row.selectAll("td")
                .data(row => columns.map(column => row[column]))
                .enter()
                .append("td")
                .text(text => text);


function update(data){
    var row = d3.select("#ufo-table")
                .select("tbody")
                .selectAll("tr")
                .data(data)
                .style("display", d => d)
                
}

// Update based on selection
d3.selectAll("#search-text").on("keyup", function(){
    var searchType = d3.select("#filter-select").property("value");
    console.log(searchType);
    var targetText = d3.select("#search-text").property("value").toLowerCase();
    console.log(targetText);
    var filteredData = tableData.map(function (sighting) {
        // Make sure it's a string and lowercase
        var text = sighting[searchType].toString().toLowerCase();
        // Match the beginning unless it's a comment
        var match = searchType === "comments" ? text.includes(targetText) : text.startsWith(targetText);
        return match ? "" : "none";
    });

                                                
    update(filteredData);
});

console.log();
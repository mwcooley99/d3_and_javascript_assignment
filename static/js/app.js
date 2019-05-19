// from data.js
var tableData = data;

// YOUR CODE HERE!
// var p = d3.select("body")
//   .selectAll("p")
//   .data([4, 8, 15, 16, 23, 42,21])
//     .text(function(d) { return d; });

// // Enter…
// p.enter().append("p")
//     .text(function(d) { return d; });

// // Exit…
// p.exit().remove();

function renderTable(renderData){
    var tbody = d3.select("#table-area").select("tbody");

    thead = d3.selectAll(".table-head");
    thead.attr("scope", "col")

    tbody.selectAll("tr").remove();
    renderData.forEach((ufoSighting) => {
        var row = tbody.append("tr");
        Object.entries(ufoSighting).forEach(([key, value]) => {
            cell = row.append("td");
            if (key == "state"){
                cell.text(value.toUpperCase())
            }
            else {
                cell.text(value);
            }
            
        });
    });
}

renderTable(tableData);

var submitBtn = d3.select("#filter-btn");

submitBtn.on("click", function(){
    d3.event.preventDefault();

    var inputElement = d3.select("#datetime");
    var inputVal = inputElement.property("value");

    var filteredData = tableData.filter(sighting => sighting.datetime === inputVal);
    console.log(filteredData.length)
    if (filteredData.length == 0){
        renderTable(tableData);
    }
    else {
        renderTable(filteredData);
    }
    
})
    
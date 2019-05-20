// from data.js
var tableData = data;
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"];

var table = d3.select("#table-area").append("table")
                .attr("class", "table table-striped")
                .attr("id", "ufo-table")

var thead = table.append("thead");
var tbody = table.append("tbody");

// Add in the header
thead.append("tr")
    .selectAll("th")
    .data(columns).enter()
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
d3.select("#datetime").on("keyup", function(){
    // d3.event.preventDefault();
    var targetText = d3.select("#datetime").property("value");
    var regex = RegExp("^.*" + targetText + ".*$");
    
    var filteredData = []
    if (targetText){ // if search string isn't empty
        filteredData = tableData.map(function(sighting){
            if (sighting.datetime === targetText){
                return "";
            }    
            else {
                return "none";
            }
        });
    }
    else { 
        filteredData = tableData.map(x => "");
        console.log("Hello")
    }
        
    // console.log(filteredData);
    update(filteredData);
})

// var h2 = d3.select("#truth").style("display", "none");

var regex = RegExp("^.*test.*$")
console.log(regex.test("sdlkjfd test skdjfksl"));
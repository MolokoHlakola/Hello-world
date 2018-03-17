var valueline = d3.svg.line()
    .x(function (d) { return x(d.date) + x.rangeBand()/2; })
    .y(function (d) { return y(d.open); });

    var data = [{ date: '1-May-12', close: 58.13, open: 7.41 }, { date: '2-May-12', close: 53.98, open: 45.55 }, { date: '3-May-12', close: 67.00, open: 11.78}];

var margin = { top: 30, right: 40, bottom: 30, left: 50 },
	width = 600 - margin.left - margin.right,
	height = 270 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.scale.ordinal().rangeBands([0, width], .09); // <-- to change the width of the columns, change the .09 at the end to whatever
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
	.orient("bottom")
	.tickFormat(d3.time.format("%d-%b-%y"));

var yAxisLeft = d3.svg.axis().scale(y)
	.orient("left");

var valueline = d3.svg.line()
	.x(function (d) { return x(d.date) + x.rangeBand()/2; })
	.y(function (d) { return y(d.open); });

var svg = d3.select("body")
	.append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
	.append("g")
	.attr("transform",
		"translate(" + margin.left + "," + margin.top + ")");

// Get the data
data.forEach(function (d) {
	d.date = parseDate(d.date);
	d.close = +d.close;
	d.open = +d.open;
});

// Scale the range of the data
x.domain(data.map(function (d) { return d.date; }));
y.domain([0, d3.max(data, function (d) { return d.close; })]);

// Add the X Axis
svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

// Add the Y Axis
svg.append("g")
		.attr("class", "y axis")
		.style("fill", "steelblue")
		.call(yAxisLeft);

// Draw the bars
svg.selectAll("bar")
		.data(data)
		.enter()
		.append("rect")
		.style("fill", "#99ffcc")
		.attr("x", function (d) { return x(d.date); })
		.attr("width", x.rangeBand())
		.attr("y", function (d) { return y(d.close); })
		.attr("height", function (d) { return height - y(d.close); });

// Add the valueline path
svg.append("path")
		.attr("d", valueline(data));

    body {
      font: 12px Arial;
    }
    path {
      stroke: red;
      stroke-width: 2;
      fill: none;
    }
    .axis path,
    .axis line {
      fill: none;
      stroke: grey;
      stroke-width: 1;
      shape-rendering: crispEdges;
    }

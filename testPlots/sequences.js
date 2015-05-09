
// Dimensions of sunburst.
var width = 750;
var height = 600;
var radius = Math.min(width, height) / 2;

// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
var b = {
  w: 75, h: 30, s: 3, t: 10
};

// Mapping of step names to colors.
var colors = {
  "Aerosols":"#a50026",
"Agricultural Soils":"#d73027",
"Agriculture":"#f46d43",
"Agriculture, Foresty and Fishing":"#fdae61",
"Air":"#fee090",
"All other Manufacturing":"#ffffbf",
"Alpacas":"#e0f3f8",
"Aluminium Production":"#abd9e9",
"Animal Production":"#74add1",
"Animal Waste applied to soils":"#4575b4",
"Atmospheric Deposition":"#313695",
"Auerosols, Metred dose inhalers":"",
"Barley":"#a50026",
"Basic Chemical Manufacturing":"#d73027",
"Beef Cattle":"#f46d43",
"Boars":"#fdae61",
"Breeding Ewes":"#fee090",
"Buffalo":"#ffffbf",
"Bulls greater than one year":"#e0f3f8",
"Bulls less than one year":"#abd9e9",
"Buses":"#74add1",
"Camels":"#4575b4",
"Camels and Llamas":"#313695",
"Cars":"#a50026",
"Cattle":"#d73027",
"Cement Production":"#f46d43",
"Cement, Lime, Plaster and Concrete Manufacturing":"#fdae61",
"Ceramic Manufacturing":"#fee090",
"Cereals":"#ffffbf",
"CerealsWheat":"#e0f3f8",
"Chemical Industry":"#abd9e9",
"Chemicals":"#74add1",
"Civil Aviation":"#4575b4",
"Coal Mining":"#313695",
"Coke":"#a50026",
"Commercial air conditioning":"#d73027",
"Commercial Institutional":"#f46d43",
"Commercial Refrigeration":"#fdae61",
"Construction":"#fee090",
"Consumption of Halocarbons and Sulphur Hexafluoride":"#ffffbf",
"Continuously Flooded":"#e0f3f8",
"Cotton":"#abd9e9",
"Cows greater than two":"#74add1",
"Cows less than one":"#4575b4",
"Cows one to two":"#313695",
"Crop Resuide":"#a50026",
"Crude Oil Production":"#d73027",
"Cultivation of Histosols":"#f46d43",
"Dairy Cattle":"#fdae61",
"Decommissioned Mines":"#fee090",
"Deer":"#ffffbf",
"Direct Soil Emissions":"#e0f3f8",
"Distribution":"#abd9e9",
"Domestic":"#74add1",
"Domestic Pleasure Crafts":"#4575b4",
"Domestic refrigeration":"#313695",
"Domestric stationary air conditioning":"#a50026",
"Donkeys":"#d73027",
"Early Dry Season":"#f46d43",
"Energy":"#fdae61",
"Energy Industries":"#fee090",
"Enteric Fermentation":"#ffffbf",
"Eucalypt Open forest":"#e0f3f8",
"Eucalypt Woodland":"#abd9e9",
"Exploration":"#74add1",
"Export":"#4575b4",
"Faeces":"#313695",
"Feedlot Cattle":"#a50026",
"Fertiliser":"#d73027",
"Field burning of agricultural residues":"#f46d43",
"Field Burning of Agricultural Resiudes":"#fdae61",
"Fire Extinguishers":"#fee090",
"Flared":"#ffffbf",
"Flaring":"#e0f3f8",
"Foam Blowing":"#abd9e9",
"Food and Drink":"#74add1",
"Food Processing, Beverages and Tobacco":"#4575b4",
"Fuel Combustions":"#313695",
"Fugitive Emissions From Fuels":"#a50026",
"Gas":"#d73027",
"Gas Production and Distribution":"#f46d43",
"Gilts":"#fdae61",
"Glass and Glass Product Manufacturing":"#fee090",
"Goats":"#ffffbf",
"Heavy Duty Trucks":"#e0f3f8",
"Heavy vehicles":"#abd9e9",
"Heavy-Duty Trucks and Buses":"#74add1",
"Heifers greater than one year":"#4575b4",
"Heifers less than one year":"#313695",
"Horses":"#a50026",
"Horticulture and vegetables":"#d73027",
"Indirect":"#f46d43",
"Industrial Processes":"#fdae61",
"Industrial refrigeration including food processing":"#fee090",
"Iron and Steel":"#ffffbf",
"Iron and Steel Production":"#e0f3f8",
"Irrigated":"#abd9e9",
"Irrigated crop":"#74add1",
"Irrigated pasture":"#4575b4",
"Japan Ox":"#313695",
"Lambs and Hoggets":"#a50026",
"Land":"#d73027",
"Late Dry Season":"#f46d43",
"Lawn movers":"#fdae61",
"Layers":"#fee090",
"Legume Pastures":"#ffffbf",
"Light Commercial Vehicles":"#e0f3f8",
"Light vehicles":"#abd9e9",
"Lime Production":"#74add1",
"Limestone and Solomite Use":"#4575b4",
"Llamas":"#313695",
"Lubricants and Grease":"#a50026",
"Machinery and Equipment":"#d73027",
"Maiden Ewes":"#f46d43",
"Maize":"#fdae61",
"Manufacture of Solid Fuels":"#fee090",
"Manufacturing Industries and Construction":"#ffffbf",
"Manufature of Solid Fuels and Other Energy Industries":"#e0f3f8",
"Manure":"#abd9e9",
"Manure Management":"#74add1",
"Meat":"#4575b4",
"Medium and large commercial refrigeration":"#a50026",
"Medium Duty Trucks":"#d73027",
"Melaluca Woodland":"#f46d43",
"Metal Production":"#fdae61",
"Metered dose inhalers":"#fee090",
"Military":"#ffffbf",
"Milking Cows":"#e0f3f8",
"Mineral Products":"#abd9e9",
"Mining (non-energy)":"#74add1",
"Mining Activities":"#4575b4",
"Mobile air conditioning":"#313695",
};

// Total size of all segments; we set this later, after loading the data.
var totalSize = 0;

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .append("svg:g")
    .attr("id", "container")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var partition = d3.layout.partition()
    .size([2 * Math.PI, radius * radius])
    .value(function(d) { return d.size; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return d.x; })
    .endAngle(function(d) { return d.x + d.dx; })
    .innerRadius(function(d) { return Math.sqrt(d.y); })
    .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

// Use d3.text and d3.csv.parseRows so that we do not need to have a header
// row, and can receive the csv as an array of arrays.
d3.text("realData.csv", function(text) {
  var csv = d3.csv.parseRows(text);
  var json = buildHierarchy(csv);
  createVisualization(json);
});

// Main function to draw and set up the visualization, once we have the data.
function createVisualization(json) {

  // Basic setup of page elements.
  initializeBreadcrumbTrail();
  drawLegend();
  d3.select("#togglelegend").on("click", toggleLegend);

  // Bounding circle underneath the sunburst, to make it easier to detect
  // when the mouse leaves the parent g.
  vis.append("svg:circle")
      .attr("r", radius)
      .style("opacity", 0);

  // For efficiency, filter nodes to keep only those large enough to see.
  var nodes = partition.nodes(json)
      .filter(function(d) {
      return (d.dx > 0.005); // 0.005 radians = 0.29 degrees
      });

  var path = vis.data([json]).selectAll("path")
      .data(nodes)
      .enter().append("svg:path")
      .attr("display", function(d) { return d.depth ? null : "none"; })
      .attr("d", arc)
      .attr("fill-rule", "evenodd")
      .style("fill", function(d) { return colors[d.name]; })
      .style("opacity", 1)
      .on("mouseover", mouseover);

  // Add the mouseleave handler to the bounding circle.
  d3.select("#container").on("mouseleave", mouseleave);

  // Get total size of the tree = value of root node from partition.
  totalSize = path.node().__data__.value;
 };

// Fade all but the current sequence, and show it in the breadcrumb trail.
function mouseover(d) {

  var percentage = (100 * d.value / totalSize).toPrecision(3);
  var percentageString = percentage + "%";
  if (percentage < 0.1) {
    percentageString = "< 0.1%";
  }
// d.name
  d3.select("#name").text(d.name)

  d3.select("#percentage")
      .text(percentageString);

  d3.select("#explanation")
      .style("visibility", "");

  var sequenceArray = getAncestors(d);
  updateBreadcrumbs(sequenceArray, percentageString);

  // Fade all the segments.
  d3.selectAll("path")
      .style("opacity", 0.3);

  // Then highlight only those that are an ancestor of the current segment.
  vis.selectAll("path")
      .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
              })
      .style("opacity", 1);
}

// Restore everything to full opacity when moving off the visualization.
function mouseleave(d) {

  // Hide the breadcrumb trail
  d3.select("#trail")
      .style("visibility", "hidden");

  // Deactivate all segments during transition.
  d3.selectAll("path").on("mouseover", null);

  // Transition each segment to full opacity and then reactivate it.
  d3.selectAll("path")
      .transition()
      .duration(1000)
      .style("opacity", 1)
      .each("end", function() {
              d3.select(this).on("mouseover", mouseover);
            });

  d3.select("#explanation")
      .style("visibility", "hidden");
}

// Given a node in a partition layout, return an array of all of its ancestor
// nodes, highest first, but excluding the root.
function getAncestors(node) {
  var path = [];
  var current = node;
  while (current.parent) {
    path.unshift(current);
    current = current.parent;
  }
  return path;
}

function initializeBreadcrumbTrail() {
  // Add the svg area.
  var trail = d3.select("#sequence").append("svg:svg")
      .attr("width", width)
      .attr("height", 50)
      .attr("id", "trail");
  // Add the label at the end, for the percentage.
  trail.append("svg:text")
    .attr("id", "endlabel")
    .style("fill", "#000");
}

// Generate a string that describes the points of a breadcrumb polygon.
function breadcrumbPoints(d, i) {
  var points = [];
  points.push("0,0");
  points.push(b.w + ",0");
  points.push(b.w + b.t + "," + (b.h / 2));
  points.push(b.w + "," + b.h);
  points.push("0," + b.h);
  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
    points.push(b.t + "," + (b.h / 2));
  }
  return points.join(" ");
}

// Update the breadcrumb trail to show the current sequence and percentage.
function updateBreadcrumbs(nodeArray, percentageString) {

  // Data join; key function combines name and depth (= position in sequence).
  var g = d3.select("#trail")
      .selectAll("g")
      .data(nodeArray, function(d) { return d.name + d.depth; });

  // Add breadcrumb and label for entering nodes.
  var entering = g.enter().append("svg:g");

  entering.append("svg:polygon")
      .attr("points", breadcrumbPoints)
      .style("fill", function(d) { return colors[d.name]; });

  entering.append("svg:text")
      .attr("x", (b.w + b.t) / 2)
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.name; });

  // Set position for entering and updating nodes.
  g.attr("transform", function(d, i) {
    return "translate(" + i * (b.w + b.s) + ", 0)";
  });

  // Remove exiting nodes.
  g.exit().remove();

  // Now move and update the percentage at the end.
  d3.select("#trail").select("#endlabel")
      .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
      .attr("y", b.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(percentageString);

  // Make the breadcrumb trail visible, if it's hidden.
  d3.select("#trail")
      .style("visibility", "");

}

function drawLegend() {

  // Dimensions of legend item: width, height, spacing, radius of rounded rect.
  var li = {
    w: 75, h: 30, s: 3, r: 3
  };

  var legend = d3.select("#legend").append("svg:svg")
      .attr("width", li.w)
      .attr("height", d3.keys(colors).length * (li.h + li.s));

  var g = legend.selectAll("g")
      .data(d3.entries(colors))
      .enter().append("svg:g")
      .attr("transform", function(d, i) {
              return "translate(0," + i * (li.h + li.s) + ")";
           });

  g.append("svg:rect")
      .attr("rx", li.r)
      .attr("ry", li.r)
      .attr("width", li.w)
      .attr("height", li.h)
      .style("fill", function(d) { return d.value; });

  g.append("svg:text")
      .attr("x", li.w / 2)
      .attr("y", li.h / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "middle")
      .text(function(d) { return d.key; });
}

function toggleLegend() {
  var legend = d3.select("#legend");
  if (legend.style("visibility") == "hidden") {
    legend.style("visibility", "");
  } else {
    legend.style("visibility", "hidden");
  }
}

// Take a 2-column CSV and transform it into a hierarchical structure suitable
// for a partition layout. The first column is a sequence of step names, from
// root to leaf, separated by hyphens. The second column is a count of how
// often that sequence occurred.
function buildHierarchy(csv) {
  var root = {"name": "root", "children": []};
  for (var i = 0; i < csv.length; i++) {
    var sequence = csv[i][0];
    var size = +csv[i][1];
    if (isNaN(size)) { // e.g. if this is a header row
      continue;
    }
    var parts = sequence.split("-");
    var currentNode = root;
    for (var j = 0; j < parts.length; j++) {
      var children = currentNode["children"];
      var nodeName = parts[j];
      var childNode;
      if (j + 1 < parts.length) {
   // Not yet at the end of the sequence; move down the tree.
 	var foundChild = false;
 	for (var k = 0; k < children.length; k++) {
 	  if (children[k]["name"] == nodeName) {
 	    childNode = children[k];
 	    foundChild = true;
 	    break;
 	  }
 	}
  // If we don't already have a child node for this branch, create it.
 	if (!foundChild) {
 	  childNode = {"name": nodeName, "children": []};
 	  children.push(childNode);
 	}
 	currentNode = childNode;
      } else {
 	// Reached the end of the sequence; create a leaf node.
 	childNode = {"name": nodeName, "size": size};
 	children.push(childNode);
      }
    }
  }
  return root;
};

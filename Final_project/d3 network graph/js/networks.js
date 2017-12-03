var svg = d3.select("svg").attr("style", "outline: thin solid grey;"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory10); // https://github.com/d3/d3-scale#schemeCategory20

var simulation = d3.forceSimulation() // simulation of physics
    .force("link", d3.forceLink().distance(80).strength(.5)) // create spring link relationship between nodes with distance set between nodes 
    .force("charge", d3.forceManyBody()) // affects every node, not just link being processed
    .force("center", d3.forceCenter(width / 2, height / 2)); // "center" of the force

var graph = 
{
  "nodes": [
	{"id": "Mobile Gambling", "group": 5},
    {"id": "Tablet", "group": 5},
    {"id": "Computer", "group": 5},
    {"id": "Smartphone", "group": 5},
	
	{"id": "Online Poker", "group": 4},
    {"id": "Texas hold 'em", "group": 4},
    {"id": "Omaha", "group": 4},
    {"id": "Seven-card stud", "group": 4},
    {"id": "Razz", "group": 4},
    {"id": "HORSE", "group": 4},

    {"id": "Online Casino", "group": 3},
    {"id": "Black Jack", "group": 3},
    {"id": "Roulette", "group": 3},
    {"id": "Pachinko", "group": 3}, // not linked
    {"id": "Baccarat", "group": 3},

    {"id": "Sports Betting", "group": 2},
    {"id": "Soccer", "group": 2},
    {"id": "Cricket", "group": 2},
    {"id": "Basketball", "group": 2},
    {"id": "Baseball", "group": 2},
    {"id": "American Football", "group": 2},  // not linked

    {"id": "Online Gambling", "group": 1},
   
  ],
  "links": [
    {"source": "Online Poker", "target": "Online Gambling"},
	{"source": "Online Poker", "target": "Texas hold 'em"},
	{"source": "Online Poker", "target": "Seven-card stud"},
	{"source": "Online Poker", "target": "Omaha"},
	{"source": "Online Poker", "target": "Razz"},
	{"source": "Online Poker", "target": "HORSE"},

	{"source": "Mobile Gambling", "target": "Online Gambling"},
	{"source": "Mobile Gambling", "target": "Tablet"},
	{"source": "Mobile Gambling", "target": "Computer"},
	{"source": "Mobile Gambling", "target": "Smartphone"},
	
	
    {"source": "Online Casino", "target": "Online Gambling"},
	{"source": "Black Jack", "target": "Online Casino"},
    {"source": "Roulette", "target": "Online Casino"},
	{"source": "Pachinko", "target": "Online Casino"},
	{"source": "Baccarat", "target": "Online Casino"},
	
	{"source": "Sports Betting", "target": "Online Gambling"},
	{"source": "Soccer", "target": "Sports Betting"},
	{"source": "Cricket", "target": "Sports Betting"},
	{"source": "Basketball", "target": "Sports Betting"},
	{"source": "Baseball", "target": "Sports Betting"},
	{"source": "American Football", "target": "Sports Betting"},
  ]
};

//-----------------
// Need to reformat the data for use with d3 network commands
var nodes = graph.nodes,
    nodeById = d3.map(nodes, function (d) { return d.id; }), // create data set where node referenced by name
    links = graph.links,
    bilinks = [];  // create distinct data sets

links.forEach(function (link) {
    var s = link.source = nodeById.get(link.source),
        t = link.target = nodeById.get(link.target),
        i = {}; // intermediate node
    nodes.push(i);
    links.push({source: s, target: i}, {source: i, target: t});
    bilinks.push([s, i, t]);
});
//---------------------

var link = svg.selectAll(".link")
    .data(bilinks)
    .enter().append("path")
    .attr("stroke", function (d) { return color(d.s); })
    .attr("class", "link");

var node = svg.selectAll(".node")
//    .data(nodes)
    .data(nodes.filter(function (d) { return d.id; })) // render the node of each pair once
    .enter().append("g")
    .call(d3.drag() // for interaction
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

node.append("circle")
      .attr("r", function (d) { if (d.id == "Mobile Gambling" | d.id == "Online Poker" | d.id == "Online Casino" | d.id == "Sports Betting" | d.id == "Online Gambling") {return 10} else {return 5} })
      .attr("class", function (d) { if (d.id == "Mobile Gambling" | d.id == "Online Poker" | d.id == "Online Casino" | d.id == "Sports Betting" | d.id == "Online Gambling") {return "centralNode"} else {return "node"} })
      .attr("fill", function (d) {if (d.group == 1) {return "black"} else {return color(d.group)} })
      .on("dblclick", dblclick);

node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .attr("class", function (d) { if (d.id == "PwC" | d.id == "Accenture" | d.id == "Deloitte") {return "centralNodeText"} else {return "nodeText"} })
      .text(function (d) { return d.id; });
    
simulation
      .nodes(nodes)
      .on("tick", ticked); // "tick" is the scheduled incremental event that captures changes as the simulation runs

simulation.force("link")
      .links(links);

svg.append("text")
        .attr("x", 10)
        .attr("y", 30)
        .attr("class", "graphTitle")
        .text("");

svg.append("text")
        .attr("x", width - 180)
        .attr("y", height - 10)
        .attr("class", "footnote")
        .text("data gathered from major betting sites");

//--------------- functions
function ticked() {  // redraw "move" node and link
    link.attr("d", positionLink);
    node.attr("transform", positionNode);
}  

function positionLink(d) {
  return "M" + d[0].x + "," + d[0].y
       + "S" + d[1].x + "," + d[1].y
       + " " + d[2].x + "," + d[2].y;
}

function positionNode(d) {
  return "translate(" + d.x + "," + d.y + ")";
} 

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart(); // restart begins the tick events
  d.fx = d.x, d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x, d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null, d.fy = null;
}

function dblclick(d) {
  alert(d.id);
}

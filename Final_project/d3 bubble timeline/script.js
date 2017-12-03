$(document).ready(function()	{
	
	var margin = {
		top : 20,
		right : 20,
		bottom : 30,
		left : 40
	}, width = 725 - margin.left - margin.right, height = 600 - margin.top - margin.bottom;

	var x = d3.scale.linear()
		.range([0, width]);
	
	var y = d3.scale.linear()
		.range([height, 0]);

	var formatCurrency = d3.format(",");

	var div = d3.select("body")
		.append("div")
			.attr("id", "schoolinfo")
			.style("opacity", 0);

	//var color = d3.scale.category10();
	var color = d3.scale.ordinal()
		.domain([1, 2, 3])
		.range(["rgb(53,135,212)", "rgb(77, 175, 74)", "rgb(228, 26, 28)"]);

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var svg = d3.select("#chart")
		.append("svg")
			.attr("class", "chart")
			.attr("viewBox", "0 0 725 600")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
    
	d3.csv("data.csv", function(error, data) {

		x.domain([0, 5000]).nice();
		y.domain([0, 30000]).nice();

		//x axis
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.append("text")
				.attr("class", "label")
				.attr("x", width)
				.attr("y", -3)
				.style("text-anchor", "end")
				.text("Population in million");

		//y axis
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
				.attr("class", "label")
				.attr("transform", "rotate(-90)")
				.attr("y", -65)
				.attr("dy", ".71em")
				.style("text-anchor", "end")
				.text("Per Capita Income ($)")

		//legend y position
		var LYP = 100, 
			LXP = 770;
			
		svg.append("text").attr("class", "label").attr("x", LXP - 5).attr("y", LYP+20).text("Continant").style("font-weight", "bold");

		//color legend
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 50).attr("r", 12).style("fill", "#f4f142").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 55).style("text-anchor", "start").text(function(d) {
			return "Africa";
		});
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 80).attr("r", 12).style("fill", "#2E8B57").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 85).style("text-anchor", "start").text(function(d) {
			return "Asia";
		});
        svg.append("circle").attr("cx", LXP).attr("cy", LYP + 110).attr("r", 12).style("fill", "#40E0D0").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 115).style("text-anchor", "start").text(function(d) {
			return "Australia/Ocienia";
		});
        svg.append("circle").attr("cx", LXP).attr("cy", LYP + 140).attr("r", 12).style("fill", "#FFDEAD").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 145).style("text-anchor", "start").text(function(d) {
			return "Europe";
		});
        svg.append("circle").attr("cx", LXP).attr("cy", LYP + 170).attr("r", 12).style("fill", "#A52A2A").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 175).style("text-anchor", "start").text(function(d) {
			return "North America";
		});
        svg.append("circle").attr("cx", LXP).attr("cy", LYP + 200).attr("r", 12).style("fill", "#FF4500").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 15).attr("y", LYP + 205).style("text-anchor", "start").text(function(d) {
			return "South America";
		});
		
        
        
        svg.append("text").attr("class", "label").attr("x", LXP - 50).attr("y", LYP + 240).text("Online gambaling market in billion($)").style("font-weight", "bold");

        
		//size legend
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 30 + 240).attr("r", 20).style("fill", "#bbb").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 270).style("text-anchor", "start").text("25+");
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 60 + 240).attr("r", 15).style("fill", "#bbb").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 290).style("text-anchor", "start").text("18+");
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 80 + 240).attr("r", 9).style("fill", "#bbb").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 310).style("text-anchor", "start").text("9+");
		svg.append("circle").attr("cx", LXP).attr("cy", LYP + 93 + 240).attr("r", 4).style("fill", "#bbb").attr("stroke", "#000");
		svg.append("text").attr("class", "label").attr("x", LXP + 25).attr("y", LYP + 330).style("text-anchor", "start").text("2+");


		//circles
		svg.selectAll(".dot")
			.data(data)
			.enter()
			.append("circle")
				.attr("class", "dot")
				.attr("r", 
					function(d) {
						return  (d.GI2000*2+5);
					})//gave it a base 3.4 plus a proportional amount to the enrollment
				.attr("cx", 
					function(d) {
						return x(d.pop2000/1000000);
					})
				.attr("cy", 
					function(d) {
						return y(d.pp2000);
					})
                .on("mouseover", function(d) {
                    tooltip.transition()
                    .duration(200)
                        .style("opacity", .9);
                        tooltip.html("<h3>"+d["Continant"] + "</h3>")
                            .style("left", (d3.event.pageX + 5) + "px")
               .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    tooltip.transition()
                    .duration(500)
                .style("opacity", 0);
                })
				.style("fill", 
					function(d) {
                        switch (d.id) {
						case "1":
							return "#696969";
							break;
                        case "2":
							return "#f4f142";
							break;
                        case "3":
							return "#2E8B57";
							break;
                        case "4":
							return "#40E0D0";
							break;
                        case "5":
							return "#FFDEAD";
							break;
                        case "6":
							return "#A52A2A";
							break;
                        case "7":
							return "#FF4500";
							break;
                     
            
						/*if (d.id == 3) {
							return "rgb(228, 26, 28)";
						} else if (d.id == 2) {
							return "rgb(77, 175, 74)";
						} else if (d.id == 1) {
							return "rgb(53, 135, 212)";
						}else if (d.id == 4){
                                return "rgb(0, 135, 212)";
                            }else{
                                return "rgb(212, 212, 212)";
                            }*/
                                    }
                                    });
				
		var running = false;
		var timer;
		
		$("button").on("click", function() {
		
			var duration = 2000,
				maxstep = 2015,
				minstep = 2000;
			
			if (running == true) {
			
				$("button").html("Play");
				running = false;
				clearInterval(timer);
				
			} 
			/*
else if (running == true && $("#slider").val() == maxstep) {
				 running = true;
				 $("button").html("Play1");
				 
			
			} 
*/
			else if (running == false) {
			
				$("button").html("Pause");
				
				sliderValue = $("#slider").val();
				
				timer = setInterval( function(){
						if (sliderValue < maxstep){
							sliderValue++;
							$("#slider").val(sliderValue);
							$('#range').html(sliderValue);
						}
						$("#slider").val(sliderValue);
						update();
					
				}, duration);
				running = true;
				
				
			}

		});
      
	
		$("#slider").on("change", function(){
			update();
			$("#range").html($("#slider").val());
			clearInterval(timer);
			$("button").html("Play");
		});
	
		update = function() {
		
			d3.selectAll(".dot")
                
                .transition()
				.duration(1000)
        		.attr("class", "dot")
                .attr("r", function(d) {
					switch ($("#slider").val()) {
						case "2000":
							return (d.GI2000*2+5);
							break;
						case "2001":
							return (d.GI2001*2+5);
							break;
						case "2002":
							return (d.GI2002*2+5);
							break;
						case "2003":
							return (d.GI2003*2+5);
							break;
						case "2004":
							return (d.GI2004*2+5);
							break;
						case "2005":
							return (d.GI2005*2+5);
							break;
						case "2006":
							return (d.GI2006*2+5);
							break;
						case "2007":
							return (d.GI2007*2+5);
							break;
						case "2008":
							return (d.GI2008*2+5);
							break;
						case "2009":
							return (d.GI2009*2+5);
							break;
						case "2010":
							return (d.GI2010*2+5);
							break;
						case "2011":
							return (d.GI2011*2+5);
							break;
                        case "2012":
							return (d.GI2012*2+5);
							break;
                        case "2013":
							return (d.GI2013*2+5);
							break;
                        case "2014":
							return (d.GI2015*2+5);
							break;
                        case "2015":
							return (d.GI2015*2+5);
							break;

					}
				})
				.transition()
				.duration(1000)
				.attr("cx", function(d) {
			
					switch ($("#slider").val()) {
						case "2000":
							return x(d.pop2000/1000000);
							break;
						case "2001":
							return x(d.pop2001/1000000);
							break;
						case "2002":
							return x(d.pop2002/1000000);
							break;
						case "2003":
							return x(d.pop2003/1000000);
							break;
						case "2004":
							return x(d.pop2004/1000000);
							break;
						case "2005":
							return x(d.pop2005/1000000);
							break;
						case "2006":
							return x(d.pop2006/1000000);
							break;
						case "2007":
							return x(d.pop2007/1000000);
							break;
						case "2008":
							return x(d.pop2008/1000000);
							break;
						case "2009":
							return x(d.pop2009/1000000);
							break;
						case "2010":
							return x(d.pop2010/1000000);
							break;
						case "2011":
							return x(d.pop2011/1000000);
							break;
                        case "2012":
							return x(d.pop2012/1000000);
							break;
                        case "2013":
							return x(d.pop2013/1000000);
							break;
                        case "2014":
							return x(d.pop2014/1000000);
							break;
                        case "2015":
							return x(d.pop2015/1000000);
							break;
					}
				})
				.transition()
				.duration(1000)
				.attr("cy", function(d) {
					switch ($("#slider").val()) {
						case "2000":
							return y(d.pp2000);
							break;
						case "2001":
							return y(d.pp2001);
							break;
						case "2002":
							return y(d.pp2002);
							break;
						case "2003":
							return y(d.pp2003);
							break;
						case "2004":
							return y(d.pp2004);
							break;
						case "2005":
							return y(d.pp2005);
							break;
						case "2006":
							return y(d.pp2006);
							break;
						case "2007":
							return y(d.pp2007);
							break;
						case "2008":
							return y(d.pp2008);
							break;
						case "2009":
							return y(d.pp2009);
							break;
						case "2010":
							return y(d.pp2010);
							break;
						case "2011":
							return y(d.pp2011);
							break;
                        case "2012":
							return y(d.pp2012);
							break;
                        case "2013":
							return y(d.pp2013);
							break;
                        case "2014":
							return y(d.pp2014);
							break;
                        case "2015":
							return y(d.pp2015);
							break;

					}
				
            
                
                           
               
                });
              
    		};
		
	});

});

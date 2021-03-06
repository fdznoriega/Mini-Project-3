
// input: selector for a chart container e.g., ".chart"

// ====== THIS IS AN EXAMPLE FILE FROM LAB 6 ==========
export default function AreaChart(container) {

    // margin convention
    const margin = {top: 50, right: 50, bottom: 50, left: 50}
    const width = 650 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

    const svg = d3.select(".chart").append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // define scales
    const xScale = d3.scaleTime().range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]);

    // define axes
    const xAxis = d3.axisBottom();
    const yAxis = d3.axisLeft();

    const xAxisSVG = svg.append("g")
                        .attr("class", "axis x-axis")
                        .attr("transform", `translate(0, ${height})`)
    
    const yAxisSVG = svg.append("g")
                        .attr("class", "axis y-axis")
    
    // create a single path for the area and assign a class name to it
    const path = svg.append("path").attr("class", "path");
    const area = d3.area();

    // create a brush
    const listeners = { brushed: null };

    const brush = d3.brushX()
                    .extent([   [0,0] , [width, height]  ])
                    .on("brush", brushed)
                    .on("end", brushEnded)

    function brushed(event) {
        if (event.selection) {
            listeners["brushed"](event.selection.map(xScale.invert));
        }
    }

    function brushEnded(event) {
        
    }

    function on(event, listener) {
        listeners[event] = listener;
    }

    // ~ summon ~ brush
    svg.append("g").attr('class', 'brush').call(brush);
    
	function update(data){ 
        // update scales & axes
        xScale.domain(d3.extent(data.map(d => d.date)));   // x scale is time. assuming sorted...
        yScale.domain([0, d3.max(data.map(d => d.total))]); // y scale is from 0 to the highest total.
        
        xAxis.scale(xScale);
        yAxis.scale(yScale);

        // ~ summon ~ axes
        xAxisSVG.call(xAxis);
        yAxisSVG.call(yAxis);

        // calculate area
        area.x(d => xScale(d.date))
            .y0(height)
            .y1(d => yScale(d.total))

        // draw the area
        path.datum(data)
            .attr("d", area)

	}

	return {
		update, on // ES6 shorthand for "update": update
	};
}
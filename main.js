const svg = d3.select('svg');

const width = Number(svg.attr('width')), height = Number(svg.attr('height'));

const render = data =>{
    const xValue = d => d.population, yValue = d => d.country;
    const margin ={
        left: 100,
        right: 20,
        top: 100,
        bottom: 20
    };
    const innerWidth = width - (margin.left+margin.right);
    const innerHeight = height - (margin.top+margin.bottom);
    
    const xScale = d3.scaleLinear()
        .domain([0,d3.max(data, d => xValue(d))])
        .range([0, innerWidth]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => yValue(d)))
        .range([0,innerHeight])
        .padding(0.3);

    const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
        
    g.append('g').call(d3.axisBottom(xScale)).attr('transform', `translate(0,${innerHeight})`);    
    g.append('g').call(d3.axisLeft(yScale));    
    g.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth());
}

d3.csv('data.csv').then(data => {
    data.forEach(d =>{
        d.population = +d.population*1000;
    })
    render(data);
})
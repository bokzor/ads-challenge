import {Component, ElementRef, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';
import * as d3 from 'd3';
import {CSVRecord} from '../models/CSVRecord';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.css']
})
export class AreaChartComponent implements OnInit {
  hostElement;

  margin = {top: 50, right: 50, bottom: 50, left: 100};
  width = 900 - this.margin.left - this.margin.right;
  height = 500 - this.margin.top - this.margin.bottom;
  svg; // Top level SVG element
  g; // SVG Group element
  colorScale; // D3 color provider
  x; // X-axis graphical coordinates
  y; // Y-axis graphical coordinates
  colors = d3.scaleOrdinal(d3.schemeCategory10);
  formatTime = d3.timeFormat('%b %e');

  constructor(private elRef: ElementRef, private dataService: DataService) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnInit() {
    this.dataService.getData().subscribe((data) => {

      this.removeExistingChartFromParent();

      this.setChartDimensions();


      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.max1)])
        .range([this.height - this.margin.bottom, this.margin.top]);

      this.setColorScale();

      this.addGraphicsElement();

      this.createXAxis(data);

      this.createYAxis(data);

      this.addData(data);
    });
  }

  private addData(data: CSVRecord[]) {
// histogram
/*    this.svg.selectAll('temp1')
      .data(data)
      .enter()
      .append('line')
      .attr('x1', d => this.x(new Date(d.time)))
      .attr('y1', this.height - this.margin.bottom)
      .attr('x2', d => this.x(new Date(d.time)))
      .attr('y2', d => this.y(d.temp1))
      .attr('stroke', 'red')
      .attr('stroke-width', 1);*/


    this.svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(d => this.x(new Date((d as any).time)))
        .y(d => this.y((d as any).temp1))
      );

    this.svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(d => this.x(new Date((d as any).time)))
        .y(d => this.y((d as any).temp2))
      );

    this.svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(d => this.x(new Date((d as any).time)))
        .y(d => this.y((d as any).temp3))
      );

    this.svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(d => this.x(new Date((d as any).time)))
        .y(d => this.y((d as any).temp4))
      );

  }

  private createXAxis(data: CSVRecord[]) {
    const [startDate, endDate] = d3.extent(data, d => new Date(d.time));

    this.x = d3.scaleTime()
    // extend the domain with 1 day at each side
      .domain([d3.timeDay.offset(startDate, -1), d3.timeDay.offset(endDate, 1)])
      .range([this.margin.left, this.width - this.margin.right]);

    this.g.append('g')
      .attr('transform', `translate(0, ${this.height - this.margin.bottom})`)
      .attr('stroke-width', 1)
      .call(d3.axisBottom(this.x).ticks(12)
        .tickFormat(this.formatTime));
  }

  private createYAxis(data: CSVRecord[]) {
    this.y = d3.scaleLinear()
      .domain([10, 35])
      .range([this.height - this.margin.bottom, this.margin.top]);

    this.g.append('g')
      .attr('transform', `translate(${this.margin.left},0)`)
      .call(d3.axisLeft(this.y).ticks(10));
  }

  private addGraphicsElement() {
    this.g = this.svg.append('g')
      .attr('transform', 'translate(0,0)');
  }

  private setChartDimensions() {
    this.svg = d3.select(this.hostElement).append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 ' + this.width + ' ' + this.height);
  }

  private setColorScale() {
    this.colorScale = d3.scaleOrdinal(d3.schemeCategory10);
  }

  private removeExistingChartFromParent() {
    d3.select(this.hostElement).select('svg').remove();
  }


}

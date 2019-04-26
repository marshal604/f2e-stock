import {
  Component,
  OnInit,
  NgZone,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';

import * as d3 from 'd3';

export interface BarChartData {
  date: string;
  data: number;
}
@Component({
  selector: 'yur-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  chartData: BarChartData[];
  @Input()
  hideXAxisTick: boolean;
  @ViewChild('chartContainer')
  chartContainer: ElementRef<HTMLElement>;
  chartId = `chart-${new Date().getTime()}-${(Math.random() * 1000).toFixed()}`;
  xAxis: d3.ScaleBand<string>;
  xAxisGroup: d3.Selection<SVGGElement, {}, HTMLElement, any>;
  yAxis: d3.ScaleLinear<number, number>;
  yAxisGroup: d3.Selection<SVGGElement, {}, HTMLElement, any>;
  g: d3.Selection<SVGGElement, {}, HTMLElement, any>;
  gw: number;
  gh: number;
  constructor(private zone: NgZone) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      this.initChart();
      this.updateChart();
    });
  }

  ngOnDestroy() {}

  private initChart() {
    const w = this.chartContainer.nativeElement.clientWidth;
    const h = this.chartContainer.nativeElement.clientHeight;
    const svg = d3
      .select(`#${this.chartId}`)
      .append('svg')
      .attr('width', w)
      .attr('height', h);

    const margin = 20;
    this.gw = w - margin * 2;
    this.gh = h - margin * 2;
    this.g = svg
      .append('g')
      .attr('width', this.gw)
      .attr('height', this.gh)
      .attr('transform', `translate(${margin * 2}, ${margin})`);

    this.xAxis = d3
      .scaleBand()
      .range([0, this.gw])
      .paddingInner(0.8)
      .paddingOuter(0.2);
    this.xAxisGroup = this.g.append('g').attr('transform', `translate(0, ${this.gh})`);
    if (this.hideXAxisTick) {
      this.xAxisGroup = this.xAxisGroup.attr('name', 'hide-x-axis-tick');
    }

    this.yAxis = d3.scaleLinear().range([this.gh, 0]);
    this.yAxisGroup = this.g.append('g');
  }

  private updateChart() {
    this.xAxis.domain(this.chartData.reverse().map(d => d.date));

    const yAxisMax = d3.max(this.chartData.map(d => d.data));
    this.yAxis.domain([0, yAxisMax]);

    const rects = this.g.selectAll('rect').data(this.chartData) as d3.Selection<
      SVGRectElement,
      BarChartData,
      SVGGElement,
      {}
    >;

    rects.exit().remove();

    const t = d3.transition().duration(1500);

    rects
      .enter()
      .append('rect')
      .merge(rects)
      .attr('x', d => this.xAxis(d.date))
      .attr('y', d => this.gh)
      .attr('width', () => this.xAxis.bandwidth())
      .attr('fill', () => '#fd7e14')
      .transition(t)
      .attrTween('height', this.heightTween.bind(this))
      .attr('y', d => this.yAxis(d.data));

    const xAxis = d3.axisBottom(this.xAxis);
    this.xAxisGroup.call(xAxis);

    const yAxis = d3.axisLeft(this.yAxis);
    this.yAxisGroup.call(yAxis);
  }

  private heightTween(d: BarChartData) {
    const i = d3.interpolate(0, this.gh - this.yAxis(d.data));
    return (t: any) => i(t);
  }
}

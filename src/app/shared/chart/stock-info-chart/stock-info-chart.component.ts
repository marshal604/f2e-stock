import {
  Component,
  NgZone,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Input
} from '@angular/core';

import * as d3 from 'd3';
import {
  StockOverCountTradeCount,
  EverydayStockInfoItemInput
} from '@stock-over-count/stock-over-count.model';
import { StockInfoChartService } from './stock-info-chart.service';

@Component({
  selector: 'yur-stock-info-chart',
  templateUrl: './stock-info-chart.component.html',
  styleUrls: ['./stock-info-chart.component.scss'],
  providers: [StockInfoChartService]
})
export class StockInfoChartComponent implements AfterViewInit, OnDestroy {
  @Input() code: string;
  @ViewChild('chartContainer')
  chartContainer: ElementRef<HTMLElement>;
  chartId = `chart-${new Date().getTime()}`;

  private chartData: StockOverCountTradeCount[];
  private xAxis: d3.ScaleBand<string>;
  private xAxisGroup: d3.Selection<SVGGElement, {}, HTMLElement, any>;
  private yAxis: d3.ScaleLinear<number, number>;
  private yAxisGroup: d3.Selection<SVGGElement, {}, HTMLElement, any>;
  private g: d3.Selection<SVGGElement, {}, HTMLElement, any>;
  private g2: d3.Selection<SVGGElement, {}, HTMLElement, any>;
  private gw: number;
  private gh: number;
  private threshold: number;
  private thresholdGroup: d3.Selection<SVGGElement, {}, HTMLElement, any>;
  private thresholdLabelGroup: d3.Selection<SVGGElement, {}, HTMLElement, any>;
  private thresholdRectGroup: d3.Selection<SVGGElement, {}, HTMLElement, any>;

  constructor(private stockInfoChartService: StockInfoChartService, private zone: NgZone) {}

  ngAfterViewInit() {
    const tradeCountReq: EverydayStockInfoItemInput = {
      code: this.code,
      dayCount: 30
    };
    this.stockInfoChartService
      .getStockTradeCount(tradeCountReq)
      .toPromise()
      .then((data: StockOverCountTradeCount[]) => {
        this.chartData = data;
        this.zone.runOutsideAngular(() => {
          this.initChart();
          this.threshold = this.calcThresholdByTradeCount(this.chartData);
          this.updateChart();
        });
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
    this.g2 = svg
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

    this.yAxis = d3.scaleLinear().range([this.gh, 0]);
    this.yAxisGroup = this.g.append('g');

    this.thresholdGroup = this.g2.append('g');
    this.thresholdLabelGroup = this.thresholdGroup.append('g');
    this.thresholdRectGroup = this.thresholdGroup.append('g');
  }

  private updateChart() {
    this.xAxis.domain(this.chartData.map(d => d.date));

    const yAxisMax = d3.max(this.chartData, d => d.tradeCount);
    // this.yAxis.domain([0, Math.ceil(yAxisMax / 500) * 500]);
    this.yAxis.domain([0, yAxisMax]);

    const rects = this.g.selectAll('rect').data(this.chartData) as d3.Selection<
      SVGRectElement,
      StockOverCountTradeCount,
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
      .attr('y', d => this.yAxis(d.tradeCount));

    const xAxis = d3.axisBottom(this.xAxis);
    this.xAxisGroup.call(xAxis);

    const yAxis = d3.axisLeft(this.yAxis);
    this.yAxisGroup.call(yAxis);

    // draw threshold
    const thresholdLabelBgRect = this.thresholdLabelGroup
      .selectAll('rect')
      .data([{ threshold: this.threshold }]) as d3.Selection<
      SVGRectElement,
      { threshold: number },
      SVGGElement,
      {}
    >;

    thresholdLabelBgRect.exit().remove();
    thresholdLabelBgRect
      .enter()
      .append('rect')
      .merge(thresholdLabelBgRect)
      .attr('x', () => 8)
      .attr('y', d => this.yAxis(d.threshold) - 15)
      .attr('height', () => 12)
      .attr('width', () => 0)
      .attr('fill', '#333333')
      .transition()
      .delay(1000)
      .attr('width', d =>
        d.threshold.toString().length * 6 < 15 ? 15 : d.threshold.toString().length * 6
      );

    const thresholdLabel = this.thresholdLabelGroup
      .selectAll('text')
      .data([{ threshold: this.threshold }]) as d3.Selection<
      SVGTextElement,
      { threshold: number },
      SVGGElement,
      {}
    >;

    thresholdLabel.exit().remove();
    thresholdLabel
      .enter()
      .append('text')
      .merge(thresholdLabel)
      .attr('x', () => 10)
      .attr('y', d => this.yAxis(d.threshold) - 5)
      .attr('font-size', d => '0.625rem')
      .attr('fill', '#ffffff')
      .transition()
      .delay(1000)
      .text(d => d.threshold);

    const threshold = this.thresholdRectGroup
      .selectAll('rect')
      .data([{ threshold: this.threshold }]) as d3.Selection<
      SVGRectElement,
      { threshold: number },
      SVGGElement,
      {}
    >;
    threshold.exit().remove();
    threshold
      .enter()
      .append('rect')
      .merge(threshold)
      .attr('x', () => 0)
      .attr('y', d => this.yAxis(d.threshold))
      .attr('height', () => 2)
      .attr('width', () => 0)
      .attr('fill', () => '#17a2b8')
      .transition()
      .delay(1000)
      .duration(500)
      .attr('width', () => this.gw);
  }

  private heightTween(d: StockOverCountTradeCount) {
    const i = d3.interpolate(0, this.gh - this.yAxis(d.tradeCount));
    return t => i(t);
  }

  private calcThresholdByTradeCount(chartData: StockOverCountTradeCount[]) {
    const tempChartData = chartData.slice(0, -1);
    const threshold =
      tempChartData.reduce((pre, cur) => pre + cur.tradeCount, 0) / tempChartData.length;
    return Number(threshold.toFixed(2));
  }
}

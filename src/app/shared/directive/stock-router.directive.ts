import {
  Directive,
  ElementRef,
  Input,
  HostListener,
  Renderer2,
  AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[yurStockRouter]'
})
export class StockRouterDirective implements AfterViewInit {
  @Input() codeRouter: string;
  @HostListener('click') onClick() {
    this.router.navigate(['/detail', this.codeRouter]);
  }
  constructor(private el: ElementRef, private router: Router, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.renderer.addClass(this.el.nativeElement, 'underline-hover');
  }
}

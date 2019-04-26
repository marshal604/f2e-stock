import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { fromEvent, Subscription, timer } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'yur-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements AfterViewInit, OnDestroy {
  @Output()
  hidden = new EventEmitter();
  @ViewChild('dialog')
  dialog: ElementRef<HTMLElement>;
  subscription: Subscription;
  boundMargin: {
    left?: number;
    top?: number;
  } = {};
  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.checkBounding();
    this.subscription = this.clickAnyWhereEvent().subscribe(
      isDoCloseDialog => (isDoCloseDialog ? this.hidden.emit() : null)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clickAnyWhereEvent() {
    return timer(50).pipe(
      mergeMap(() => fromEvent(window, 'click')),
      map((event: MouseEvent) => ({ x: event.x, y: event.y })),
      map(pos => !this.isClickDialogContent(pos))
    );
  }

  isClickDialogContent(pos: { x: number; y: number }) {
    const bound = this.dialog.nativeElement.getBoundingClientRect();
    const isInnerLeftToRight = bound.left <= pos.x && pos.x <= bound.right;
    const isInnerTopToBottom = bound.top <= pos.y && pos.y <= bound.bottom;
    const isInner = isInnerLeftToRight && isInnerTopToBottom;
    return isInner;
  }

  checkBounding() {
    this.detectBoundRight();
    this.detectBoundLeft();
    this.detectBoundBottom();
    this.detectBoundTop();
    this.cd.detectChanges();
  }

  detectBoundRight() {
    const clientWidth = window.innerWidth;
    const bound = this.dialog.nativeElement.getBoundingClientRect();
    const boundMargin = 20;
    const isTouchRight = bound.right > clientWidth;
    if (isTouchRight) {
      this.boundMargin.left = clientWidth - bound.right - boundMargin;
    }
  }

  detectBoundLeft() {
    const bound = this.dialog.nativeElement.getBoundingClientRect();
    const boundMargin = 20;

    const isTouchLeft = 0 > bound.left;
    if (isTouchLeft) {
      this.boundMargin.left = -1 * bound.left + boundMargin;
    }
  }

  detectBoundTop() {
    const bound = this.dialog.nativeElement.getBoundingClientRect();
    const boundMargin = 20;

    const isTouchTop = 0 > bound.top;
    if (isTouchTop) {
      this.boundMargin.top = -1 * bound.top + boundMargin;
    }
  }

  detectBoundBottom() {
    const clientHeight = window.innerHeight;
    const bound = this.dialog.nativeElement.getBoundingClientRect();
    const boundMargin = 20;

    const isTouchBottom = bound.bottom > clientHeight;
    if (isTouchBottom) {
      this.boundMargin.top = clientHeight - bound.bottom - boundMargin;
    }
  }
}

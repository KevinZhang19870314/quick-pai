import { ViewChild, ElementRef, Component } from "@angular/core";

export type Point = [number, number];

@Component({
    template: ''
})
export abstract class XControl {
    @ViewChild('svg', { static: true }) svg: ElementRef<SVGElement>;

    protected lastSize: Point = [0, 0];
    protected seed = Math.floor(Math.random() * 2 ** 31);

    constructor(private ref: ElementRef<HTMLElement>) {

    }

    render(force = false) {
        if (this.svg) {
            const size = this.canvasSize();
            if ((!force) && (size[0] === this.lastSize[0]) && (size[1] === this.lastSize[1])) {
                return;
            }
            while (this.svg.nativeElement.hasChildNodes()) {
                this.svg.nativeElement.removeChild(this.svg.nativeElement.lastChild!);
            }
            this.svg.nativeElement.setAttribute('width', `${size[0]}`);
            this.svg.nativeElement.setAttribute('height', `${size[1]}`);
            this.draw(this.svg.nativeElement, size);
            this.lastSize = size;
            // this.classList.add('wired-rendered');
            this.ref.nativeElement.classList.add('control-rendered');
        }
    }

    protected abstract canvasSize(): Point;
    protected abstract draw(svg: SVGElement, size: Point): void;
}
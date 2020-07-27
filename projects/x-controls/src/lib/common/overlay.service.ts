import { Subject, Observable, Subscription, fromEvent } from "rxjs";
import { filter, map, take } from "rxjs/operators";
import { Injectable, TemplateRef, ViewContainerRef } from "@angular/core";
import { Overlay, OverlayContainer, PositionStrategy, OverlayConfig, ConnectionPositionPair, OverlayRef, OverlayPositionBuilder } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';

@Injectable({
    providedIn: 'root'
})
export class OverlayService {
    overlayRef: OverlayRef;
    sub: Subscription;
    private afterClosed = new Subject<any>();
    onClosed = this.afterClosed.asObservable();

    constructor(private overlay: Overlay,
        private overlayPositionBuilder: OverlayPositionBuilder,
        private overlayContainer: OverlayContainer) { }

    open(type: PopupType, origin: HTMLElement, tpl: TemplateRef<any>, viewContainerRef: ViewContainerRef, data: any) {
        this.close(null);
        this.overlayRef = this.overlay.create(this.getOverlayConfig({ origin: origin }, type));
        this.overlayRef.attach(new TemplatePortal(tpl, viewContainerRef, {
            $implicit: data, close: this.close
        }));

        this.sub = fromEvent<MouseEvent>(document, "click")
            .pipe(
                filter(event => {
                    const clickTarget = event.target as HTMLElement;
                    return (clickTarget != origin && (!!this.overlayRef && !this.overlayRef.overlayElement.contains(clickTarget)));
                }),
                take(1)
            )
            .subscribe(() => {
                this.close(null);
            });

        return this.onClosed.pipe(take(1));
    }

    openDropdown(origin: HTMLElement, tpl: TemplateRef<any>, viewContainerRef: ViewContainerRef, data: any) {
        return this.open(PopupType.DROPDOWN, origin, tpl, viewContainerRef, data);
    }

    close = (data: any) => {
        this.sub && this.sub.unsubscribe();
        if (this.overlayRef) {
            this.overlayRef.dispose();
            this.overlayRef = null;
            this.afterClosed.next(data)
        }
    }

    isAttached() {
        if (this.overlayRef) {
            return this.overlayRef.hasAttached();
        }

        return false;
    }

    private getOverlayPosition(origin: any): PositionStrategy {
        // const positionStrategy = this.overlay
        //     .position()
        //     .flexibleConnectedTo(origin)
        //     .withPositions(this.getDropdownPositions())
        //     .withPush(false);
        const positionStrategy = this.overlayPositionBuilder
            .flexibleConnectedTo(origin)
            .withPositions(this.getDropdownPositions());

        return positionStrategy;
    }

    private getOverlayConfig({ origin }, type: PopupType): OverlayConfig {
        return new OverlayConfig({
            hasBackdrop: false,
            positionStrategy: type === PopupType.DROPDOWN ? this.getOverlayPosition(origin) : this.getOverlayPosition(origin), // TODO
            scrollStrategy: this.overlay.scrollStrategies.noop()
        });
    }

    private getDropdownPositions(): ConnectionPositionPair[] {
        return [
            {
                originX: "start",
                originY: "bottom",
                overlayX: "start",
                overlayY: "top"
            },
            {
                originX: "start",
                originY: "top",
                overlayX: "start",
                overlayY: "bottom"
            }
        ];
    }
}

export enum PopupType {
    DROPDOWN = 0,
    MENU = 1
}
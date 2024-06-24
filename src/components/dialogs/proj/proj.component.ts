import { ChangeDetectorRef, Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var window: any

@Component({
    selector: 'proj',
    templateUrl: './proj.component.html',
})
export class ProjDialogComponent implements OnInit {
    @Input() receivedData: any | undefined;
    screenType: string = ''




    // ----------------------------
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
    ) { }

    ngOnInit(): void {
        this.checkScreenSize();

        this._changeDetectorRef.markForCheck()
        // console.log(this.receivedData);

    }

    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
        // Call your function to process screen size changes here
        this.checkScreenSize();
    }

    checkScreenSize() {
        const width = window.innerWidth;
        console.log(width);


        if (width >= 1536) {
            this.screenType = 'pc'
        } else if (width >= 600) {
            this.screenType = 'lt'
        } else {
            this.screenType = 'm'
        }
        console.log(this.screenType);

        this._changeDetectorRef.markForCheck()
    }

    open(filePath: string = '') {
        window.open(filePath, '_blank');
    }
}

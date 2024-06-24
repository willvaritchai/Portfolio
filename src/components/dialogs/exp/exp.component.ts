import { ChangeDetectorRef, Component, HostListener, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var window: any

@Component({
    selector: 'exp',
    templateUrl: './exp.component.html',
})
export class ExpDialogComponent implements OnInit {
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

    openFile(name: string = '') {
        let filePath;
        switch (name) {
            case 'scm':
                filePath = `https://drive.google.com/file/d/1dFePOc0SI5cvghrSFcRXqlK1-pX4wlWF/view?usp=sharing`;
                break;
        }
        window.open(filePath, '_blank');
    }
}

import { ChangeDetectorRef, Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var window: any

@Component({
    selector: 'dialogs',
    templateUrl: './dialogs.component.html',
    styleUrls: ['./dialogs.component.scss']

})
export class DialogComponent implements OnInit {
    screenType: string = ''

    // ----------------------------
    constructor(
        private dialogRef: MatDialogRef<DialogComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public receivedData: any,
    ) { }

    ngOnInit(): void {
        this.checkScreenSize();

        this._changeDetectorRef.markForCheck()
        console.log(this.receivedData);

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

    closeDialog(): void {
        this.dialogRef.close();
    }

}

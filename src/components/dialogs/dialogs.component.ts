import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var window: any

@Component({
    selector: 'dialogs',
    templateUrl: './dialogs.component.html',
    styleUrls: ['./dialogs.component.scss']

})
export class DialogComponent implements OnInit {
    detail: String = '';

    // admin-approval-driver
    approvalOptionList: any[] = [{ status: 'อนุมัติคำขอ', approval_status: 1 }, { status: 'ไม่อนุมัติคำขอ', approval_status: 2 }]
    approvalStatus: any = 'เลือกสถานะ'
    deniedDetail: any = null

    // ----------------------------
    constructor(
        private dialogRef: MatDialogRef<DialogComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public receivedData: any,
        // @Inject(MAT_DIALOG_DATA) public dialogData: any,
        // @Inject(MAT_DIALOG_DATA) public userId: any,
    ) { }

    ngOnInit(): void {
        this._changeDetectorRef.markForCheck()
        console.log(this.receivedData);

    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    confirm(): void {
        console.log('normal-confirm');

        let confirmStatus = true
        this.dialogRef.close(confirmStatus);
    }
   

    
}

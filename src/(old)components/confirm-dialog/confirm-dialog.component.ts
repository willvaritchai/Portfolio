import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
declare var window: any

@Component({
    selector: 'confirm.component',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']

})
export class ConfirmDialogComponent implements OnInit {
    detail: String = '';

    // admin-approval-driver
    approvalOptionList: any[] = [{ status: 'อนุมัติคำขอ', approval_status: 1 }, { status: 'ไม่อนุมัติคำขอ', approval_status: 2 }]
    approvalStatus: any = 'เลือกสถานะ'
    deniedDetail: any = null

    // ----------------------------
    constructor(
        private dialogRef: MatDialogRef<ConfirmDialogComponent>,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public receivedData: any,
        // @Inject(MAT_DIALOG_DATA) public dialogData: any,
        // @Inject(MAT_DIALOG_DATA) public userId: any,
    ) { }

    ngOnInit(): void {
        this._changeDetectorRef.markForCheck()
        console.log(this.receivedData);
        switch (this.receivedData) {
            case 'admin_approval':
                break;

            default:
                break;
        }
        // console.log(this.userId);
        // console.log(this.dialogData);
    }

    closeDialog(): void {
        let confirmStatus = false
        this.dialogRef.close(confirmStatus);
    }

    confirm(): void {
        console.log('normal-confirm');

        let confirmStatus = true
        this.dialogRef.close(confirmStatus);
    }
    send(): void {
        let confirmStatus = { confirm: true, detail: this.detail }
        this.dialogRef.close(confirmStatus);
    }

    // admin-approval
    onChangeAppOption() {
        console.log(this.approvalStatus);
        this.deniedDetail = null
    }
    adminConfirmApproval() {
        console.log('admin-confirm');
        let confirmStatus
        switch (this.approvalStatus) {
            case '1':
                confirmStatus = { confirm: true, approval_status: parseInt(this.approvalStatus), denied_detail: this.deniedDetail }
                this.dialogRef.close(confirmStatus);
                break;
            case '2':
                confirmStatus = { confirm: true, approval_status: parseInt(this.approvalStatus), denied_detail: this.deniedDetail }
                this.dialogRef.close(confirmStatus);
                break;
            default:
                window.alertFail('กรุณาเลือกสถานะคำขอ')
                this.dialogRef.close();
                break;
        }

    }
}

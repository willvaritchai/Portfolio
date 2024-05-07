import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environment-variables/environment';
import { urlService } from 'src/environment-variables/url.service';
declare var window: any;
@Injectable({
    providedIn: 'root',
})
export class FilesManagementService {
    fileData: string = ''

    storeCategory = { user: 'user', license: 'license', vehicle: 'vehicle' }

    constructor(private http: HttpClient,
    ) { }
    // private _pagination: BehaviorSubject<any | null> = new BehaviorSubject(null);

    //   private _facultyList: BehaviorSubject<any | null> = new BehaviorSubject(null);
    //   private _branchList: BehaviorSubject<any | null> = new BehaviorSubject(null);
    //   private _userData: BehaviorSubject<any | null> = new BehaviorSubject(null);

    // get pagination(): Observable<any> {
    //   return this._pagination.asObservable();
    // }

    // get facultyListData(): Observable<any[]> {
    //     return this._facultyList.asObservable();
    // }


    attachFile(data: any) {
        return this.http.post(
            `${environment.apiFiles}/attachflie`,
            data
        );
    }

    getSizeOfFile(linkDownload: string): Observable<any> {
        const options = {
            observe: 'response' as 'body', // To include the full response including headers
            responseType: 'blob' as 'json', // Expecting a blob response
        };
        console.log('linkdl:', linkDownload);

        return this.http.get(`${linkDownload}`, options)
    }

    deleteDriverProfile(data: any) {
        const options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            body: data, // Include data in the request body
        };
        return this.http.delete(`${environment.apiFiles}/deleteDriverProfile`, options)
    }

    // getSizeOfFile(linkDownload: string) {
    //     fetch(`${linkDownload}`, {
    //         method: 'GET',
    //     })
    //         .then(response => response.blob())
    //         .then(blob => {
    //             // Process the blob (file)
    //             const fileSizeInBytes = blob.size;
    //             const fileSizeInKB = fileSizeInBytes / 1024;
    //             console.log(`File size: ${fileSizeInKB} KB`);
    //         })
    //         .catch(error => console.error('Error:', error));
    // }

    // service: เมื่อมีการอัพไฟล์ 
    checkFile(event: any, isUser: boolean = false) {
        if (event.target.files && event.target.files.length) {
            if (this.checkImage(event.target.files[0].name) == false) {
                window.alertFail(
                    'สามารถอัปโหลดไฟล์ได้เฉพาะ (.jpg , .jpeg , .png)'
                );
                return false;
            }

            let sizeInBytes: number = event.target.files[0].size;
            if (!isUser) {
                const maxSizeInBytes: number = 10 * 1024 * 1024; // 10 MB
                if (sizeInBytes > maxSizeInBytes) {
                    window.alertFail('ขนาดของรูปใบขับขี่ หรือรูปยานพาหนะต้องไม่เกิน 10 MB')
                    return false
                    // this.inputCover.nativeElement.value = null;
                } else {
                    return true;

                }
            } else {
                const maxSizeInBytes: number = 5 * 1024 * 1024; // 5 MB
                if (sizeInBytes > maxSizeInBytes) {
                    window.alertFail('ขนาดของรูปโปรไฟล์ต้องไม่เกิน 5 MB')
                    return false
                    // this.inputCover.nativeElement.value = null;
                } else {
                    return true;

                }
            }

        }
        return true
    }

    checkImage(filename: any) {
        var ext = this.getExtension(filename);
        switch (ext.toLowerCase()) {
            case 'jpg':
            case 'jpeg':
            case 'png':
                //etc
                return true;
        }
        return false;
    }
    getExtension(filename: any) {
        var parts = filename.split('.');
        return parts[parts.length - 1];
    }

    // service-function เพื่อ return: formData สำหรับส่งไป api-attachFile
    onUploadAttachment(data: any[], params: { id: any, category: string, size: string }) {
        console.log('file-data: ', data);
        if (data.length > 0) {
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                let config = {
                    attachment_name: element.filename,
                    attachment_dir: 'contents/',
                };
                var configJson = JSON.stringify(config);
                let formData = new FormData();
                formData.append('id', params.id);
                formData.append('category', params.category);
                formData.append('size', params.size);
                formData.append('file', element.file);
                return formData;
            }
        }
        return false;
    }

    convertSizeToMb(size: any) {
        return ((size) / (1024 * 1024)).toFixed(1) //MB
    }

}

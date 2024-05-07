import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import Swal from 'sweetalert2';

declare var window: any;


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


window.alertSuccess = (text:any = null) => {
  return Swal.fire({
    title: 'สำเร็จ',
    text,
    icon: 'success',
  });
};

window.alertFail = (option: any = null) => {
  let a_option: any = { text: 'Fail' };
  if (typeof option === 'string') {
    a_option.text = option;
  } else {
    a_option = option;
  }
  return Swal.fire({
    title: 'เกิดข้อผิดพลาด',
    icon: 'error',
    ...a_option,
  });
};

window.alertClose = () => {
  Swal.close();
};

window.alertLoading = () => {
  return Swal.fire({
    title: 'Loading',
    allowOutsideClick: false,
    didOpen:()=>{
      Swal.showLoading()
    }
  })
};
// window.alertSuccess = (text = null) => {
//   return window.Swal.fire({
//       title: 'สำเร็จ',
//       text,
//       icon: 'success',
//   });
// };

// window.alertFail = (option: any = {}) => {
//   let a_option: any = { text: 'Fail' };
//   if (typeof option === 'string') {
//       a_option.text = option;
//   } else {
//       a_option = option;
//   }
//   return window.Swal.fire({
//       title: 'เกิดข้อผิดพลาด',
//       icon: 'error',
//       ...a_option,
//   });
// };

// // window.alertLoading = () => {
// //   return window.Swal.fire({
// //       allowOutsideClick: false,
// //       title: 'Loading...',
// //       onBeforeOpen: () => {
// //           window.Swal.showLoading();
// //       },
// //   });
// // };

// window.alertClearDataLoading = () => {
//   return window.Swal.fire({
//       allowOutsideClick: false,
//       title: 'กำลังล้างข้อมูล...',
//       onBeforeOpen: () => {
//           window.Swal.showLoading();
//       },
//   });
// };

// window.alertClose = () => {
//   window.Swal.close();
// };

// window.hideAlertLoading = () => {
//   window.Swal.hideLoading();

// };

// window.alertConformDelete = (option: any = {}) => {
//   return window.Swal.fire({
//       title: option.title,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#F00',
//       confirmButtonText: option.confirmButtonText,
//       cancelButtonText: option.cancelButtonText,
//       // ...option,
//   });
// };

// // window.alertProgress = (count = null, total = null, title = null, body = null) => {
// //   let timerInterval
// //   window.Swal.fire({
// //       title: title,
// //       html: 'Saving <b id="limiter">' + count + ' / ' + total + '</b> ' + body,
// //       timer: 6000,
// //       timerProgressBar: true,
// //       allowOutsideClick: false,
// //       showConfirmButton: false,
// //       showCancelButton: false,
// //       animation: false,
// //       willOpen: () => {
// //           window.Swal.showLoading()
// //           timerInterval = setInterval(() => {
// //               const content = window.Swal.getContent()
// //               if (content) {
// //                   const b = content.querySelector('limiter')
// //                   if (b) {
// //                       b.textContent = window.Swal.getTimerLeft()
// //                   }
// //               }
// //           }, 100)
// //       },
// //       willClose: () => {
// //           clearInterval(timerInterval)
// //       }
// //   })
// // }

// // window.alertProgress = (count = null, total = null, title = null, body = null) => {
// //   let timerInterval
// //   window.Swal.fire({
// //       title: title,
// //       html: 'Saving <b id="limiter">' + count + ' / ' + total + '</b> ' + body,
// //       timer: 6000,
// //       timerProgressBar: true,
// //       allowOutsideClick: false,
// //       showConfirmButton: false,
// //       showCancelButton: false,
// //       animation: false,
// //       willOpen: () => {
// //           window.Swal.showLoading()
// //           timerInterval = setInterval(() => {
// //               const content = window.Swal.getContent()
// //               if (content) {
// //                   const b = content.querySelector('limiter')
// //                   if (b) {
// //                       b.textContent = window.Swal.getTimerLeft()
// //                   }
// //               }
// //           }, 100)
// //       },
// //       willClose: () => {
// //           clearInterval(timerInterval)
// //       }
// //   })
// // }

// window.alertConfirm = (option: any = {}) => {
//   let a_option: any = { title: 'Confirm ?' };
//   if (typeof option === 'string') {
//       a_option.title = option;
//   } else {
//       a_option = option;
//   }
//   return window.Swal.fire({
//       title: option.title,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8cc43d',
//       confirmButtonText: option.confirmButtonText,
//       cancelButtonText: option.cancelButtonText,
//       // ...a_option,
//   });
// };

// window.alert = (option: any = {}) => {
//   return window.Swal.fire({
//       icon: 'warning',
//       title: option.title,
//       // text,
//       confirmButtonText: option.close,
//       confirmButtonColor: '#3b3f9a',
//       ...option,
//   });
// };

// window.alertConfirmCreateHost = (option: any = {}) => {
//   let a_option: any = { title: 'Confirm ?' };
//   if (typeof option === 'string') {
//       a_option.title = option;
//   } else {
//       a_option = option;
//   }
//   return window.Swal.fire({
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#8cc43d',
//       confirmButtonText: 'Create Host',
//       cancelButtonText: 'Cancel',
//       ...a_option,
//   });
// };

// window.alertConformDelete = (option = {}) => {
//   return window.Swal.fire({
//       title: 'Are you confirm ?',
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#F00',
//       confirmButtonText: 'Delete',
//       cancelButtonText: 'Cancel',
//       ...option,
//   });
// };

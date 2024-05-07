import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDateFormat'
})
export class CustomDateFormatPipe implements PipeTransform {
  transform(timestamp: string): string {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so add 1
    const year = date.getFullYear();

    const hours = date.getHours();
    const minutes = date.getMinutes();
    // const ampm = hours >= 12 ? 'PM' : 'AM';

    // Format the date and time components
    const formattedDate = `${day}/${month}/${year}`;
    const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;

    // Combine date and time with the desired format
    return `${formattedDate}, ${formattedTime} น.`;
  }
}

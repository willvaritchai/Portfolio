import { Directive, HostListener, Injectable, Pipe, PipeTransform } from '@angular/core';

@Directive({
  selector: '[noPaste]'
})
export class NoPasteService {
  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent): void {
    event.preventDefault();
  }
}

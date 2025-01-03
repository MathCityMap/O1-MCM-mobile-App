import {Directive, HostListener, ElementRef} from "@angular/core";

@Directive({
    selector: "textarea[autoresize]" // Attribute selector
})
export class Autoresize {


    @HostListener("input", ["$event.target"])
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }
    constructor(public element: ElementRef) {
    }
    ngOnInit(): void {
        this.adjust();
    }
    adjust(): void {
        let ta = this.element.nativeElement;
        if(ta){
            ta.style.overflow = "visible";
            ta.style.height = "auto";
            ta.style.height = (ta.scrollHeight - 20) + "px";
        }
    }


}
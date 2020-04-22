import { Component, OnInit, Input, Output, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
    @Input() public number;
    @Input() public suit;
    public fileString: string;
    @Output() cardEmitter: EventEmitter<any> = new EventEmitter();
  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
      console.log(this.number);
      if (this.number < 10) {
        this.fileString = this.suit + '0' + this.number;
      } if (this.number >= 10) {
        this.fileString = this.suit + this.number;
      }
  }

  ngOnChanges(changes: SimpleChanges): void {
      //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
      //Add '${implements OnChanges}' to the class.
      this.ngOnInit();
      this.changeDetector.detectChanges();

  }

}

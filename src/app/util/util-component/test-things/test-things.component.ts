import { Component, ViewChild, ViewChildren, QueryList, OnInit } from '@angular/core';
import { MdePopoverTrigger } from '@material-extended/mde';

@Component({
  selector: 'app-test-things',
  templateUrl: './test-things.component.html',
  styleUrls: ['./test-things.component.css']
})
export class TestThingsComponent implements OnInit {

  name = 'Angular 8';

  test: any;
  test2: any;

  @ViewChildren(MdePopoverTrigger) trigger: QueryList<MdePopoverTrigger>;


  ngOnInit() {
    this.test = 'test';
    this.test2 = this.test;

    this.test = 'testtttt';

    console.log(this.test2);
  }

  closePopover(id: number) {

    // Incorect because _results is private.
    /*
     this.trigger._results[id].togglePopover();
     */

    this.trigger.toArray()[id].togglePopover();

  }

  onSubmit(id: number) {

    // Form Logic

    // On Success close popover
    this.closePopover(id);

  }
}

import { Component, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { MdePopoverTrigger } from '@material-extended/mde';

@Component({
  selector: 'app-test-things',
  templateUrl: './test-things.component.html',
  styleUrls: ['./test-things.component.css']
})
export class TestThingsComponent {

  name = 'Angular 8';

  @ViewChildren(MdePopoverTrigger) trigger: QueryList<MdePopoverTrigger>;

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

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChecklistItem } from 'src/app/models/checklist-item';

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.component.html',
  styleUrls: ['./checklist.component.scss'],
})
export class ChecklistComponent  implements OnInit {

  @Input() public checklistItems: ChecklistItem[] = [];
  @Output() public checklistUpdated: EventEmitter<ChecklistItem[]> = new EventEmitter();
  public newTitle: string = '';

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.checklistItems);
  }

  public save() : void {
    this.checklistUpdated.emit(this.checklistItems);
    this.modalController.dismiss(null, 'confirm');
  }

  public addItem(): void {
    if (this.newTitle !== '') {
      this.checklistItems.push({ title: this.newTitle, checked: false });
    }
  }

  public removeItem(index: number) : void {
    this.checklistItems.splice(index, 1);
  }
}

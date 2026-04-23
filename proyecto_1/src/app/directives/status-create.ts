import { Directive, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Task } from '../models/task.interface';

@Directive({
  selector: '[appStatusCreate]',
  standalone: true
})
export class StatusCreate {
  @Input('appStatusCreate') form!: FormGroup;
  @Input() tasks: Task[] = [];
  @Output() taskCreated = new EventEmitter<Task>();

  @HostListener('click', ['$event'])
  onCreate(event: Event): void {
    event.preventDefault();
    
    if (this.form.valid) {
      const newTask: Task = {
        id: this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1,
        title: this.form.value.title,
        completed: false
      };
      
      this.taskCreated.emit(newTask);
      this.form.reset();
    }
  }
}

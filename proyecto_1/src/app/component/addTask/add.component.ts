import { Component, inject, OnInit } from "@angular/core";
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators, NgForm } from "@angular/forms";
import { NgClass, NgStyle } from "@angular/common";
import { Task } from "../../models/task.interface";
import { StatusTask } from "../../directives/status-task.directive";
import { StatusDelete } from "../../directives/status-delete.directive";
import { StatusCreate } from "../../directives/status-create";



@Component({

    selector: "app-add-task", 
    styleUrl: './add.component.scss',
    templateUrl: './add.component.html',
    imports: [ReactiveFormsModule, NgClass, NgStyle, StatusTask, StatusDelete, StatusCreate],
    standalone : true
    


})

export class AddComponent implements OnInit{ 

    numbTask!: number;
    titleTask = ""
    activeButton = true
    isActive = true
    tasks: Task[] = [
        {
        id: 1,
        title: "Tarea 1",
        completed: false},
            {
                id: 2,
                title: "Tarea 2",
                completed: false},
                {
                    id: 3,
                    title: "Tarea 3",
                    completed: false}
              
    ]

    fb = inject(FormBuilder);

    form! :FormGroup;


    ngOnInit(): void {
        this.form = this.fb.group({
            title: new FormControl("", [Validators.required, Validators.maxLength(8)])
        });
        this.updateTaskCount();
    }

    sendTitleTask(task: Task){
        this.tasks.push(task);
        this.updateTaskCount();
    }

    private updateTaskCount(){
        this.numbTask = this.tasks.length;
    }

    delete(id: number){
        this.tasks = this.tasks.filter((task)=> task.id !==id)
        this.updateTaskCount();
    }

    markTaskCompleted(task: Task, event: Event) {
        const input = event.target as HTMLInputElement;
        task.completed = input.checked;
    }

}
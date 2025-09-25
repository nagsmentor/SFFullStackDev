import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


export default class FirstStaticComponent extends LightningElement {
    name='';

    courses = [
        { id: 'c-1', name: 'Salesforce Fundamentals', level: 'Beginner', duration: 4 },
        { id: 'c-2', name: 'Apex Basics',            level: 'Beginner', duration: 6 },
        { id: 'c-3', name: 'Lightning Web Components', level: 'Intermediate', duration: 8 },
        { id: 'c-4', name: 'Integration (REST & Named Credentials)', level: 'Advanced', duration: 6 }
    ];

    get totalnumberofcourses(){
        return this.courses.length;
    }

    showAlert(){
        console.log("The button was clicked");
        alert("This alert is on a button click");
    }

    showToast(){
        console.log("The button was clicked");
        const event = new ShowToastEvent({
            title: 'Success',
            message: 'I am showing a toast',
            variant: 'info', //success, info, warning, error
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    handlenamechange(event){
        this.name = event.target.value
    }

    get hasname(){ //getter method
        return this.name && this.name.trim().length > 0;
    }

}
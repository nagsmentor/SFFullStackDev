import { LightningElement,track } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class LifecycleChildDemo extends LightningElement {
    @track showChild=true;
    @track count =0;
    @track errorMessage = '';

    constructor(){
        super();
        console.log('PwithC: Constructor');
    }

    renderedCallback(){
        console.log('PwithC: Rendered Callback');
    }

    connectedCallback(){
        console.log('PwithC: Connected Callback');
    }s

    disconnectedCallback(){
        console.log('PwithC: Disconnected from UI');
    }

    handleClick(){
        this.count++;
        console.log('PwithC: Button clicked, Count Incrementd, Re-Render was called');
    }

    toggleChild(){
        this.showChild = !this.showChild;
        console.log(this.showChild? 'Child has been added':'Child has been removed');
    }

    errorCallback(error, stack){
        console.log('Parent: Error Callback');
        console.error('Error from child', error);
        console.error('Stack Trace', stack);
        this.errorMessage = error.message;

        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error from Child',
                message: this.errorMessage,
                variant: 'error'
            })
        );

    }

}
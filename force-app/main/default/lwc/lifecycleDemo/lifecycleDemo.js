import { LightningElement, track } from 'lwc';

export default class LifecycleDemo extends LightningElement {
    @track count =0;

    constructor(){
        super();
        console.log('Parent: Constructor');
    }

    renderedCallback(){
        console.log('Parent: Rendered Callback');
    }

    connectedCallback(){
        console.log('Parent: Connected Callback');
    }s

    disconnectedCallback(){
        console.log('Parent: Disconnected from UI');
    }

    handleClick(){
        this.count++;
        console.log('Parent: Button clicked, Count Incrementd, Re-Render was called');
    }

}
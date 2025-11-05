import { LightningElement } from 'lwc';

export default class ChildLifecycleDemo extends LightningElement {
    constructor(){
        super();
        console.log('Child: Constructor');
    }

    renderedCallback(){
        console.log('Child: Rendered Callback');
        throw new Error('Error thrown from Rendered Callback Child');
    }

    connectedCallback(){
        console.log('Child: Connected Callback');
    }s

    disconnectedCallback(){
        console.log('Child: Disconnected from UI');
    }

    throwError(){
        console.log('Error has been thrown');
        throw new Error('Error thrown from Child');
    }
}
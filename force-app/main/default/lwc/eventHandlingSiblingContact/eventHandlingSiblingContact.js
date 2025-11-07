import { LightningElement, track, wire } from 'lwc';
import CONTACT_VIEW from '@salesforce/messageChannel/ContactView__c';
import { subscribe, MessageContext, APPLICATION_SCOPE} from 'lightning/messageService'; 

export default class EventHandlingSiblingContact extends LightningElement {
    @track contactId;
    subscription;

    @wire(MessageContext) messageContext;

    connectedCallback(){

        this.subscription = subscribe(
                                this.messageContext,
                                CONTACT_VIEW,
                                (message)=> {this.contactId = message.mccontactId},
                                {scope: APPLICATION_SCOPE}
                            );

        if(this.subscription){console.log("Contact Id is ", this.contactId);}
        else {console.log("Subscription Failed");}

    
    }

 /*   read(message){
        this.contactId = message.contactId;
    }*/



}
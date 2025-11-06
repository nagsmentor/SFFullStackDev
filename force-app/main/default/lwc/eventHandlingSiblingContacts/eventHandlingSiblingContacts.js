import { LightningElement, track, wire } from 'lwc';
import{subscribe, MessageContext, APPLICATION_SCOPE} from 'lightning/messageService';
import CONTACT_VIEW from '@salesforce/messageChannel/ContactView__c';

export default class EventHandlingSiblingContacts extends LightningElement {
    @track contactId;
    subscription;

    @wire(MessageContext) messageContext;

    connectedCallback(){
        this.subscription = subscribe(
            this.messageContext,
            CONTACT_VIEW,
            (message) => {
                this.contactId = message?.contactId;
            },
            {scope: APPLICATION_SCOPE}
        );
    }



    
}
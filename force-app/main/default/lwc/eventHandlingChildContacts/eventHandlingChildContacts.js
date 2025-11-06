import { LightningElement, wire, track, api } from 'lwc';
import getContactbyAccount from '@salesforce/apex/AccountController.getContactbyAccount';
import{publish, MessageContext, APPLICATION_SCOPE} from 'lightning/messageService';
import CONTACT_VIEW from '@salesforce/messageChannel/ContactView__c';


export default class EventHandlingChildContacts extends LightningElement {
    @api accountId;
    @track contacts = [];
    @track error; 

    fields = [
        {label:'First Name',fieldName:'FirstName',type:'text'},
        {label: 'Last Name', fieldName:'LastName', type:'text'},
        {
            type: 'action',
            typeAttributes:{rowActions:[{label: 'Select', name: 'view'}]}
        }
    ];

    @wire(MessageContext) messageContext;
    @wire(getContactbyAccount, {accid: '$accountId'})
    wiredContacts({data,error}){

        if(data){
            this.contacts = data;
            this.error = undefined;
        }
        else if(error){
            this.contacts = [];
            this.error = error?.body?.message || 'Error Loading Contacts';
            console.error(error);
        }


        
    }

    handleRowAction(event){
        const {name} = event.detail.action;
        const row = event.detail.row;

        if(name = 'view'){
            this.dispatchEvent(new CustomEvent('viewcontact',{
                detail:{email: row.Email}
            }));

            publish(this.messageContext,CONTACT_VIEW,{contactId: row.Id});
        }
    }

    get showEmpty(){
            return this.contacts.length == 0;
        }

}
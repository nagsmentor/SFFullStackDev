import { LightningElement, api, wire, track } from 'lwc';
import getContactbyAccount from '@salesforce/apex/AccountController.getContactbyAccount';
import CONTACT_VIEW from '@salesforce/messageChannel/ContactView__c';
import { publish, MessageContext} from 'lightning/messageService';  

export default class EventHandlingChildContacts extends LightningElement {

    @api accountId;
    @track contacts = [];
    @track error;
    @track showEmpty = false;

    fields = [
        {label: 'First Name', fieldName: 'FirstName', type:'text'},
        {label: 'Last Name', fieldName: 'LastName', type:'text'},
        {
            type:'action',
            typeAttributes:{rowActions:[{label:'Select', name:'view'},{label:'Delete', name:'delete'}]}
        }
    ];

    @wire(MessageContext) messageContext;

    @wire(getContactbyAccount, {accid : '$accountId'})
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

    handleRowAction(e){
        const {name} = e.detail.action;
        const row = e.detail.row;

        if(name='view')
        {
            this.dispatchEvent(new CustomEvent('viewcontact',
            {detail:{email:row.Email, conId:row.Id}
            }
            ));

            publish(this.messageContext, CONTACT_VIEW, {mccontactId: row.Id});

            console.log('published ' , row.Id);
        }
        else if(name = 'delete'){

        }

    }

    get showEmpty(){
        return this.contacts.length == 0;
    }
}
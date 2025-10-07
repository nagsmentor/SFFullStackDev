import { LightningElement,api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class FieldsRecordForm extends LightningElement {
    @api recordId;
    
        fields = ['Name','Phone','Website','Industry','AnnualRevenue','Active__c'];
        handleSuccess(event){
            const evt = new ShowToastEvent({ title: 'Success', message:'Record Saved Successfully ${event?.detail?.id}',variant:'success'});
            this.dispatchEvent(evt);
    
        }
    
        handleError(event){
            const message = event?.detail?.message || event?.detail?.output?.error?.[0]?.message || 'An error has occurred';
            //event.detail.message event.detail.output.error[0].message
            const evt = new ShowToastEvent({ title: 'Failed', message ,variant:'error'});
            this.dispatchEvent(evt);
        }
}
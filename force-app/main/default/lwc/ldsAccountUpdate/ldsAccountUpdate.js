import { LightningElement, api, wire } from 'lwc';
import { getRecord, getFieldValue} from 'lightning/uiRecordApi';
import { getObjectInfo, getPicklistValues} from 'lightning/uiObjectInfoApi';
import { updateRecord} from 'lightning/uiRecordApi';
import {getRecordNotifyChange} from 'lightning/uiRecordApi';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';


import {NavigationMixin} from 'lightning/navigation';
//Get the fields Names
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import ID_FIELD from '@salesforce/schema/Account.Id';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import ACTIVE_FIELD from '@salesforce/schema/Account.Active__c';
import AR_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import SITE_FIELD from '@salesforce/schema/Account.Site';

const FIELDS = [NAME_FIELD,ACTIVE_FIELD,AR_FIELD,SITE_FIELD];

export default class LdsAccountUpdate extends NavigationMixin(LightningElement) {

    @api recordId;
    name='';
    active='';
    ar='';
    site='';
    activeOptions = [];



    @wire(getRecord, {recordId: '$recordId', fields: FIELDS}) //SELECT [FIELDS] from Account where id = $recordId
    record({data, error}){
        if(data){
            this.name = getFieldValue(data,NAME_FIELD) || '';
            this.active = getFieldValue(data,ACTIVE_FIELD) || '';
            this.ar = getFieldValue(data,AR_FIELD) || '';
            this.site = getFieldValue(data,SITE_FIELD) || '';
        }
        else if(error){
            this.dispatchEvent(new ShowToastEvent({
            title:'Account Get Failed',
            message: 'Account Get Failed',
            variant: 'error'
        }));
        }   

    }

    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    objectInfo;

    @wire(getPicklistValues, {
        recordTypeId: '$objectInfo.data.defaultRecordTypeId',
        fieldApiName: ACTIVE_FIELD
    })
    wiredPicklist({ data, error }) {
        if (data) {
        this.activeOptions = data.values.map(v => ({ label: v.label, value: v.value }));
        } else if (error) {
        this.dispatchEvent(new ShowToastEvent({ title: 'Error Occurred', message: 'Error Occurred', variant: 'error' }));
        }
        else {
        this.dispatchEvent(new ShowToastEvent({ title: 'No Values Found', message: 'No Values Found', variant: 'error' }));
        }
    }
    
    onname = (e) => (this.name = e.target.value?.trim());
    onsite = (e) => (this.site = e.target.value?.trim());
    onactive = (e) => (this.active = e.detail.value?.trim());
    onar = (e) => (this.ar = e.target.value?.trim());
    
    async updaterec(){
        const fields = {};
        fields[ID_FIELD.fieldApiName] = this.recordId;
        fields[NAME_FIELD.fieldApiName] = this.name;
        fields[ACTIVE_FIELD.fieldApiName] = this.active;
        fields[AR_FIELD.fieldApiName] = this.ar;
        fields[SITE_FIELD.fieldApiName] = this.site;

       
        await updateRecord({fields});
        await getRecordNotifyChange([{recordId: this.recordId}]);

        this.dispatchEvent(new ShowToastEvent({
        title:'Account Updated',
        message: 'Account has been updated',
        variant: 'success'
        })
        )

        this.dispatchEvent(new CustomEvent('xyz'));

    }
}
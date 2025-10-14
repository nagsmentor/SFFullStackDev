import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getListUi } from 'lightning/uiListApi';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import LightningConfirm from 'lightning/confirm';


export default class LdsAccountListRUD extends NavigationMixin(LightningElement) {
  @track accounts;
  @track error;
  wiredListResult;

  // Columns + row actions
  fields = [
    { label: 'Name', fieldName: 'Name', type: 'text' },
    { label: 'Active', fieldName: 'Active__c', type: 'text' },
    { label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'number' },
    { label: 'Account Site', fieldName: 'Site', type: 'text' },
    {
      type: 'action',
      typeAttributes: {
        rowActions: [
          { label: 'View',  name: 'view'  },
          { label: 'Edit',  name: 'edit'  },
          { label: 'Delete', name: 'delete' }
        ]
      },
      fixedWidth: 120
    }
  ];

  @wire(getListUi, {
    objectApiName: ACCOUNT_OBJECT,
    listViewApiName: 'Active_Accounts' // ensure this is the DEV NAME of your list view
  })
  listViewHandler(result) {
    this.wiredListResult = result;
    const { data, error } = result;

    if (data) {
      this.error = undefined;
      this.accounts = data.records.records.map(rec => ({
        Id: rec.id, // normalized for datatable key-field
        Name: rec.fields.Name?.value,
        Active__c: rec.fields.Active__c?.value,
        AnnualRevenue: rec.fields.AnnualRevenue?.value,
        Site: rec.fields.Site?.value
      }));
    } else if (error) {
      this.accounts = undefined;
      this.error = error;
    }
  }

  get errorMessage() {
    return this.error?.body?.message || this.error?.message || 'Error loading list';
  }

  async handleRowAction(event) {
    const action = event.detail.action.name;
    const row = event.detail.row;

    switch (action) {
      case 'view':
        this.navigate(row.Id, 'view');
        break;
      case 'edit':
        this.navigate(row.Id, 'edit');
        break;
      case 'delete':
        await this.handleDelete(row.Id);
        break;
      default:
        break;
    }
  }

  navigate(recordId, actionName) {
    this[NavigationMixin.Navigate]({
      type: 'standard__recordPage',
      attributes: {
        recordId,
        objectApiName: 'Account',
        actionName // 'view' | 'edit'
      }
    });
  }

  async handleDelete(recordId) {
    const ok = await LightningConfirm.open({
      message: 'Are you sure you want to permanently delete this Account?',
      label: 'Delete Account?',
      theme: 'warning'
    });
    if (!ok) return;

    try {
      await deleteRecord(recordId);
      this.toast('Account deleted', 'The record was removed successfully.', 'success');
      await refreshApex(this.wiredListResult);
      // Optional optimistic update:
      // this.accounts = (this.accounts || []).filter(r => r.Id !== recordId);
    } catch (e) {
      const msg = e?.body?.output?.errors?.[0]?.message || e?.body?.message || 'Unknown error';
      this.toast('Delete failed', msg, 'error');
    }
  }

  toast(title, message, variant) {
    this.dispatchEvent(new ShowToastEvent({ title, message, variant }));
  }
}
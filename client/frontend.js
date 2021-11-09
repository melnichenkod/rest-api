import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js';

Vue.component('loader', {
  template: `
    <div style="display: flex; justify-content: center; align-items: center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `
})

new Vue({
  el: '#app',
  data(){
    return {
      loading: false,
      form: {
        name: '',
        value: ''
      },
      contacts: []
    }
  },
  computed: {
    canCreate(){
      return this.form.value.trim() && this.form.name.trim()
    }
  },
  methods: {
    createContact(){
      const {...contact} = this.form;
      //console.log(contact);
      this.contacts.push({...contact, id: Date.now(), marked: false})
      this.form.name = this.form.value = ''
    },
    markContact(id){
      const contact = this.contacts.find(item => item.id === id);
      contact.marked = true;
    },
    removeContact(id){
      this.contacts = this.contacts.filter(item => item.id !== id)
    }
  },
  async mounted(){
    this.loading = true;
    this.contacts = await request('/api/contacts');
    this.loading = false;
    //console.log(data);
  }
})

async function request(url, method = 'GET', date = null){
  try {
    const headers ={};
    let body;
    if (date) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(data)
    }
    const response = await fetch(url, {
      method,
      headers,
      body
    })
    return await response.json()
  } catch (e) {
    console.warn('Error', e.message)
  }
}
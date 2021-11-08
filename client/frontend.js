import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js';

new Vue({
  el: '#app',
  data(){
    return {
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
  }
})
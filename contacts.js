const fs = require('fs').promises;
const path = require('path');

const jsonContacts = 'db/contacts.json';
const contactsPath = path.join(__dirname, jsonContacts);

async function getContacts() {
  return await fs
    .readFile(contactsPath)
    .then(data => {
      return JSON.parse(data.toString());
    })
    .catch(err => err.message);
}

async function saveContacts(list) {
  return await fs
    .writeFile(contactsPath, list, 'utf8')
    .catch(err => err.message);
}

function getContactById(contactId) {
  return getContacts()
    .then(list => list.find(contact => contact.id === contactId.toString()))
    .catch(err => err.message);
}

function removeContact(contactId) {
  getContacts()
    .then(list => list.filter(contact => contact.id !== contactId.toString()))
    .then(filteredList => saveContacts(JSON.stringify(filteredList)))
    .catch(err => err.message);
}

function addContact(name, email, phone) {
  getContacts()
    .then(list => {
      const id = Number.parseInt(list[list.length - 1].id) + 1;
      return [...list, { id: id.toString(), name, email, phone }];
    })
    .then(updatedList => saveContacts(JSON.stringify(updatedList)))
    .catch(err => err.message);
}

module.exports = {
  getContacts,
  saveContacts,
  getContactById,
  removeContact,
  addContact,
};

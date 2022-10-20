const { nanoid } = require('nanoid');

const fs = require('fs').promises;
const path = require('path');

const jsonContacts = 'db/contacts.json';
const contactsPath = path.join(__dirname, jsonContacts);

async function getContacts() {
  try {
    const content = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(content); // string ---> object
  } catch (err) {
    console.log(err);
  }
}

async function saveContacts(list) {
  try {
    const content = await fs.writeFile(contactsPath, list, 'utf8');
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const list = await getContacts();
    return list.find(contact => contact.id === contactId.toString());
  } catch (err) {
    console.log(err);
  }
}

async function removeContact(contactId) {
  try {
    const list = await getContacts();
    const idx = list.findIndex(contact => contact.id === contactId.toString());
    if (idx === -1) {
      return {};
    }
    const result = list.splice(idx, 1);
    await saveContacts(JSON.stringify(list));
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const list = await getContacts();
    const id = nanoid();
    list.push({ id, name, email, phone });
    await saveContacts(JSON.stringify(list));
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getContacts,
  saveContacts,
  getContactById,
  removeContact,
  addContact,
};

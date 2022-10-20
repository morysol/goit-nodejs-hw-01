const { nanoid } = require('nanoid');

const fs = require('fs').promises;
const path = require('path');

const jsonContacts = 'db/contacts.json';
const contactsPath = path.join(__dirname, jsonContacts);

async function getContacts() {
  try {
    const content = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(content);
  } catch (err) {
    console.error(err);
  }
}

async function saveContacts(list) {
  try {
    const content = await fs.writeFile(contactsPath, list, 'utf8');
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const list = await getContacts();
    return list.find(contact => contact.id === contactId.toString()) || null;
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const list = await getContacts();
    const idx = list.findIndex(contact => contact.id === contactId.toString());
    if (idx === -1) {
      return null;
    }
    const result = list.splice(idx, 1);
    await saveContacts(JSON.stringify(list));
    return result;
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const list = await getContacts();
    const newContact = { id: nanoid(), name, email, phone };
    list.push(newContact);
    await saveContacts(JSON.stringify(list));
    return newContact;
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getContacts,
  saveContacts,
  getContactById,
  removeContact,
  addContact,
};

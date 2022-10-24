const { nanoid } = require('nanoid');

const fs = require('fs').promises;
const path = require('path');

const jsonContacts = 'db/contacts.json';
const contactsPath = path.join(__dirname, jsonContacts);

async function getContacts() {
  try {
    const content = await fs.readFile(contactsPath, 'utf8');
    const contacts = JSON.parse(content);
    return contacts;
  } catch (err) {
    return err;
  }
}

async function saveContacts(list) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(list), 'utf8');
  } catch (err) {
    return err;
  }
}

async function getContactById(contactId) {
  try {
    const id = contactId.toString();
    const list = await getContacts();
    const contact = list.find(contact => contact.id === id) || null;
    return contact || null;
  } catch (err) {
    return err;
  }
}

async function removeContact(contactId) {
  try {
    const id = contactId.toString();
    const list = await getContacts();
    const idx = list.findIndex(contact => contact.id === id);
    if (idx === -1) {
      return null;
    }
    const [result] = list.splice(idx, 1);
    await saveContacts(list);
    return result;
  } catch (err) {
    return err;
  }
}

async function addContact(name, email, phone) {
  try {
    const list = await getContacts();
    const newContact = { id: nanoid(), name, email, phone };
    list.push(newContact);
    await saveContacts(list);
    return newContact;
  } catch (err) {
    return err;
  }
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
};

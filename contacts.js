const { nanoid } = require('nanoid');

const fs = require('fs').promises;
const path = require('path');

const jsonContacts = 'db/contacts.json';
const contactsPath = path.join(__dirname, jsonContacts);

async function getContacts() {
  try {
    const content = await fs.readFile(contactsPath, 'utf8');
    contacts = JSON.parse(content);
    console.table(contacts);
    return contacts;
  } catch (err) {
    console.error(err);
  }
}

async function saveContacts(list) {
  try {
    const content = await fs.writeFile(
      contactsPath,
      JSON.stringify(list),
      'utf8'
    );
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  const id = contactId.toString();
  try {
    const list = await getContacts();
    const contact = list.find(contact => contact.id === id) || null;
    console.log(contact || 'nothing found');
    return contact || null;
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  const id = contactId.toString();
  try {
    const list = await getContacts();
    const idx = list.findIndex(contact => contact.id === id);
    if (idx === -1) {
      console.log('contact not found');

      return null;
    }
    const [result] = list.splice(idx, 1);
    await saveContacts(list);
    console.log(result);
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
    await saveContacts(list);
    console.log(newContact);
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

const fs = require("fs").promises;
const path = require("path");

const jsonPath = "db";
const jsonContacts = "contacts.json";

const joinedPath = path.join(
  path.dirname(process.argv[1]),
  jsonPath,
  jsonContacts
);

const contactsPath = path.normalize(joinedPath);

function getContacts() {
  return fs
    .readFile(contactsPath)
    .then((data) => {
      return JSON.parse(data.toString());
    })
    .then()
    .catch((err) => err.message);
}

function saveContacts(list) {
  //
  try {
    fs.writeFile(contactsPath, list, "utf8");
    console.log("Done");
  } catch (e) {
    console.log(e);
  }
}

// TODO: задокументировать каждую функцию
function listContacts(list) {
  // ...твой код
  console.table(list);
}

function getContactById(contactId, list) {
  // ...твой код
  return list.find((contact) => contact.id === contactId.toString());
}

function removeContact(contactId, list) {
  // ...твой код
  return list.filter((contact) => contact.id !== contactId.toString());
}

function addContact(name, email, phone, list) {
  // ...твой код
  const id = Number.parseInt(list[list.length - 1].id) + 1;
  return [...list, { id: id.toString(), name, email, phone }];
}

module.exports = {
  getContacts,
  saveContacts,
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

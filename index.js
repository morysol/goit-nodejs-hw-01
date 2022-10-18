// import { testImport } from "./contacts.js";
const { Command } = require("commander");
const contacts = require("./contacts");

const program = new Command();

// (async () => {
//   // …
//   //   console.log(await contacts.getContacts());
//   const allContacts = await contacts.getContacts();
//   //   console.log(allContacts);
//   contacts.listContacts(allContacts);
//   console.log(contacts.getContactById(5, allContacts));
//   console.table(contacts.removeContact(3, allContacts));

//   const email = "mango@gmail.com";
//   const phone = "322-22-22";
//   const name = "Mango";

//   console.table(contacts.addContact(name, email, phone, allContacts));
// })();

// # Получаем и выводим весь список контактов в виде таблицы (console.table)
// node index.js --action list

// # Получаем контакт по id
// node index.js --action get --id 5

// # Добавялем контакт
// node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22

// # Удаляем контакт
// node index.js --action remove --id=3

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      // ...
      contacts.listContacts(await contacts.getContacts());
      break;

    case "get":
      // ... id
      console.log(contacts.getContactById(id, await contacts.getContacts()));

      break;

    case "add":
      // ... name email phone
      //   console.table(
      //     contacts.addContact(name, email, phone, await contacts.getContacts())
      //   );
      const listAdd = contacts.addContact(
        name,
        email,
        phone,
        await contacts.getContacts()
      );
      await contacts.saveContacts(JSON.stringify(listAdd));

      break;

    case "remove":
      // ... id
      //   console.table(contacts.removeContact(id, await contacts.getContacts()));
      const listRemove = contacts.removeContact(
        id,
        await contacts.getContacts()
      );
      //   console.table(JSON.stringify(list));
      await contacts.saveContacts(JSON.stringify(listRemove));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

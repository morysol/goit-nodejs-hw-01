const { Command } = require("commander");
const contacts = require("./contacts");

const program = new Command();

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
      console.log(contacts.getContactById(id, await contacts.getContacts()));

      break;

    case "add":
      const listAdd = contacts.addContact(
        name,
        email,
        phone,
        await contacts.getContacts()
      );
      await contacts.saveContacts(JSON.stringify(listAdd));

      break;

    case "remove":
      const listRemove = contacts.removeContact(
        id,
        await contacts.getContacts()
      );

      await contacts.saveContacts(JSON.stringify(listRemove));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

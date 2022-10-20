const { Command } = require('commander');
const contacts = require('./contacts');

const program = new Command();

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.table(await contacts.getContacts());
      break;

    case 'get':
      console.log((await contacts.getContactById(id)) || 'nothing found');

      break;

    case 'add':
      await contacts.addContact(name, email, phone);

      break;

    case 'remove':
      console.log(await contacts.removeContact(id));
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

invokeAction(argv);

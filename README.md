# Project Title

Node.js home work 01

## Authors

- [@morysol](https://www.github.com/morysol)

## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)

https://www.youtube.com/watch?v=spIBYOw58YI

## FAQ

#### Where?

Here! https://www.youtube.com/watch?v=spIBYOw58YI

### Run

# Получаем и выводим весь список контактов в виде таблицы (console.table)

node index.js --action list

# Получаем контакт по id

node index.js --action get --id 5 && node index.js --action list
node index.js --action get --id 2 && node index.js --action list
node index.js --action get --id 8 && node index.js --action list

# Добавялем контакт

node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22 && node index.js --action list
node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22 && node index.js --action list
node index.js --action add --name Mango --email mango@gmail.com --phone 322-22-22 && node index.js --action list

# Удаляем контакт

node index.js --action remove --id=3 && node index.js --action list
node index.js --action remove --id=4 && node index.js --action list
node index.js --action remove --id=7 && node index.js --action list

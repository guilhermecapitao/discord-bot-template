This is a simple template for a Discord bot built in JavaScript, using v12 the Discord.js module.

## 🧪 Technologies

- [Discord.js](https://discord.js.org/#/)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)

## 💻 Project

This project was created in order to facilitate the creation of the bots we have today in the Rocketseat community, and any future bots.

This template has one of the structures that made the most sense to us so far, to keep the code organized and to be able to implement more features without losing it.

This project has many contributions from [@Elias Gabriel](https://github.com/EliasGcf) and the Rocketseat community team.

## ✨ Features:

- Onboarding (standardization of nicknames)
- OAuth
- Express server
- Basic structure for commands. Some already implemented (not for Slash commands)
- User permissions level

## 🚀 Getting started

You will need to have postgres installed or in a docker container to run the project.

Enter the .env data, including the data from your [Discord application](https://discord.com/developers/applications).


Remember to enable PRESENCE INTENT and SERVER MEMBERS INTENT on your Bot.

```bash
# Install the dependencies
$ yarn

# Start the project
$ yarn dev:bot
```
The bot will run and the server will be available on port 3333.

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

---

<p align="center">Made with 💜 by Guilherme Capitão</p>

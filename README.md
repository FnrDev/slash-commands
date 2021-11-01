# slash-command by Fnr#0017

## slash commands handler to make your bot support slash commands features.

---
### Note: Node.js 16.6.0 or newer is required.
---

## Installation

```sh
npm install
```

---
### Make sure to check [Slash Commands Guide](https://discordjs.guide/interactions/registering-slash-commands.html)
---
### You need to rename example_config.json file to `config.json` and fill the info.

- config.json
```js
{
    "token": "YOUR_BOT_TOKEN",
    "serverID": "YOUR_SERVER_ID",
    "botID": "YOUR_BOT_ID",
    "log_channel_id": "Channel-id",
    "prefix": "YOUR_PREFIX",
    "autoRoleId": "ROLE ID",
    "ownersID": ["Id_1", "id_2"],
    "ownersID": ["Id_1", "id_2"]
}
```
- Note: Prefix is not required in `config.json` you just need it if you want to create commands with prefix.

### If you need to create more commands just create new file in commands file with following example in other commands.

### If you need to create commands for prefix create file in commands file

### If you need help you can contact me in discord `Fnr#0017`

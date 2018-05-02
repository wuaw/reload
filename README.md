## reload

Usage: `/reload module-name`

If your module uses [Command](https://github.com/pinkipi/command), you should remove your commands in your module's destructor.

If your module `require()`s submodules, in order for them to be reloaded you will need to remove them from `require.cache`. Otherwise the cached version will still be used upon reload; `reload` can only reload the parent module.

If you require state tracking, for example of values from `S_LOGIN`, you can store them in a global object to persist reloads. (There are alternatives to this, such as using a dedicated state tracker module.)


These concepts are demonstrated below.

```js
const Command = require('command');
const state = global.myModule = global.myModule || {};
const mySubModule = require('./mysubmodule');

module.exports = function MyModule(dispatch) {
  const command = new Command(dispatch);

  dispatch.hook('S_LOGIN', 10, (event) => {
    state.playerId = event.playerId;
  });

  command.add('mycommand', (arg) => {
    //
  });

  this.destructor = function() {
    command.remove('mycommand');
    delete require.cache[require.resolve('./mysubmodule')];
  };
};
```

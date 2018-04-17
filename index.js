const Command = require('command');

module.exports = function Reload(dispatch) {
  const command = new Command(dispatch);

  command.add('reload', (target) => {
    if (target === 'reload') {
      return command.message('[reload] cannot reload self');
    }

    dispatch.unload(target);

    try {
      delete require.cache[require.resolve(target)];
      require(target);
      dispatch.load(target, module);
      command.message(`[reload] ${target} module reloaded`);
    } catch (e) {
      command.message(`[reload] error reloading ${target} module:\n${e.message}`);
      console.error(e.stack);
    }
  });
};

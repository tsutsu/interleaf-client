const electron_rebuild = require('electron-rebuild')
const installNodeHeaders = electron_rebuild.installNodeHeaders
const rebuildNativeModules = electron_rebuild.rebuildNativeModules
const shouldRebuildNativeModules = electron_rebuild.shouldRebuildNativeModules
const preGypFixRun = electron_rebuild.preGypFixRun;

electronBinaryPath = '/Users/tsu/Desktop/electron-quick-start/node_modules/electron-prebuilt/dist/Electron.app/Contents/MacOS/Electron'
electronVersion = '1.2.5'

shouldRebuildNativeModules(electronBinaryPath, electronVersion)
  .then((shouldBuild) => {
    if (!shouldBuild) return true;

    return installNodeHeaders(electronVersion)
      .then(() => rebuildNativeModules(electronVersion, './node_modules'))
      .then(() => preGypFixRun('./node_modules', true, electronBinaryPath));
  })
  .catch((e) => {
    console.error("Building modules didn't work!");
    console.error(e);
  });

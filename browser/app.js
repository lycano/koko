import app from 'app';
import bridge from '../common/bridge';
import crashReporter from 'crash-reporter';
import BrowserWindow from 'browser-window';
import * as irc from './irc';

export function run(mainUrl) {
  crashReporter.start();

  var mainWindow = null;

  app.on('window-all-closed', function() {
    app.quit();
  });

  app.on('ready', function() {
    mainWindow = new BrowserWindow({width: 800, height: 600});
    mainWindow.loadUrl(mainUrl);
    mainWindow.on('closed', function() {
      mainWindow = null;
    });

    bridge.initialize(mainWindow);
    bridge.on('connect', function (data) {
      irc.connect(data);
    });
  });
}
const fs = require('fs');
const path = require('path');

// Main function to initiate copying plugins
function main() {
  const buildDirectory = 'modules/expo-flutter-view/ios/Flutter';
  copyPlugins(fs, buildDirectory);
}

function copyPlugins(fs, outputDirectory) {
  const pluginsDirectory = path.join(outputDirectory, 'plugins');
  if (fs.existsSync(pluginsDirectory)) {
    fs.rmSync(pluginsDirectory, { recursive: true, force: true });
  }
  const flutterPluginsDependenciesFile = 'flutter_module/.flutter-plugins-dependencies';
  const pluginRegistrantHost = 'flutter_module/.ios/Flutter/FlutterPluginRegistrant';

  preparePlugins(fs, pluginsDirectory, flutterPluginsDependenciesFile, pluginRegistrantHost);
}

function preparePlugins(fs, pluginsDirectory, flutterPluginsDependenciesFile, pluginRegistrantHost) {
  const pluginPods = flutterParseDependenciesFileForIosPlugin(flutterPluginsDependenciesFile);

  for (const pluginHash of pluginPods) {
    const pluginName = pluginHash['name'];
    const pluginPath = pluginHash['path'];
    const hasNativeBuild = pluginHash['native_build'] === true;
    const sharedDarwinSource = pluginHash['shared_darwin_source'] === true;
    const platformDirectory = sharedDarwinSource ? 'darwin' : 'ios';

    if (pluginName && pluginPath && hasNativeBuild) {
      const sourceDirPath = path.join(pluginPath, platformDirectory);
      copyPath(fs, sourceDirPath, path.join(pluginsDirectory, pluginName, platformDirectory));

      const licenseFile = path.join(pluginPath, 'LICENSE');
      if (fs.existsSync(licenseFile)) {
        fs.copyFileSync(licenseFile, path.join(pluginsDirectory, pluginName, 'LICENSE'));
      }

      const pubspecFile = path.join(pluginPath, 'pubspec.yaml');
      if (fs.existsSync(pubspecFile)) {
        fs.copyFileSync(pubspecFile, path.join(pluginsDirectory, pluginName, 'pubspec.yaml'));
      }
    }
  }
  // Copy FlutterPluginRegistrant
  copyPath(fs, pluginRegistrantHost, path.join(pluginsDirectory, 'FlutterPluginRegistrant'));
}

function flutterParseDependenciesFileForIosPlugin(flutterPluginsDependenciesFile) {
  const dependenciesFile = fs.readFileSync(flutterPluginsDependenciesFile, 'utf8');
  const dependenciesHash = JSON.parse(dependenciesFile);
  return dependenciesHash.plugins.ios;
}

function copyPath(fs, from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }

  const items = fs.readdirSync(from);
  for (const item of items) {
    const inputPath = path.join(from, item);
    const outputPath = path.join(to, item);

    if (fs.lstatSync(inputPath).isDirectory()) {
      fs.mkdirSync(outputPath, { recursive: true });
      copyPath(fs, inputPath, outputPath);
    } else if (fs.lstatSync(inputPath).isFile()) {
      fs.copyFileSync(inputPath, outputPath);
    } else if (fs.lstatSync(inputPath).isSymbolicLink()) {
      const target = fs.readlinkSync(inputPath);
      fs.symlinkSync(target, outputPath);
    }
  }
}

// Run the main function
main();

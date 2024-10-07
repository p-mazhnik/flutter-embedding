import { ConfigPlugin, withProjectBuildGradle, withDangerousMod } from 'expo/config-plugins';
import {
  createGeneratedHeaderComment,
  MergeResults,
  mergeContents,
  removeGeneratedContents,
} from '@expo/config-plugins/build/utils/generateCode';

import fs from 'fs'
import path from 'path'

const gradleMaven = [
`
allprojects {
    repositories {
        maven {
            // This maven repo is created when you run \`flutter build aar\`. It contains compiled code
            // and resources for flutter_module itself.
            url '../../flutter_module/build/host/outputs/repo'
        }
        maven {
            // This maven repo contains artifacts for Flutter's Android embedding.
            url 'https://storage.googleapis.com/download.flutter.io'
        }
    }
}
`,
].join('\n');

export function addFlutterImport(src: string): MergeResults {
  return appendContents({
    tag: 'expo-flutter-view',
    src,
    newSrc: gradleMaven,
    comment: '//',
  });
}

function appendContents({
  src,
  newSrc,
  tag,
  comment,
}: {
  src: string;
  newSrc: string;
  tag: string;
  comment: string;
}): MergeResults {
  const header = createGeneratedHeaderComment(newSrc, tag, comment);
  if (src.indexOf(header) == -1) {
    // Ensure the old generated contents are removed.
    const sanitizedTarget = removeGeneratedContents(src, tag);
    const contentsToAdd = [
      // @something
      header,
      // contents
      newSrc,
      // @end
      `${comment} @generated end ${tag}\n`,
    ].join('\n');

    return {
      contents: sanitizedTarget ?? src + contentsToAdd,
      didMerge: true,
      didClear: !!sanitizedTarget,
    };
  }
  return { contents: src, didClear: false, didMerge: false };
}

const withFlutter: ConfigPlugin = config => {
  config = withProjectBuildGradle(config, (config) => {
    if (config.modResults.language === 'groovy') {
      config.modResults.contents = addFlutterImport(config.modResults.contents).contents;
    } else {
      throw new Error('Cannot add flutter maven gradle because the build.gradle is not groovy');
    }
    return config;
  })

  config = withDangerousMod(config, ['ios', async (config) => {
    const podfile = path.join(config.modRequest.platformProjectRoot, 'Podfile');
    const projectRoot = config.modRequest.projectRoot

    // Inject Flutter pods into the Podfile
    // TODO(p-mazhnik): to avoid frequent Podfile updates, logic below could be extracted to the custom ruby script
    const pluginsDir = path.join(projectRoot, 'modules/expo-flutter-view/ios/Flutter/plugins');
    const flutterIosPluginPods = []
    flutterIosPluginPods.push('  pod \'Flutter\', :podspec => \'../modules/expo-flutter-view/ios/Flutter/Flutter.podspec\'');
    flutterIosPluginPods.push(...getFlutterPluginPods(pluginsDir)
      .map(plugin => `  pod '${plugin.name}', path: '${plugin.path.replace(/.*\/modules\//, '../modules/')}'`));

    flutterIosPluginPods.push('  pod \'FlutterModule-Debug\', ' +
      ':podspec => \'../modules/expo-flutter-view/ios/Podspecs/FlutterModule-Debug.podspec\', ' +
      ':configuration => \'Debug\'')
    flutterIosPluginPods.push('  pod \'FlutterModule-Release\', ' +
      ':podspec => \'../modules/expo-flutter-view/ios/Podspecs/FlutterModule-Release.podspec\', ' +
      ':configuration => \'Release\'')

    // some specific dependencies could require modular_headers set to true
    flutterIosPluginPods.push('  pod \'GoogleUtilities\', :modular_headers => true')
    flutterIosPluginPods.push('  pod \'FirebaseCore\', :modular_headers => true')

    const contents = await fs.promises.readFile(podfile, 'utf8');

    const result = mergeContents({
      tag: 'expo-flutter-view',
      src: contents,
      newSrc: flutterIosPluginPods.join('\n'),
      anchor: /use_native_modules/,
      offset: 0,
      comment: '#',
    });

    if (result.didMerge || result.didClear) {
      await fs.promises.writeFile(podfile, result.contents);
    }

    return config;
  }])

  return config
};

function getFlutterPluginPods(pluginsDir: string) {
  if (!fs.existsSync(pluginsDir)) {
    throw new Error(`${pluginsDir} must exist.`);
  }

  // Find all podspec files and process them
  const pluginPodspecPaths = getFilesRecursive(pluginsDir, '.podspec');

  return pluginPodspecPaths.map(pluginPodspecPath => {
    const pluginPath = path.dirname(pluginPodspecPath);
    const pluginName = path.basename(pluginPodspecPath, '.podspec');

    return {
      name: pluginName,
      path: pluginPath
    }
  });
}

// Helper function to get all files recursively with a specific extension
function getFilesRecursive(dir: string, extension: string) {
  let results: string[] = [];

  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(getFilesRecursive(fullPath, extension));
    } else if (fullPath.endsWith(extension)) {
      results.push(fullPath);
    }
  });

  return results;
}

export default withFlutter;

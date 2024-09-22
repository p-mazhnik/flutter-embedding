"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFlutterImport = void 0;
const config_plugins_1 = require("expo/config-plugins");
const generateCode_1 = require("@expo/config-plugins/build/utils/generateCode");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
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
function addFlutterImport(src) {
    return appendContents({
        tag: 'expo-flutter-view',
        src,
        newSrc: gradleMaven,
        comment: '//',
    });
}
exports.addFlutterImport = addFlutterImport;
function appendContents({ src, newSrc, tag, comment, }) {
    const header = (0, generateCode_1.createGeneratedHeaderComment)(newSrc, tag, comment);
    if (src.indexOf(header) == -1) {
        // Ensure the old generated contents are removed.
        const sanitizedTarget = (0, generateCode_1.removeGeneratedContents)(src, tag);
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
const withFlutter = config => {
    config = (0, config_plugins_1.withProjectBuildGradle)(config, (config) => {
        if (config.modResults.language === 'groovy') {
            config.modResults.contents = addFlutterImport(config.modResults.contents).contents;
        }
        else {
            throw new Error('Cannot add flutter maven gradle because the build.gradle is not groovy');
        }
        return config;
    });
    config = (0, config_plugins_1.withDangerousMod)(config, ['ios', async (config) => {
            const podfile = path_1.default.join(config.modRequest.platformProjectRoot, 'Podfile');
            const projectRoot = config.modRequest.projectRoot;
            const pluginsDir = path_1.default.join(projectRoot, 'modules/expo-flutter-view/ios/Flutter/plugins');
            const flutterIosPluginPods = [];
            flutterIosPluginPods.push('  pod \'Flutter\', :podspec => \'../modules/expo-flutter-view/ios/Flutter/Flutter.podspec\'');
            flutterIosPluginPods.push(...getFlutterPluginPods(pluginsDir)
                .map(plugin => `  pod '${plugin.name}', path: '${plugin.path}'`));
            flutterIosPluginPods.push('  pod \'FlutterModule-Debug\', ' +
                ':podspec => \'../modules/expo-flutter-view/ios/Podspecs/FlutterModule-Debug.podspec\', ' +
                ':configuration => \'Debug\'');
            flutterIosPluginPods.push('  pod \'FlutterModule-Release\', ' +
                ':podspec => \'../modules/expo-flutter-view/ios/Podspecs/FlutterModule-Release.podspec\', ' +
                ':configuration => \'Release\'');
            // some specific dependencies could require modular_headers set to true
            flutterIosPluginPods.push('  pod \'GoogleUtilities\', :modular_headers => true');
            flutterIosPluginPods.push('  pod \'FirebaseCore\', :modular_headers => true');
            const contents = await fs_1.default.promises.readFile(podfile, 'utf8');
            const result = (0, generateCode_1.mergeContents)({
                tag: 'expo-flutter-view',
                src: contents,
                newSrc: flutterIosPluginPods.join('\n'),
                anchor: /use_native_modules/,
                offset: 0,
                comment: '#',
            });
            if (result.didMerge || result.didClear) {
                await fs_1.default.promises.writeFile(podfile, result.contents);
            }
            return config;
        }]);
    return config;
};
function getFlutterPluginPods(pluginsDir) {
    if (!fs_1.default.existsSync(pluginsDir)) {
        throw new Error(`${pluginsDir} must exist.`);
    }
    // Find all podspec files and process them
    const pluginPodspecPaths = getFilesRecursive(pluginsDir, '.podspec');
    return pluginPodspecPaths.map(pluginPodspecPath => {
        const pluginPath = path_1.default.dirname(pluginPodspecPath);
        const pluginName = path_1.default.basename(pluginPodspecPath, '.podspec');
        return {
            name: pluginName,
            path: pluginPath
        };
    });
}
// Helper function to get all files recursively with a specific extension
function getFilesRecursive(dir, extension) {
    let results = [];
    fs_1.default.readdirSync(dir).forEach(file => {
        const fullPath = path_1.default.join(dir, file);
        const stat = fs_1.default.statSync(fullPath);
        if (stat.isDirectory()) {
            results = results.concat(getFilesRecursive(fullPath, extension));
        }
        else if (fullPath.endsWith(extension)) {
            results.push(fullPath);
        }
    });
    return results;
}
exports.default = withFlutter;

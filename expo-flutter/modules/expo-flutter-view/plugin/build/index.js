"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFlutterImport = void 0;
const config_plugins_1 = require("expo/config-plugins");
const generateCode_1 = require("@expo/config-plugins/build/utils/generateCode");
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
    return config;
};
exports.default = withFlutter;

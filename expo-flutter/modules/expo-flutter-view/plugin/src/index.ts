import { ConfigPlugin, withProjectBuildGradle } from 'expo/config-plugins';
import {
  createGeneratedHeaderComment,
  MergeResults,
  removeGeneratedContents,
} from '@expo/config-plugins/build/utils/generateCode';
import { PluginConfigType } from 'expo-build-properties/src/pluginConfig'

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

  const buildConfig: PluginConfigType = {
    ios: {
      extraPods: [
        {
          name: 'FlutterModule-Debug',
          configurations: ['Debug'],
          podspec: '../modules/expo-flutter-view/ios/Podspecs/FlutterModule-Debug.podspec'
        },
        {
          name: 'FlutterModule-Release',
          configurations: ['Release'],
          podspec: '../modules/expo-flutter-view/ios/Podspecs/FlutterModule-Release.podspec'
        }
      ],
    }
  }

  // config = withBuildProperties(config, buildConfig)

  if (!config.plugins) {
    config.plugins = []
  }

  config.plugins = [
    ...config.plugins,
    [
      "expo-build-properties",
      buildConfig
    ]
  ]

  config.ios

  return config
};

export default withFlutter;

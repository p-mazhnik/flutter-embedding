require 'json'

def setCommonProps(s)
  s.version        = '1.2.0'
  s.summary        = 'Summary'
  s.description    = 'Description'
  s.author         = ''
  s.homepage       = 'https://github.com/p-mazhnik/flutter-embedding'
  s.platforms     = { :ios => "13.0" }
end

def generateFrameworksSpecProps(s, configuration)
  setCommonProps(s)
  s.name = "FlutterModule-#{configuration}"
  s.source = { :http => "file://#{__dir__}/../Flutter/#{configuration}.zip"}
  s.xcconfig = { 'FRAMEWORK_SEARCH_PATHS' => "'${PODS_ROOT}/#{s.name}'"}
  s.description  = <<-DESC
                  FlutterModule, #{configuration}
                   DESC
  s.source_files = "**/*.{swift,h,m}"
  s.vendored_frameworks = "**/*.xcframework"
  s.preserve_paths = "**/*.xcframework"
  s.pod_target_xcconfig = { 'DEFINES_MODULE' => 'YES' }
end

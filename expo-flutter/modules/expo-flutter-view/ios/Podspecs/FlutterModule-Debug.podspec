require './common'

Pod::Spec.new do |s|
  generateFrameworksSpecProps(s, "Debug")
end

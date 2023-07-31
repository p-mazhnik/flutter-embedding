require './common'

Pod::Spec.new do |s|
  generateFrameworksSpecProps(s, "Release")
end

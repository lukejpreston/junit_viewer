jasmine.VERBOSE = true

require('jasmine-reporters')
var reporter = new jasmine.JUnitXmlReporter('junit_viewer_specs')
jasmine.getEnv().addReporter(reporter)
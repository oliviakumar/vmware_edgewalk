module github.com/vmware-edgewalk/appsdk

go 1.13

require (
	github.com/edgexfoundry/app-functions-sdk-go v0.2.0-dev.50
	github.com/edgexfoundry/device-goface v0.0.0
	github.com/edgexfoundry/go-mod-core-contracts v0.1.25
)

replace github.com/edgexfoundry/device-goface v0.0.0 => ../device-goface

replace github.com/hashicorp/consul => github.com/hashicorp/consul v1.5.1

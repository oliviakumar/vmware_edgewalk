module github.com/vmware-edgewalk/appsdk

go 1.12

require (
	github.com/edgexfoundry/app-functions-sdk-go v0.2.0-dev.50
	github.com/edgexfoundry/device-goface v0.0.0
	github.com/edgexfoundry/device-sdk-go v1.1.0
	github.com/edgexfoundry/go-mod-core-contracts v0.1.31
)

replace github.com/edgexfoundry/device-goface v0.0.0 => ../device-goface

replace github.com/hashicorp/consul v1.4.2 => /Users/oliviakumar/go/pkg/mod/github.com/hashicorp/consul/api@v1.1.0

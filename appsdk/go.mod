module github.com/vmware-edgewalk/appsdk

go 1.13

require (
	github.com/edgexfoundry/app-functions-sdk-go v0.2.0-dev.50
	github.com/edgexfoundry/device-goface v0.0.0
	github.com/edgexfoundry/go-mod-core-contracts v0.1.25
	github.com/hashicorp/go-msgpack v0.5.4 // indirect
	github.com/hashicorp/mdns v1.0.1 // indirect
	github.com/hashicorp/memberlist v0.1.4 // indirect
	github.com/mitchellh/reflectwalk v1.0.1 // indirect
	golang.org/x/crypto v0.0.0-20190325154230-a5d413f7728c // indirect
	golang.org/x/net v0.0.0-20190403144856-b630fd6fe46b // indirect
	golang.org/x/sync v0.0.0-20190227155943-e225da77a7e6 // indirect
	golang.org/x/sys v0.0.0-20190403152447-81d4e9dc473e // indirect
)

replace github.com/edgexfoundry/device-goface v0.0.0 => ../device-goface

replace github.com/hashicorp/consul => github.com/hashicorp/consul v1.5.1

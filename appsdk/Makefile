
PROGS = app-functions-sdk/appsdk

GO=CGO_ENABLED=1 GO111MODULE=on go

VERSION=$(shell cat ./VERSION)

GOFLAGS=-ldflags "-X github.com/vmware-edgewalk/appsdk=$(VERSION)"

GIT_SHA=$(shell git rev-parse HEAD)

build: $(PROGS)

app-functions-sdk/appsdk:
	$(GO) build $(GOFLAGS) -o $@ ./app-functions-sdk/

clean:
	rm app-functions-sdk/appsdk


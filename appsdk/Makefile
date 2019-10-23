GO=CGO_ENABLED=1 GO111MODULE=on go

GOFLAGS=-ldflags "-X github.com/edgexfoundry/app-functions-sdk-go/internal.SDKVersion=$(VERSION) -X github.com/edgexfoundry/app-functions-sdk-go/internal.ApplicationVersion=$(VERSION)"

GIT_SHA=$(shell git rev-parse HEAD)

app-functions-sdk/appsdk:
	$(GO) build $(GOFLAGS) -o $@ ./app-functions-sdk/

clean:
	rm app-functions-sdk/appsdk


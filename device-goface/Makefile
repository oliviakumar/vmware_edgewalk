.PHONY: build test clean docker

GO=CGO_ENABLED=0 GO111MODULE=on go

MICROSERVICES=cmd/device-goface/device-goface

.PHONY: $(MICROSERVICES)

DOCKERS=docker_device_goface
.PHONY: $(DOCKERS)

VERSION=$(shell cat ./VERSION)
GIT_SHA=$(shell git rev-parse HEAD)

GOFLAGS=-ldflags "-X github.com/edgexfoundry/device-goface.Version=$(VERSION)"
#GOFLAGS=-ldflags "-X github.com/edgexfoundry/device-goface.Version=1.1.0"


build: $(MICROSERVICES)
	#$(GO) install -tags=safe
	$(GO) build ./...

# this is where the DS will be built 
cmd/device-goface/device-goface:
	$(GO) build $(GOFLAGS) -o $@ ./cmd/device-goface

test:
		$(GO) test ./... -cover

clean:
	rm -f $(MICROSERVICES)

docker: $(DOCKERS)

# uncomment: -f cmd/device-goface/Dockerfile \ if needed

docker_device_goface:
	docker build \
		--label "git_sha=$(GIT_SHA)" \
		-t edgexfoundry/docker-device-goface:$(GIT_SHA) \
		-t edgexfoundry/docker-device-goface:$(VERSION)-dev \
		.

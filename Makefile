makefile

GRAPH_CLI = graph
NODE_URL_REMOTE = https://api.studio.thegraph.com/deploy/
NODE_URL_LOCAL = http://localhost:8020/
IPFS_URL_LOCAL = http://localhost:5001
SUBGRAPH_NAME = swaplace-subgraph

# Default target executed when no arguments are given to make
default: help

help:
	@echo "Available targets:"
	@echo "  - make codegen       : Run graph codegen"
	@echo "  - make build         : Run graph build"
	@echo "  - make deploy        : Deploy subgraph to remote node"
	@echo "  - make create-local  : Create local subgraph"
	@echo "  - make remove-local  : Remove local subgraph"
	@echo "  - make deploy-local  : Deploy subgraph to local node"
	@echo "  - make test          : Run graph test"

run-docker:
	cd graph_node && docker-compose up

codegen:
	$(GRAPH_CLI) codegen

build:
	$(GRAPH_CLI) build

deploy:
	$(GRAPH_CLI) deploy --node $(NODE_URL_REMOTE) $(SUBGRAPH_NAME)

create-local:
	$(GRAPH_CLI) create --node $(NODE_URL_LOCAL) $(SUBGRAPH_NAME)

remove-local:
	$(GRAPH_CLI) remove --node $(NODE_URL_LOCAL) $(SUBGRAPH_NAME)

deploy-local:
	$(GRAPH_CLI) deploy --node $(NODE_URL_LOCAL) --ipfs $(IPFS_URL_LOCAL) $(SUBGRAPH_NAME)

test:
	$(GRAPH_CLI) test

run-subgraph:
	make codegen
	make build
	make create-local
	make deploy-local


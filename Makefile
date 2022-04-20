#!make
MODE ?=plan

export PROJECT_DIR=$(shell pwd)

.PHONY: all build start check-md clean tests

HASH = $(shell git rev-parse --short HEAD)
BRANCH_NAME ?= $(shell git symbolic-ref --short -q HEAD)
BUILD_NUMBER ?= 0

export BUILD_VERSION ?= $(BRANCH_NAME).$(BUILD_NUMBER).$(HASH)

get-branch:
	echo $(BRANCH_NAME)

get-version:
	echo $(BUILD_VERSION)

get-desc:
	echo $(HASH)@$(BRANCH_NAME) build number $(BUILD_NUMBER)

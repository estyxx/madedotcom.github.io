#!make

TERRAFORM_COMMON_DIR ?=./terraform/terraform-common
MODE ?=plan

export PROJECT_DIR=$(shell pwd)

# Include docker-terraform macros
-include $(TERRAFORM_COMMON_DIR)/Makefile

.PHONY: all build start check-md clean tests

HASH = $(shell git rev-parse --short HEAD)
BRANCH_NAME ?= $(shell git symbolic-ref --short -q HEAD)
BUILD_NUMBER ?= 0

export BUILD_VERSION ?= $(BRANCH_NAME).$(BUILD_NUMBER).$(HASH)
export TERRAFORM_VERSION=0.14.5-master.27.b84cf5d

get-branch:
	echo $(BRANCH_NAME)

get-version:
	echo $(BUILD_VERSION)

get-desc:
	echo $(HASH)@$(BRANCH_NAME) build number $(BUILD_NUMBER)

infrastructure-provision:
	$(call docker-terraform)

deploy:
	aws s3 sync  build s3://blog.made-test.com/

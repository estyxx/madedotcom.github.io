{
  "name": "my-app",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --ext .jsx,.js,.tsx,.ts",
    "lint:ts": "tsc --noemit",
    "prepare": "husky install"
  },
  "lint-staged": {
    "**/*": "prettier --write --ignore-unknown"
  },
  "dependencies": {
    "@chakra-ui/react": "^1.8.1",
    "@emotion/react": "^11",
    "@emotion/styled": "^11",
    "@next/mdx": "^12.0.9",
    "framer-motion": "^5",
    "gray-matter": "^4.0.3",
    "next": "12.0.9",
    "next-mdx-remote": "^3.0.8",
    "react": "17.0.2",
    "react-dom": "17.0.2",
    "react-icons": "^4.3.1",
    "remark-mdx-code-meta": "^1.0.0",
    "remark-prism": "^1.3.6"
  },
  "devDependencies": {
    "@python-italia/eslint-config": "^1.0.13",
    "@types/node": "17.0.13",
    "@types/react": "17.0.38",
    "eslint": "8.7.0",
    "eslint-config-next": "12.0.9",
    "husky": "^7.0.4",
    "lint-staged": "^12.3.2",
    "prettier": "^2.5.1",
    "typescript": "4.5.5"
  }
}
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

get-version:
	echo $(BUILD_VERSION)

get-desc:
	echo $(HASH)@$(BRANCH_NAME) build number $(BUILD_NUMBER)

infrastructure-provision:
	$(call docker-terraform)

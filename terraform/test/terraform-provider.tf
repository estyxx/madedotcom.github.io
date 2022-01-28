terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.32.0"
    }
  }

  # terraform version
  required_version = ">= 0.14"
}

provider "aws" {
  region = "eu-west-1"
}


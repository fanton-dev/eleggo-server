terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
  }

  backend "remote" {
    organization = "fanton"

    workspaces {
      name = "eleggo-dev"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

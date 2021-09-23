terraform {
  required_version = ">= 1.0.6"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = ">= 3.20.0"
    }

    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = ">= 2.0.1"
    }

    local = {
      source  = "hashicorp/local"
      version = "2.1.0"
    }
  }

  backend "remote" {
    organization = "fanton"

    workspaces {
      name = "eleggo-dev"
    }
  }
}

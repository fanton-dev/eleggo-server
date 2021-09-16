terraform {
  backend "remote" {
    organization = "fanton"

    workspaces {
      name = "eleggo"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

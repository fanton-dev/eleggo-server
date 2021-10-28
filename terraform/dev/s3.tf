module "s3_code_snippets_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = "eleggo-dev-code-snippets-bucket"
  acl    = "public-read"

  versioning = {
    enabled = true
  }
}

module "s3_recordings_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = "eleggo-dev-recordings-bucket"
  acl    = "public-read"

  versioning = {
    enabled = true
  }
}

module "s3_neural_networks_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = "eleggo-dev-neural-networks-bucket"
  acl    = "public-read"

  versioning = {
    enabled = true
  }
}

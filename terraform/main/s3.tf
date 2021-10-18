module "s3_code_snippets_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = "eleggo-main-code-snippets-bucket"
  acl    = "private"

  versioning = {
    enabled = true
  }
}

module "s3_recordings_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = "eleggo-main-recordings-bucket"
  acl    = "private"

  versioning = {
    enabled = true
  }
}
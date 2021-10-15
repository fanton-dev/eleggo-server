module "s3_bucket" {
  source = "terraform-aws-modules/s3-bucket/aws"

  bucket = "eleggo-dev-code-snippets"
  acl    = "public-read"

  versioning = {
    enabled = true
  }
}

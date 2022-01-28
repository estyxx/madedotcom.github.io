terraform {
  backend "s3" {
    bucket         = "made-test-terraform-state"
    dynamodb_table = "made-test-terraform-state.lock"
    key            = "blog/state"
    region         = "eu-west-1"
  }
}

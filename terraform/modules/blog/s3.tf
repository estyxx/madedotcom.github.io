module "global-vars" {
  source = "../../terraform-common/modules/global-vars"
}

locals {
  s3_prefix   = module.global-vars.envs[var.env].s3_prefix
  bucket_name = var.blog_fqdn # must be the same as the fqdn
}

data "aws_iam_policy_document" "bucket" {
  statement {
    sid = "AllowTrustedVPNOnly"

    effect = "Allow"
    principals {
      type        = "*"
      identifiers = ["*"]
    }
    actions = [
      "s3:GetObject"
    ]

    resources = [
      "arn:aws:s3:::${local.bucket_name}/*"
    ]

    condition {
      test     = "IpAddress"
      variable = "aws:SourceIp"

      # TODO add office CIDRs too
      values = module.global-vars.vpn_eip_cidrs
    }
  }
}

resource "aws_s3_bucket" "www" {
  bucket = local.bucket_name

  force_destroy = "true"
}

resource "aws_s3_bucket_acl" "www" {
  bucket = aws_s3_bucket.www.id
  acl    = "public-read"
}

resource "aws_s3_bucket_website_configuration" "www" {
  bucket = aws_s3_bucket.www.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "404.html"
  }
}

resource "aws_s3_bucket_policy" "www" {
  bucket = aws_s3_bucket.www.id
  policy = data.aws_iam_policy_document.bucket.json
}

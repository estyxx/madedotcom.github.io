module "global-vars" {
  source = "../../terraform-common/modules/global-vars"
}

locals {
  s3_prefix   = module.global-vars.envs[var.env].s3_prefix
  s3_bucket_name = var.blog_fqdn
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
      "arn:aws:s3:::${local.s3_bucket_name}/*"
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
  bucket = local.s3_bucket_name
  acl    = "public-read"
  policy = data.aws_iam_policy_document.bucket.json

  website {
    index_document = "server/pages/index.html"
    error_document = "server/pages/404.html"
  }

  force_destroy = "true"
}

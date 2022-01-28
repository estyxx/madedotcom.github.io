module "global_vars" {
  source = "../../terraform-common/modules/global-vars"
}

data "aws_route53_zone" "main" {
  name         = "${lookup(module.global_vars.envs, var.env).zone}."
  private_zone = false
}

resource "aws_route53_record" "main" {
  # setting the alias to the region in which the bucket sits
  # will automatically pick up the bucket named after the fqdn
  name    = var.blog_fqdn
  zone_id = data.aws_route53_zone.main.zone_id
  type    = "A"

  alias {
    name                   = "s3-website-eu-west-1.amazonaws.com." # FIXME data lookup?
    zone_id                = "Z1BKCTXD74EZPE"                      # S3 hosted zone for eu-west-1
    evaluate_target_health = false
  }
}

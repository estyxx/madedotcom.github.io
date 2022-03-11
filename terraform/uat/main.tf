module "global-vars" {
  source = "../terraform-common/modules/global-vars"
}

module "blog" {
  source    = "../modules/blog"
  env       = var.env
  blog_fqdn = var.blog_fqdn
}

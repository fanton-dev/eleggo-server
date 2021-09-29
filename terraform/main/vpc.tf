module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = local.vpc_name
  cidr = "10.0.0.0/16"

  azs             = ["us-east-1a", "us-east-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24", "10.0.3.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24", "10.0.103.0/24"]

  enable_nat_gateway = true

  manage_default_security_group  = true
  default_security_group_egress = [{
    description = "Allow all TCP and UDP traffic"
    cidr_blocks = "0.0.0.0/0"
  }]
  default_security_group_ingress = [{
    description = "Allow all internal TCP and UDP traffic"
    self        = true
  }]
  default_security_group_name    = "${local.vpc_name}-default"

  tags = {
    Terraform                                         = "true"
    Environment                                       = "main",
    "kubernetes.io/cluster/${local.eks_cluster_name}" = "shared"
  }

  public_subnet_tags = {
    "kubernetes.io/cluster/${local.eks_cluster_name}" = "shared"
    "kubernetes.io/role/elb"                          = "1"
  }

  private_subnet_tags = {
    "kubernetes.io/cluster/${local.eks_cluster_name}" = "shared"
    "kubernetes.io/role/internal-elb"                 = "1"
  }
}

data "aws_eks_cluster" "eks" {
  name = module.eks.cluster_id
}

data "aws_eks_cluster_auth" "eks" {
  name = module.eks.cluster_id
}

module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_version = "1.21"
  cluster_name    = local.kubernetes-cluster-name
  vpc_id          = module.vpc.vpc_id
  subnets         = concat(module.vpc.public_subnets, module.vpc.private_subnets)

  node_groups = {
    public = {
      name                          = "${local.kubernetes-cluster-name}-worker-group-public"
      instance_type                 = "t2.micro"
      desired_capacity              = 1
      min_capacity                  = 1
      max_capacity                  = 2
      additional_security_group_ids = [aws_security_group.kubernetes_worker_group_mgmt_group.id]
    }

    private = {
      name                          = "${local.kubernetes-cluster-name}-worker-group-private"
      instance_type                 = "t2.micro"
      desired_capacity              = 1
      min_capacity                  = 1
      max_capacity                  = 2
      additional_security_group_ids = [aws_security_group.kubernetes_worker_group_mgmt_group.id]
    }
  }

  depends_on = [
    module.vpc
  ]
}

resource "aws_security_group" "kubernetes_worker_group_mgmt_group" {
  name_prefix = "kubernetes_worker_group_mgmt_group"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port = 22
    to_port   = 22
    protocol  = "tcp"

    cidr_blocks = [
      "10.0.0.0/8",
    ]
  }
}
data "aws_eks_cluster" "eks" {
  name = module.eks.cluster_id
}

data "aws_eks_cluster_auth" "eks" {
  name = module.eks.cluster_id
}

module "eks" {
  source          = "terraform-aws-modules/eks/aws"
  cluster_version = "1.21"
  cluster_name    = "eleggo-dev-cluster"
  vpc_id          = module.vpc.vpc_id
  subnets         = module.vpc.subnets

  node_groups = {
    public = {
      name                          = "eleggo-dev-cluster-worker-group-public"
      instance_type                 = "t2.micro"
      desired_capacity              = 1
      min_capacity                  = 1
      max_capacity                  = 2
      additional_security_group_ids = [aws_security_group.worker_group_mgmt_group.id]
    }

    private = {
      name                          = "eleggo-dev-cluster-worker-group-private"
      instance_type                 = "t2.micro"
      desired_capacity              = 1
      min_capacity                  = 1
      max_capacity                  = 2
      additional_security_group_ids = [aws_security_group.worker_group_mgmt_group.id]
    }
  }

  depends_on = [
    module.vpc
  ]
}

resource "aws_security_group" "worker_group_mgmt_group" {
  name_prefix = "worker_group_mgmt_group"
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
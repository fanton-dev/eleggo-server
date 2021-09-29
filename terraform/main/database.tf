module "database" {
  source = "terraform-aws-modules/rds/aws"

  identifier = local.database_name

  engine               = "postgres"
  engine_version       = "12.7"
  instance_class       = "db.t2.micro"
  allocated_storage    = 20
  family               = "postgres12"
  major_engine_version = "12"

  name     = "eleggo"
  username = var.database_username
  password = var.database_password
  port     = "5432"

  iam_database_authentication_enabled = true
  vpc_security_group_ids              = [module.vpc.default_security_group_id]
  subnet_ids                          = module.vpc.private_subnets
  publicly_accessible                 = false

  maintenance_window         = "Mon:00:00-Mon:03:00"
  backup_window              = "03:00-06:00"
  auto_minor_version_upgrade = true

  monitoring_interval    = "30"
  monitoring_role_name   = "database-monitor"
  create_monitoring_role = true
  deletion_protection    = false

  tags = {
    Environment = "main"
  }

  depends_on = [
    module.vpc
  ]
}

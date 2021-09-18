resource "aws_budgets_budget" "costs" {
  name              = "overall_budget"
  budget_type       = "COST"
  limit_amount      = "10.00"
  limit_unit        = "USD"
  time_period_start = "2021-09-01_00:00"
  time_unit         = "MONTHLY"


  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 80
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = ["aws.admin@penchev.dev"]
  }


  notification {
    comparison_operator        = "GREATER_THAN"
    threshold                  = 100
    threshold_type             = "PERCENTAGE"
    notification_type          = "ACTUAL"
    subscriber_email_addresses = ["aws.admin@penchev.dev"]
  }
}
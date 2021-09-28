variable "alert_email_addresses" {
  description = "Emails to receive AWS alerts"
  type        = list(string)
  sensitive   = true
}

variable "database_username" {
  description = "Database administrator username"
  type        = string
  sensitive   = true
}

variable "database_password" {
  description = "Database administrator password"
  type        = string
  sensitive   = true
}

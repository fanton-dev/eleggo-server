variable "alert_email_addresses" {
  description = "Emails to receive AWS alerts"
  type        = list(string)
  sensitive   = true
}

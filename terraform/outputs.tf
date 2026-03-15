output "public_ip" {
  description = "EC2 public IP"
  value       = aws_instance.app.public_ip
}

output "app_url" {
  description = "Application URL"
  value       = "http://${aws_instance.app.public_ip}:3000"
}

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "app_name" {
  description = "Application name used for resource naming"
  type        = string
  default     = "nodejs-todo"
}

variable "ami_id" {
  description = "Amazon Linux 2 AMI ID (region-specific)"
  type        = string
  default     = "ami-0c02fb55956c7d316" # Amazon Linux 2 us-east-1
}

variable "key_name" {
  description = "EC2 key pair name for SSH access"
  type        = string
}

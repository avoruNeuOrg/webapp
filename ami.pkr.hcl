variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "source_ami" {
  type    = string
  default = "ami-0dfcb1ef8550277af" 
  ## CHANGE THIS TO YOUR LUNX2 AMI ID
}

variable "ssh_username" {
  type    = string
  default = "ec2-user"

}

variable "subnet_id" {
  type    = string
  default = "subnet-04ba5f58de0201e66"
  ## CHANGE THIS TO YOUR SUBNET ID
}

# https://www.packer.io/plugins/builders/amazon/ebs
source "amazon-ebs" "my-ami" {
  region          = "${var.aws_region}"
  ami_name        = "csye6225_${formatdate("YYYY_MM_DD_hh_mm_ss", timestamp())}"
  ami_description = "AMI for CSYE 6225"
  ami_regions = [
    "us-east-1",
  ]
  ami_users = ["435677752779"] #Dev

  aws_polling {
    delay_seconds = 120
    max_attempts  = 50
  }


  instance_type = "t2.micro"
  source_ami    = "${var.source_ami}"
  ssh_username  = "${var.ssh_username}"
  subnet_id     = "${var.subnet_id}"

  launch_block_device_mappings {
    delete_on_termination = true
    device_name           = "/dev/xvda" ## LINUX2 DEVICE
    volume_size           = 8
    volume_type           = "gp2"
    encrypted             = false
  }
}



build {
  sources = ["source.amazon-ebs.my-ami"]

  provisioner "shell" {
    inline = ["mkdir -p /tmp/apps/"]
  }

  provisioner "file" {
    ## THIS IS TO MOVE YOUR ZIP file to the EC2 instance 
    source      = "webapp.zip"
    destination = "/tmp/apps/webapp.zip"
  }

  provisioner "file" {
    source = "app.service"
    destination = "/tmp/app.service"
  }

  provisioner "shell" {
    ## THIS IS FOR SETUP & APPLICATION AS SERVICE
    script = "script.sh"
  }
}



FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt update && apt upgrade -y && apt install -y \
    python3 \
    python3-pip \
    python3-venv \
    nano \ 
    git \
    sudo

RUN useradd -ms /bin/bash vscode && echo "vscode:password" | chpasswd && adduser vscode sudo

WORKDIR /workspace

COPY . /workspace

RUN pip3 install --upgrade pip

RUN pip3 install -r requirements.txt

RUN chown -R vscode:vscode /workspace

USER vscode

COPY python_createsuperuser.py /workspace/python_createsuperuser.py
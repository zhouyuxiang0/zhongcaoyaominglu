FROM rust:latest as builder
WORKDIR /usr/src/

COPY . ./app
WORKDIR /usr/src/app

EXPOSE 3000

RUN cargo run
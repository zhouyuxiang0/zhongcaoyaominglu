FROM rust:latest as builder
WORKDIR /usr/src/

COPY . ./app
WORKDIR /usr/src/app
RUN cargo run
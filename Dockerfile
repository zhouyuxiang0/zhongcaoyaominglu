FROM rust:latest
WORKDIR /app
RUN cargo new zhongcaoyaominglu
COPY . .
RUN cargo run

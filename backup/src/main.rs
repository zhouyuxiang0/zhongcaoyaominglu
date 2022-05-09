use actix_web::{App, HttpServer};

mod router;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().configure(router::config))
        .bind(("127.0.0.1", 3000))?
        .run()
        .await
}

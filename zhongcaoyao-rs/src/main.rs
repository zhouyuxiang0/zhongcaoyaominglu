use actix_web::{web, App, HttpServer};
use sea_orm::DatabaseConnection;
mod category;
mod entity;

#[derive(Debug, Clone)]
pub struct AppState {
    conn: DatabaseConnection,
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "debug");
    env_logger::init();
    let conn = sea_orm::Database::connect("mysql://root:root@127.0.0.1:3306/zhongcaoyaominglu")
        .await
        .unwrap();
    let state = AppState { conn };
    log::info!("server listening on http://127.0.0.1:{}", 3000);
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(state.clone()))
            .service(category::get_all_parent)
            .service(category::create)
            .service(category::update)
    })
    .bind(("127.0.0.1", 3000))?
    .run()
    .await
}

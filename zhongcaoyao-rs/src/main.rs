use actix_web::{get, web, App, Error, HttpRequest, HttpServer, Responder, Result};
use sea_orm::{ColumnTrait, DatabaseConnection, DbErr, EntityTrait, QueryFilter};
mod entity;

#[derive(Debug, Clone)]
struct AppState {
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
            .service(hello)
            .service(echo)
    })
    .bind(("127.0.0.1", 3000))?
    .run()
    .await
}

#[get("/")]
async fn hello(data: web::Data<AppState>) -> Result<impl Responder, Error> {
    let category = entity::category::Entity::find()
        .filter(entity::category::Column::ParentId.is_null())
        .all(&data.conn)
        .await
        .expect("msg");
    Ok(web::Json(category))
}

#[get("/echo")]
async fn echo() -> impl Responder {
    "echo"
}

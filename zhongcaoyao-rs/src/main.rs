#![feature(future_poll_fn)]
#![feature(future_join)]
use crate::claims::Claims;
use actix_web::{dev::ServiceRequest, post, web, App, Error, HttpServer};
use actix_web_grants::permissions::AttachPermissions;
use actix_web_httpauth::extractors::bearer::BearerAuth;
use actix_web_httpauth::middleware::HttpAuthentication;
use sea_orm::DatabaseConnection;
use serde::Deserialize;
mod category;
mod claims;
mod common;
mod entity;
mod medicine;

#[derive(Debug, Clone)]
pub struct AppState {
    conn: DatabaseConnection,
}

async fn validator(req: ServiceRequest, credentials: BearerAuth) -> Result<ServiceRequest, Error> {
    // We just get permissions from JWT
    let claims = claims::decode_jwt(credentials.token())?;
    req.attach(claims.permissions);
    Ok(req)
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "debug");
    env_logger::init();
    let conn = sea_orm::Database::connect("mysql://root:root@127.0.0.1:3306/zhongcaoyaominglu")
        .await
        .unwrap();
    let state = AppState { conn };
    let auth = HttpAuthentication::bearer(validator);
    log::info!("server listening on http://127.0.0.1:{}", 3000);
    HttpServer::new(move || {
        App::new().app_data(web::Data::new(state.clone())).service(
            web::scope("api")
                .service(category::get_all_parent)
                .service(category::get_child_by_parent_id)
                .service(create_token)
                .service(
                    web::scope("")
                        .wrap(auth.clone())
                        .service(category::create)
                        .service(category::update),
                ),
        )
    })
    .bind(("127.0.0.1", 3000))?
    .run()
    .await
}

#[post("/token")]
pub async fn create_token(info: web::Json<UserPermissions>) -> Result<String, Error> {
    let user_info = info.into_inner();
    // 查询用户
    let claims = Claims::new(user_info.username, vec![String::from("permissions")]);
    let jwt = claims::create_jwt(claims)?;

    // Return token for work with example handlers
    Ok(jwt)
}

#[derive(Deserialize)]
pub struct UserPermissions {
    pub username: String,
    pub password: Vec<String>,
}

use crate::{entity, AppState};
use actix_web::{get, post, put, web, Error, Responder, Result};
use sea_orm::prelude::*;

#[get("/category")]
pub async fn get_all_parent(data: web::Data<AppState>) -> Result<impl Responder, Error> {
    let category = entity::category::Entity::find()
        .filter(entity::category::Column::ParentId.is_null())
        .all(&data.conn)
        .await
        .expect("msg");
    Ok(web::Json(category))
}

#[post("/category")]
pub async fn create() -> impl Responder {
    "echo"
}

#[put("/category")]
pub async fn update() -> impl Responder {
    "echo"
}

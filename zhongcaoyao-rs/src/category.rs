use crate::{entity, AppState};
use actix_web::{get, post, put, web, Error, Responder, Result};
use sea_orm::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
struct GetAllParentResp {
    status_code: u32,
    data: Option<Vec<entity::category::Model>>,
    message: Option<&'static str>,
}

#[get("/category")]
pub async fn get_all_parent(data: web::Data<AppState>) -> Result<impl Responder, Error> {
    let category = entity::category::Entity::find()
        .filter(entity::category::Column::ParentId.is_null())
        .all(&data.conn)
        .await
        .expect("msg");
    Ok(web::Json(GetAllParentResp {
        status_code: 200,
        data: Some(category),
        message: None,
    }))
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
struct CreateResp {
    status_code: u32,
    data: Option<Vec<entity::category::Model>>,
    message: Option<&'static str>,
}

#[post("/category")]
pub async fn create() -> impl Responder {
    "echo"
}

#[put("/category")]
pub async fn update() -> impl Responder {
    "echo"
}

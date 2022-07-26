use std::future::join;

use crate::{entity, AppState};
use actix_web::{get, post, put, web, Error, Responder, Result};
use sea_orm::{prelude::*, Condition};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
struct GetAllParentResp {
    status_code: u32,
    data: Option<Vec<entity::category::Model>>,
    message: Option<&'static str>,
}

#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
struct GetChildResp {
    status_code: u32,
    data: Option<GetChildRespData>,
    message: Option<&'static str>,
}
#[derive(Clone, Debug, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
struct GetChildRespData {
    child: Vec<entity::category::Model>,
    parent: Option<entity::category::Model>,
}

#[get("/category/parent")]
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

#[get("/category/child/{id}")]
pub async fn get_child_by_parent_id(
    data: web::Data<AppState>,
    info: web::Path<(i32,)>,
) -> Result<impl Responder, Error> {
    let info = info.into_inner();
    let (child, parent) = join!(
        entity::category::Entity::find()
            .filter(entity::category::Column::ParentId.eq(info.0))
            .all(&data.conn),
        entity::category::Entity::find_by_id(info.0).one(&data.conn)
    )
    .await;
    let child = child.expect("服务器内部错误");
    let parent = parent.expect("服务器内部错误");
    Ok(web::Json(GetChildResp {
        status_code: 200,
        data: Some(GetChildRespData { parent, child }),
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

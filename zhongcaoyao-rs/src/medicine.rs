use actix_web::{get, Error, Responder};

#[get("/medicine")]
pub async fn getMedicine() -> Result<impl Responder, Error> {
    Ok("")
}

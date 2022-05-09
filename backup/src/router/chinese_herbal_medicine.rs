use actix_web::{get, HttpResponse, Responder};
#[get("/chinese-herbal-medicine")]
pub async fn get() -> impl Responder {
    HttpResponse::Ok().body("Hello world!")
}

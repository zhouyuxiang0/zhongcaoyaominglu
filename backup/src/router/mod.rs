use actix_web::web;

pub mod chinese_herbal_medicine;

pub fn config(cfg: &mut web::ServiceConfig) {
    cfg.service(chinese_herbal_medicine::get);
}

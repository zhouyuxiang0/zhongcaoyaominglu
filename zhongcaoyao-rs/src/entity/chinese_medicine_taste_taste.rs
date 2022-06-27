//! SeaORM Entity. Generated by sea-orm-codegen 0.8.0

use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "chinese_medicine_taste_taste")]
pub struct Model {
    #[sea_orm(column_name = "chineseMedicineId", primary_key, auto_increment = false)]
    pub chinese_medicine_id: i32,
    #[sea_orm(column_name = "tasteId", primary_key, auto_increment = false)]
    pub taste_id: i32,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::taste::Entity",
        from = "Column::TasteId",
        to = "super::taste::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    Taste,
    #[sea_orm(
        belongs_to = "super::chinese_medicine::Entity",
        from = "Column::ChineseMedicineId",
        to = "super::chinese_medicine::Column::Id",
        on_update = "Cascade",
        on_delete = "Cascade"
    )]
    ChineseMedicine,
}

impl Related<super::taste::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Taste.def()
    }
}

impl Related<super::chinese_medicine::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::ChineseMedicine.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}

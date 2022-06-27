//! SeaORM Entity. Generated by sea-orm-codegen 0.8.0

use sea_orm::entity::prelude::*;

#[derive(Clone, Debug, PartialEq, DeriveEntityModel)]
#[sea_orm(table_name = "category_closure")]
pub struct Model {
    #[sea_orm(primary_key, auto_increment = false)]
    pub id_ancestor: i32,
    #[sea_orm(primary_key, auto_increment = false)]
    pub id_descendant: i32,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::category::Entity",
        from = "Column::IdAncestor",
        to = "super::category::Column::Id",
        on_update = "NoAction",
        on_delete = "Cascade"
    )]
    Category2,
    #[sea_orm(
        belongs_to = "super::category::Entity",
        from = "Column::IdDescendant",
        to = "super::category::Column::Id",
        on_update = "NoAction",
        on_delete = "Cascade"
    )]
    Category1,
}

impl ActiveModelBehavior for ActiveModel {}

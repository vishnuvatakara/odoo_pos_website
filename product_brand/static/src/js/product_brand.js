odoo.define("product_brand.product_brand_pos",function(require){
    'use strict';
    var model=require("point_of_sale.models");
    var _super_orderline = model.Orderline.prototype;
    console.log(model)
    model.load_fields('product.product','brand_name')
    model.Orderline=model.Orderline.extend({
        initialize:function(attr,options){
            var line=_super_orderline.initialize.apply(this,arguments);
            this.brand_name=this.product.brand_name;
        }

    })
})
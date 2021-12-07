odoo.define('product_brand.discount', function(require) {
    'use strict';
    const Orderline = require('point_of_sale.Orderline');
    const ProductScreen = require('point_of_sale.ProductScreen');
    var models = require('point_of_sale.models');
    const Registries = require('point_of_sale.Registries');
    models.load_fields('pos.config', 'apply_discount_limit');
    models.load_fields('pos.session', 'discount_limit_enable');
    var rpc = require('web.rpc');
    const { Gui } = require('point_of_sale.Gui');


    const EditNumpadWidget = ProductScreen => class extends ProductScreen {

        constructor() {
            super(...arguments);
            var self = this;

        rpc.query({
                model: 'discount.category',
                method: 'get_discount_limit',
                args: ['',this.env.pos.config.apply_discount_limit],
            }).then(function (limits){
             for(var k in limits){
                console.log('k', limits[k]);
                }

            console.log("limits", limits);
            self.disclimit = limits
            })};
        _onClickPay() {
            console.log("hhhhhhh")
            var p_id=[]
            var x=this.currentOrder.get_orderlines()
            var active = this.env.pos.pos_session.discount_limit_enable;
            var orders=this.env.pos.get_order().selected_orderline;
            var pro_id = orders.product.pos_categ_id[0];
            console.log("pro_id", pro_id);
            console.log("disclimit", this.disclimit)
            for(var y in x)
            {
                p_id[y] = x[y].product.pos_categ_id[0]
            }
            console.log(p_id)
            var flag=0
             if(active == true)
                { console.log("1111111111")
                    for(var i in x)
                        {
                            console.log(x[i].discount)
                            if(x[i].discount > this.disclimit[x[i].product.pos_categ_id[0]])
                                {   flag=1
                                    console.log("3333333333333",x[i])
                                    x[i].set_discount(0);
                                    Gui.showPopup('ErrorPopup',{
                                        'title': 'Discount Limit Exceed',
                                         'body':  'Your Discount limit Exceeded',
                                                                 })

                                }

                        }
                 }
             if (flag==0){
                this.showScreen('PaymentScreen');
             }
        }


    };

    Registries.Component.extend(ProductScreen, EditNumpadWidget);

    return ProductScreen;
 });
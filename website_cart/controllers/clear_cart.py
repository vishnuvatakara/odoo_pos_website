from odoo import http
from odoo.http import request


class ClearCart(http.Controller):
    @http.route(["/shop/clear_cart"], type="http", auth="public", website=True)
    def clear_cart(self):
        print("haihaivvvvvvvvvvvvvvvvvvvvvvvvvvvv")
        order = request.website.sale_get_order()
        if order:
            print("jkjkjkjjkjkjkjkjkjk")
            for line in order.website_order_line:
                line.unlink()
            return request.redirect('/shop/cart')

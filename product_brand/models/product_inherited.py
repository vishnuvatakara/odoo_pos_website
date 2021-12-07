from odoo import api, fields, models


class ProductBrand(models.Model):
    _inherit = "product.product"
    _description = "inherited product.product model"

    brand_name = fields.Char(string="Brand")


from odoo import fields, models


class DiscountCategory(models.Model):
    _name = "discount.category"
    _description = "Discount category"

    category_id = fields.Many2one('pos.category', string='Category')
    discount = fields.Integer(string='Discount')
    session_id = fields.Many2one('pos.config')

    def get_discount_limit(self, vals):
        rslt = {}
        print("vals", vals)
        obj = self.env['discount.category'].search([('id', 'in', vals)])
        for i in obj:
            print(i)
            rslt[i.category_id.id] = i.discount
            print(rslt)
        return rslt


class DiscountLimit(models.Model):
    _inherit = 'pos.config'

    apply_discount_limit = fields.One2many('discount.category', 'session_id',
                                           string="Discount Limit")


class Session(models.Model):
    _inherit = 'pos.session'

    discount_limit_enable = fields.Boolean('Discount Limit Active', default=True)
    print(discount_limit_enable)
